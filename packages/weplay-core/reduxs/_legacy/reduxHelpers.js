import { trimObjectStringKeys } from 'weplay-core/helpers/trimObjectStringKeys'

import LegacyRequest from './legacyRequest'

/**
 * @param {string} base
 */
export const createRequestTypes = base => ({
  REQUEST: `${base}_REQUEST`,
  SUCCESS: `${base}_SUCCESS`,
  ERROR: `${base}_ERROR`,
})

/**
 * @param {string} base
 * @param {object} data
 */

export const createReduxAction = type => data => dispatch => dispatch({
  type,
  data,
})

/**
 *
 * @param {string} actionType
 * @param {string} endpoint
 * @param {string} responseType
 */

export const createRequestFunc = (
  actionType,
  method,
  endpoint,
  responseType,
  synchronousRequest,
) => (
  payloadObj,
  axiosConfig,
) => dispatch => LegacyRequest(
  dispatch,
  method,
  {
    ...payloadObj,
    ...payloadObj?.body && { body: trimObjectStringKeys(payloadObj.body) },
  },
  actionType,
  endpoint,
  { ...axiosConfig, ...(responseType && { responseType }) },
  synchronousRequest,
)
