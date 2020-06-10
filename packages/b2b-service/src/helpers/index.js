export const isProd = typeof window === 'undefined'
  ? process.env.ENV_LABEL === 'prod'
  : window.location.host === 'about.weplay.tv'

export const devConsole = new Proxy(console, {
  get: (obj, prop) => {
    if (isProd) return () => {}
    return obj[prop]
  },
})
