export const getHostNameFromUrl = url => url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)[2].match((/[^.]*/))[0]
