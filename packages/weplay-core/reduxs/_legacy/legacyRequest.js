import formUrlEncoded from 'form-urlencoded'
import * as R from 'ramda'

import { axios } from '../../services/axios'

const addParamsToURL = (payloadObj, url) => {
  let newUrl = url
  const newPayloadObj = {}
  // get all url params
  const params = Object.getOwnPropertyNames(payloadObj)

  params.forEach((param) => {
    if (url.includes(`${param}`)) {
      // INFO: add values to existing params
      newUrl = newUrl.replace(`{${param}}`, payloadObj[param])
    } else {
      // INFO: add value to newPayloadObject if it doesn't match param in url
      newPayloadObj[param] = payloadObj[param]
    }
  })

  return { newUrl, newPayloadObj }
}
export default function LegacyRequest(
  dispatch,
  method,
  payloadObj,
  actionType,
  endpoint,
  axiosConfig,
  synchronousRequest,
) {
  dispatch({ type: actionType.REQUEST, payload: payloadObj })
  const requestConfig = {
    headers: {
      'Content-Type': R.pathOr(
        'application/x-www-form-urlencoded',
        ['headers', 'Content-type'],
        axiosConfig,
      ),
    },
    ...axiosConfig,
  }

  const { newUrl, newPayloadObj } = payloadObj
    ? addParamsToURL(payloadObj, endpoint)
    : { newUrl: endpoint, newPayloadObj: payloadObj }

  return axios.request({
    url: `/${newUrl}`,
    method: method.toLowerCase(),
    ...(R.prop('params', newPayloadObj)
      && method === 'get'
      && { params: newPayloadObj.params }),
    ...(R.prop('body', newPayloadObj)
        && (method === 'put' || method === 'post' || method === 'patch')
        && ((requestConfig.headers['Content-Type'] === 'application/x-www-form-urlencoded')
          ? { data: formUrlEncoded(newPayloadObj.body) }
          : { data: newPayloadObj.body })),
    ...requestConfig,
  })
    .then((payload) => {
      if (synchronousRequest) {
        return axios.request({
          url: synchronousRequest.url,
          method: synchronousRequest.method,
          ...(synchronousRequest.requestConfig && { ...synchronousRequest.requestConfig }),
        })
          .then((data) => {
            dispatch({
              type: actionType.SUCCESS,
              payload: data,
            })
            return data
          })
      }
      // INFO: dispatch success state of action
      const requestData = (newPayloadObj && newPayloadObj.body) ? newPayloadObj.body : ''
      dispatch({
        type: actionType.SUCCESS,
        payload,
        requestData,
      })
      return payload
    }, (error) => {
      const errorObj = R.pathOr({}, ['response', 'data', 'error'], error)
      if (R.isEmpty(errorObj)) {
        console.warn('STRANGE ERROR WITHOUT DATA', error)
      }
      dispatch({
        type: actionType.ERROR,
        payload: errorObj,
      })
      return Promise.reject(error)
    })
}
