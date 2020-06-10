import pathToRegexp from 'path-to-regexp'

const cache$1 = {}
const cacheLimit$1 = 10000
let cacheCount$1 = 0

function compilePath$1(path, options) {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`
  const pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {})
  if (pathCache[path]) return pathCache[path]
  const keys = []
  const regexp = pathToRegexp(path, keys, options)
  const result = {
    regexp,
    keys,
  }

  if (cacheCount$1 < cacheLimit$1) {
    pathCache[path] = result
    cacheCount$1++
  }

  return result
}
/**
 * Public API for matching a URL pathname to a path.
 */

export function matchPath(pathname, options) {
  if (options === void 0) {
    options = {}
  }

  if (typeof options === 'string') {
    options = {
      path: options,
    }
  }
  const _options = options
  const path = _options.path
  const _options$exact = _options.exact
  const exact = _options$exact === void 0 ? false : _options$exact
  const _options$strict = _options.strict
  const strict = _options$strict === void 0 ? false : _options$strict
  const _options$sensitive = _options.sensitive
  const sensitive = _options$sensitive === void 0 ? false : _options$sensitive
  const paths = [].concat(path)
  return paths.reduce((matched, path) => {
    if (!path) return null
    if (matched) return matched

    const _compilePath = compilePath$1(path, {
      end: exact,
      strict,
      sensitive,
    })
    const regexp = _compilePath.regexp
    const keys = _compilePath.keys

    const match = regexp.exec(pathname)
    if (!match) return null
    const url = match[0]
    const values = match.slice(1)
    const isExact = pathname === url
    if (exact && !isExact) return null
    return {
      path,
      // the path used to match
      url: path === '/' && url === '' ? '/' : url,
      // the matched portion of the URL
      isExact,
      // whether or not we matched exactly
      params: keys.reduce((memo, key, index) => {
        memo[key.name] = values[index]
        return memo
      }, {}),
    }
  }, null)
}
