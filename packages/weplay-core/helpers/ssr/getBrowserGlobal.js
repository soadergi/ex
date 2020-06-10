export const createBrowserGlobalObject = request => ({
  isServer: true,

  pageYOffset: 0,
  innerHeight: 0,

  close() {
    console.warn('close', 'not implemented! Not supposed to be called, please check')
  },
  open() {
    console.warn('open', 'not implemented! Not supposed to be called, please check')
  },
  addEventListener() {
    console.warn('addEventListener', 'not implemented! Not supposed to be called, please check')
  },
  removeEventListener() {
    console.warn('removeEventListener', 'not implemented! Not supposed to be called, please'
        + ' check')
  },
  scrollTo() {
    console.warn('scrollTo', 'not implemented! Not supposed to be called, please check')
  },

  opener: null,

  localStorage: {
    setItem() {
      console.warn('setItem', 'not implemented! Not supposed to be called, please check')
    },
    getItem() {
      console.warn('getItem', 'not implemented! Not supposed to be called, please check')
      return JSON.stringify(true)
    },
    removeItem() {
      console.warn('removeItem', 'not implemented! Not supposed to be called, please check')
    },
  },

  navigator: {
    get userLanguage() {
      console.warn('userLanguage', 'not implemented')
      return 'en'
    },
    get language() {
      console.warn('language', 'not implemented')
      return 'en'
    },
  },
  document: {
    body: {
      scrollHeight: 0,
    },
    getElementById() {
      console.warn('getElementById called on server')
      return null
    },
    getElementsByClassName() {
      return []
    },
    createElement() {
      console.warn('createElement', 'not implemented')
      return null
    },
    documentElement: {
      scrollHeight: 0,
    },
  },
  location: {
    get origin() {
      if (!request) {
        console.warn('there is no request obj on server!!!')
        return null
      }
      return `${request.protocol}://${request.headers.host}`
    },
    get host() {
      return request.headers.host
    },
    get hostname() {
      return request.hostname
    },
    get pathname() {
      // TODO:@illia think what to do with FIXME here?
      return request.path
    },
    get href() {
      return `${request.protocol}://${request.headers.host}${request.path}`
    },
    get protocol() {
      return `${request.protocol}:`
    },
  },
  FB: null,
})

export default (request) => {
  if (typeof window !== 'undefined') {
    if (request && request !== 'FIXME') {
      console.warn('there is request obj on client!!!')
    }
    return window
  }
  if (!request) {
    console.warn('there is no request obj on server!!!')
  }
  if (request === 'FIXME') {
    console.warn('@illia knows about this error')
  }
  return createBrowserGlobalObject(request)
}
