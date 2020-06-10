import axios from 'axios'

interface EurekaConfigInterface {
  eurekaUri: string
  heartbeatInterval: number
  instanceId: string
  instanceUrl: string
  serviceName: string
  host: string
  port: number
  envLabel: string
}
// eslint-disable-next-line
export const getEurekaUrl = (eurekaConfig: EurekaConfigInterface) => `${eurekaConfig.eurekaUri}/eureka/apps/${eurekaConfig.serviceName}`
const getEurekaBody = (eurekaConfig: EurekaConfigInterface) => ({
  instance: {
    app: eurekaConfig.serviceName,
    vipAddress: eurekaConfig.serviceName,
    secureVipAddress: eurekaConfig.serviceName,
    instanceId: eurekaConfig.instanceId,
    hostName: eurekaConfig.host,
    ipAddr: eurekaConfig.host,
    port: {
      $: `${eurekaConfig.port}`,
      '@enabled': 'true',
    },
    securePort: {
      $: '443',
      '@enabled': 'false',
    },
    homePageUrl: eurekaConfig.instanceUrl,
    statusPageUrl: `${eurekaConfig.instanceUrl}/info`,
    healthCheckUrl: `${eurekaConfig.instanceUrl}/health-check`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.MyDataCenterInfo',
      name: 'MyOwn',
    },
    leaseInfo: {
      evictionDurationInSecs: '90',
    },
    metadata: {
      'management.port': `${eurekaConfig.port}`,
    },
  },
})
const heartbeat = (eurekaConfig: EurekaConfigInterface) =>
  axios.put(`${getEurekaUrl(eurekaConfig)}/${eurekaConfig.instanceId}`)
const start = (eurekaConfig: EurekaConfigInterface) =>
  axios.post(getEurekaUrl(eurekaConfig), getEurekaBody(eurekaConfig))

let intervalId: any
export async function deregister(eurekaConfig: EurekaConfigInterface) {
  if (process.env.ENV_LABEL === 'localhost') {
    return Promise.resolve()
  }
  const response = await axios.delete(
    `${getEurekaUrl(eurekaConfig)}/${eurekaConfig.instanceId}`,
  )
  clearInterval(intervalId)
  return response
}

export async function register(eurekaConfig: EurekaConfigInterface) {
  if (process.env.ENV_LABEL === 'localhost') {
    return Promise.resolve()
  }
  await start(eurekaConfig)
  intervalId = setInterval(async () => {
    try {
      await heartbeat(eurekaConfig)
    } catch (err) {
      await deregister(eurekaConfig)
      await start(eurekaConfig)
    }
  }, eurekaConfig.heartbeatInterval * 1000)
  return Promise.resolve()
}
