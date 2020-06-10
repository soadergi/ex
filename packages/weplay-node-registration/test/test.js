// eslint-disable-next-line node/no-unpublished-require
const { getEurekaUrl } = require('../dist/index') // eslint-disable-line no-undef

describe('getEurekaUrl', () => {
  const eurekaConfig = {
    eureka: { uri: 'eurekaUri', heartbeatInterval: 0 },
    instanceId: 'instanceId',
    instanceUrl: 'instanceUrl',
    serviceName: 'serviceName',
    host: 'host',
    port: 'port',
    envLabel: 'envLabel',
  }
  it('returns general url with correc config', async () => {
    expect(getEurekaUrl(eurekaConfig)).toEqual(
      'eurekaUri/eureka/apps/serviceName',
    )
  })
})
