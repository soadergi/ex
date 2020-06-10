import createAction from 'redux-actions/es/createAction'

import { dispatchAllModels } from '../utils'

import { createRequestNames } from './createRequestNames'

export const createRequestActions = (namespace, apiRequest, isJsonApi = false, service) => {
  const {
    REQUEST,
    SUCCESS,
    ERROR,
    CLEAR,
  } = createRequestNames(namespace)

  const actionCreators = {
    request: createAction(REQUEST),
    success: createAction(SUCCESS),
    error: createAction(ERROR),
    clear: createAction(CLEAR),
  }

  return ({
    REQUEST,
    SUCCESS,
    ERROR,
    CLEAR,

    request: params => (dispatch) => {
      dispatch(actionCreators.request())
      return apiRequest(params).then((responseData) => {
        if (isJsonApi) {
          dispatchAllModels({
            responseData,
            dispatch,
            mainSuccessActionActionCreator: actionCreators.success,
            service,
          })
        } else {
          dispatch(actionCreators.success(responseData))
        }
        return responseData
      }, (error) => {
        dispatch(actionCreators.error(error))
        throw error
      })
    },
    clear: () => dispatch => dispatch(actionCreators.clear()),
  })
}
