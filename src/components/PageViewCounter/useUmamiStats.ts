// React hook that reads page-view counts from Umami through a public share
// link (no API token or password). Copy this file together with
// umamiStatsClient.ts into your Docusaurus site.

import { useEffect, useState } from 'react'
import { usePluginData } from '@docusaurus/useGlobalData'
import { fetchPageviews, fetchShareToken, safeStorage } from './umamiStatsClient'

export interface UseUmamiStatsOptions {
  // Page paths to count (e.g. ['/blog/post', '/en/blog/post']); omit for the whole site.
  paths?: string[]
  // Cache identity; defaults to the joined paths, or '__site__' without paths.
  cacheKey?: string
}

export interface UmamiStatsResult {
  views: number | null
  error: Error | null
}

type UmamiPluginData = {
  host: string
  websiteId: string
  shareId: string | null
  startAt: number
}

type HookState = UmamiStatsResult & { key: string }

const PLUGIN_NAME = 'docusaurus-plugin-umami'
const CACHE_TTL_MS = 300000

function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

export function useUmamiStats(options: UseUmamiStatsOptions = {}): UmamiStatsResult {
  const data = usePluginData(PLUGIN_NAME) as UmamiPluginData | undefined
  const host = data?.host
  const websiteId = data?.websiteId
  const shareId = data?.shareId
  const startAt = data?.startAt ?? 0

  // An empty path would turn into a site-wide request, so drop empty entries.
  const paths = options.paths?.filter((path) => path !== '')
  const activePaths = paths && paths.length > 0 ? paths : undefined
  const key = options.cacheKey ?? activePaths?.join('|') ?? '__site__'

  const [state, setState] = useState<HookState>({ key, views: null, error: null })

  // `paths` is a fresh array on most renders, so the effect is keyed on `key`
  // (plus the primitive plugin data) and uses the paths of the render that
  // started it.
  useEffect(() => {
    if (typeof window === 'undefined') return
    let cancelled = false
    const publish = (views: number | null, error: Error | null) => {
      if (!cancelled) setState({ key, views, error })
    }

    if (!host || !websiteId) {
      publish(null, new Error(`${PLUGIN_NAME} is not registered or has no host/websiteId`))
      return () => {
        cancelled = true
      }
    }
    if (!shareId) {
      publish(null, new Error(`${PLUGIN_NAME}: option 'shareId' is required for page views`))
      return () => {
        cancelled = true
      }
    }

    const viewsKey = `umami_views_${key}`
    const timeKey = `${viewsKey}_time`
    let served: number | null = null
    const cachedViews = Number.parseInt(safeStorage.get('local', viewsKey) ?? '', 10)
    const cachedAt = Number.parseInt(safeStorage.get('local', timeKey) ?? '', 10)
    if (Number.isFinite(cachedViews) && Number.isFinite(cachedAt)) {
      const age = Date.now() - cachedAt
      if (age >= 0 && age < CACHE_TTL_MS) served = cachedViews
    }
    publish(served, null)

    const tokenKey = `umami_share_token_${shareId}`
    // Resolves to null when the effect was cancelled while waiting.
    const requestToken = async (): Promise<string | null> => {
      const fresh = await fetchShareToken(host, shareId)
      if (cancelled) return null
      if (!fresh) throw new Error('umami share token unavailable')
      safeStorage.set('session', tokenKey, fresh)
      return fresh
    }
    const loadTotal = async (token: string) => {
      const endAt = Date.now()
      const total = await fetchPageviews({
        host,
        websiteId,
        token,
        startAt,
        endAt,
        paths: activePaths,
      })
      return { total, endAt }
    }

    void (async () => {
      try {
        const cachedToken = safeStorage.get('session', tokenKey)
        const token = cachedToken || (await requestToken())
        if (!token) return
        let result = await loadTotal(token)
        if (cancelled) return

        // `null` means every stats request failed. A token cached in
        // sessionStorage can be stale (for example the server's signing secret
        // changed), so fetch a fresh one and retry once. A genuine 0 is a number
        // and never triggers this.
        if (result.total === null && cachedToken) {
          safeStorage.remove('session', tokenKey)
          const fresh = await requestToken()
          if (!fresh) return
          result = await loadTotal(fresh)
          if (cancelled) return
        }

        // Still failing: report an error and cache nothing, so a fake 0 never
        // overwrites a real value.
        if (result.total === null) {
          publish(served, new Error('umami stats unavailable'))
          return
        }

        safeStorage.set('local', viewsKey, String(result.total))
        safeStorage.set('local', timeKey, String(result.endAt))
        publish(result.total, null)
      } catch (error) {
        publish(served, toError(error))
      }
    })()

    return () => {
      cancelled = true
    }
  }, [key, host, websiteId, shareId, startAt])

  // After a key change the old result must not be shown for the new key.
  return state.key === key
    ? { views: state.views, error: state.error }
    : { views: null, error: null }
}
