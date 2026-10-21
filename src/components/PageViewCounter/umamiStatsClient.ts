// Framework-free client for Umami's public share-token stats API (v2 and v3).
// Keep this file erasable TypeScript (no enums, namespaces or parameter
// properties) so Node can strip types and run the tests without a build step.

export type FetchLike = (input: string, init?: RequestInit) => Promise<Response>

export const SHARE_TOKEN_HEADER = 'x-umami-share-token'
export const SHARE_CONTEXT_HEADER = 'x-umami-share-context'

type StatsRange = { startAt: number; endAt: number; path?: string }

// v2 filters on `url`, v3 filters on `path` and each ignores the other, so a
// per-page request carries both. `compare` is never sent.
export function buildStatsUrl(host: string, websiteId: string, range: StatsRange): string {
  let url = `${host}/api/websites/${websiteId}/stats?startAt=${range.startAt}&endAt=${range.endAt}`
  if (range.path) {
    const encoded = encodeURIComponent(range.path)
    url += `&url=${encoded}&path=${encoded}`
  }
  return url
}

// v3 answers `{ pageviews: 54 }`, v2 answers `{ pageviews: { value: 54, prev: 0 } }`.
export function readPageviews(data: unknown): number {
  if (typeof data !== 'object' || data === null) return 0
  const pageviews = (data as { pageviews?: unknown }).pageviews
  const value =
    typeof pageviews === 'object' && pageviews !== null
      ? (pageviews as { value?: unknown }).value
      : pageviews
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

function resolveFetch(fetchImpl?: FetchLike): FetchLike {
  return fetchImpl ?? ((input, init) => globalThis.fetch(input, init))
}

export async function fetchShareToken(
  host: string,
  shareId: string,
  fetchImpl?: FetchLike,
): Promise<string> {
  const response = await resolveFetch(fetchImpl)(`${host}/api/share/${shareId}`)
  if (!response.ok) throw new Error(`umami share ${response.status}`)
  let body: unknown = null
  try {
    body = await response.json()
  } catch {
    body = null
  }
  const token =
    typeof body === 'object' && body !== null ? (body as { token?: unknown }).token : undefined
  if (typeof token !== 'string') throw new Error('umami share token missing')
  return token
}

type FetchPageviewsArgs = {
  host: string
  websiteId: string
  token: string
  startAt: number
  endAt: number
  paths?: string[]
  fetchImpl?: FetchLike
}

// One request per path (a single site-wide request when `paths` is empty).
// A rejected fetch, a non-2xx status or an unparsable body counts as 0 for
// that path, so one bad request never hides the others.
export async function fetchPageviews(args: FetchPageviewsArgs): Promise<number> {
  const { host, websiteId, token, startAt, endAt, paths, fetchImpl } = args
  const doFetch = resolveFetch(fetchImpl)
  const headers = {
    [SHARE_TOKEN_HEADER]: token,
    [SHARE_CONTEXT_HEADER]: '1',
  }
  const targets: (string | undefined)[] = paths && paths.length > 0 ? paths : [undefined]

  const counts = await Promise.all(
    targets.map(async (path) => {
      try {
        const response = await doFetch(buildStatsUrl(host, websiteId, { startAt, endAt, path }), {
          headers,
        })
        if (!response.ok) return 0
        return readPageviews(await response.json())
      } catch {
        return 0
      }
    }),
  )
  return counts.reduce((sum, count) => sum + count, 0)
}

type StoreName = 'local' | 'session'

// Storage can be missing (SSR), blocked (Safari private mode) or full; none of
// that may break rendering. `window` is read lazily on every call, never at import.
function getStore(store: StoreName): Storage | null {
  if (typeof window === 'undefined') return null
  return store === 'local' ? window.localStorage : window.sessionStorage
}

export const safeStorage: {
  get(store: StoreName, key: string): string | null
  set(store: StoreName, key: string, value: string): void
  remove(store: StoreName, key: string): void
} = {
  get(store, key) {
    try {
      return getStore(store)?.getItem(key) ?? null
    } catch {
      return null
    }
  },
  set(store, key, value) {
    try {
      getStore(store)?.setItem(key, value)
    } catch {
      // ignore: caching is best-effort
    }
  },
  remove(store, key) {
    try {
      getStore(store)?.removeItem(key)
    } catch {
      // ignore: caching is best-effort
    }
  },
}
