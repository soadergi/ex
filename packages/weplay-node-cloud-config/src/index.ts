import axios from 'axios'
// @ts-ignore
import { object } from 'dot-object'

const fallbackCouldConfig = {
  eureka: {
    uri: 'http://eureka-service-dev.marathon.mesos:38761',
    heartbeatInterval: 30,
  },
  rmqConnectSettings: {
    protocol: 'amqp',
    hostname: 'rabbitmq.weplay.space',
    port: 5672,
    username: 'daemon',
    password: 'Wepl@y-d@Em0n',
    vhost: 'vhost',
    heartbeat: 60,
  },
  mailQName: 'notification_mails_dev',
  emails: {
    business: ['i.lukyanov@weplay.tv'],
    press: ['i.rohovoi@weplay.tv'],
  },
}
let configPromise: any
export const getConfig = async ({
  envLabel,
  cloudConfigUrl,
  serviceName,
}: {
  envLabel: string
  cloudConfigUrl: string
  serviceName: string
}) => {
  if (!configPromise) {
    if (!envLabel || envLabel === 'localhost') {
      configPromise = Promise.resolve(fallbackCouldConfig)
    }
    configPromise = axios(`${cloudConfigUrl}/${serviceName}/default/${envLabel}`)
      .then(response => {
        return object(response.data.propertySources[0].source)
      })
      .catch(err => {
        console.error('ERROR DURING CONFIG REQUEST USING FALLBACK', err)
        return fallbackCouldConfig
      })
  }
  return configPromise
}
export const getConfigField = async (fieldName: string) => {
  const config = await configPromise

  return config[fieldName]
}
