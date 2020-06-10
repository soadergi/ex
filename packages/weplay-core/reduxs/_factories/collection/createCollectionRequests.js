import * as R from 'ramda'

import { axios } from 'weplay-core/services/axios'
import { camelizeKeys, snakeizeKeys } from 'weplay-core/reduxs/helpers'

const successHandler = R.pipe(
  R.prop('data'), // axios
  R.ifElse(
    R.prop('data'),
    R.identity,
    R.objOf('data'), // because old BE sucks
  ),
  camelizeKeys,
)
const failHanlder = R.pipe(
  R.path(['response', 'data']), // axios
  error => Promise.reject(camelizeKeys(error)),
)

// TODO: add cache logic here? don't fetch if in store already?
export const createCollectionRequests = ({
  domainUrl,
}) => {
  const getPartUrl = value => (value ? `/${value}` : '')
  const getUrl = (params) => {
    const idUrl = getPartUrl(params?.id || params?.data?.id || '')
    // TODO: @Tetiana plz rewrite subApiAction logic
    const subApiActionUrl = getPartUrl(params?.subApiAction ?? '')
    return `${domainUrl}${idUrl}${subApiActionUrl}`
  }
  return ({
    findRecordRequest: params => axios
      .get(getUrl(params), { params: R.omit(['id', 'subApiAction'], params) })
      .then(successHandler, failHanlder),
    queryRecordsRequest: (params = {}) => axios
      .get(getUrl(params), { params: R.omit(['subApiAction'], params) })
      .then(successHandler, failHanlder),
    createRecordRequest: params => axios
      .post(getUrl(params), snakeizeKeys(R.omit(['subApiAction'], params)))
      .then(successHandler, failHanlder),
    updateRecordRequest: params => axios
      .patch(getUrl(params), snakeizeKeys(R.omit(['subApiAction'], params)))
      .then(successHandler, failHanlder),
    deleteRecordRequest: params => axios
      .delete(getUrl(params), { data: R.omit(['id', 'subApiAction'], params) })
      .then(() => ({
        data: {
          id: params.id,
          attributes: {},
        },
      }), failHanlder),
  })
}
