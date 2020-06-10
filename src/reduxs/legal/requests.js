import * as R from 'ramda'
import { axios } from 'weplay-core/services/axios'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'

const SERVICE_PAGES_URL = '/media-service/service-pages'

export const getServicePageRequest = params => axios.get(
  `${SERVICE_PAGES_URL}/${params.legalName}`,
  {
    params: R.omit([
      'legalName',
    ])(params),
  },
).then(R.prop('data')).then(camelizeKeys)
