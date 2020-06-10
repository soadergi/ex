import { getEnvironment } from 'weplay-singleton/helpers/getEnvironment'

import { SentryDSNKey } from 'weplay-core/config'

export const setupSentry = (origin) => {
  const environment = getEnvironment(origin)
  if (environment !== 'localhost') {
    import('@sentry/browser').then((Sentry) => {
      Sentry.init({
        dsn: SentryDSNKey,
        sampleRate: 0.05,
        environment,
      })
    })
  }
}
