import { getConfigField } from 'weplay-node-cloud-config'
import { rmqManager } from '../services/rmqManager'
import { name, version } from '../../package.json'

export const publishMessage = async ({ data, event }) => {
  const payload = {
    meta: {
      sender: {
        service: name,
        version,
      },
      datetimes: {
        create_datetime: '2020-03-03T00:00:00+00:00',
      },
      protocol: {
        version: '1',
      },
    },
    data: {
      datetime: new Date(),
      ...data,
    },
    event,
  }
  const exchangeName = await getConfigField('exchangeName')

  return rmqManager.publishToExchange({
    exchangeName,
    routingKey: '', // TODO: NOBODY USE THIS KEY YET
    options: {
      type: 'fanout',
    },
    payload,
  })
}
