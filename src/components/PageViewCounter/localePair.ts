// The site serves the same page under two locales (`/x` and `/en/x`), and the
// tracker records them as separate paths. Returns the current permalink first,
// then its twin in the other locale.
export function localePair(permalink: string): [string, string] {
  return permalink.startsWith("/en/")
    ? [permalink, permalink.replace(/^\/en/, "")]
    : [permalink, "/en" + permalink];
}
