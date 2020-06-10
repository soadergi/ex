export const getIdFromUrl = url => url.match(/[^-]*$/)[0].replace(/[^\d]/g, '')
