// import axios from 'axios' // todo: do some mock here
// eslint-disable-next-line node/no-unpublished-require
const { getConfig } = require('../dist/index') // eslint-disable-line no-undef

describe('getConfig', () => {
  it('extract eureka URI correctly', async () => {
    const config = await getConfig({
      envLabel: 'dev',
      cloudConfigUrl: process.env.CLOUD_CONFIG_URL,
      serviceName: 'serviceName',
    })
    expect(config.eureka.uri).toEqual('TODO?')
  })
})
