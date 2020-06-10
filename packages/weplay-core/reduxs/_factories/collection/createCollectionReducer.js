import * as R from 'ramda'
import { combineReducers } from 'redux'
import handleActions from 'redux-actions/es/handleActions'

import { arrayToMapById } from '../../helpers'
import { createRequestReducer } from '../request/createRequestReducer'

const singleRecordHandler = (idFieldName, isJsonApi) => (byId, {
  payload,
}) => {
  const record = isJsonApi ? payload.recordOrRecords : payload.data
  return ({
    ...byId,
    [record[idFieldName]]: record,
  })
}

const pluralRecordsHandler = (idFieldName, isJsonApi) => (byId, {
  payload,
}) => ({
  ...byId,
  ...arrayToMapById(isJsonApi ? payload.recordOrRecords : payload.data, idFieldName),
})

const extraDataHandler = isJsonApi => (state, {
  payload: {
    extraData,
  },
}) => (isJsonApi
  ? {
    ...state,
    data: {
      ...state.data,
      ...extraData,
    },
  }
  : {
    ...state,
    loading: false,
    error: null,
  })

export const createCollectionReducer = ({
  reducerNames,
  isJsonApi,
  idFieldName,

  collectionActions: {
    putById,
    patchById,
    clearRecords,

    findRecord,
    queryRecords,
    createRecord,
    updateRecord,
    deleteRecord,
  },
}) => combineReducers({
  [reducerNames.BY_ID]: handleActions({
    [putById]: (byId, { payload }) => ({
      ...byId,
      ...arrayToMapById(payload, idFieldName),
    }),
    [patchById]: (byId, { payload }) => ({
      ...byId,
      [payload[idFieldName]]: R.mergeDeepRight(
        byId[payload[idFieldName]],
        payload,
      ),
    }),
    [clearRecords]: () => ({}),

    [queryRecords.SUCCESS]: pluralRecordsHandler(idFieldName, isJsonApi),
    [findRecord.SUCCESS]: singleRecordHandler(idFieldName, isJsonApi),
    [createRecord.SUCCESS]: singleRecordHandler(idFieldName, isJsonApi),
    [updateRecord.SUCCESS]: singleRecordHandler(idFieldName, isJsonApi),
    [deleteRecord.SUCCESS]: (byId, { payload: { recordOrRecords } }) => R.omit([
      recordOrRecords.id,
    ])(byId),
  }, {
    // [itemId]: item,
  }),

  // these branches exist only for meta, errors and loading, all records is in byId reducer
  [reducerNames.QUERY_RECORDS]: createRequestReducer(queryRecords, {
    [queryRecords.SUCCESS]: extraDataHandler(isJsonApi),
  }),
  [reducerNames.FIND_RECORD]: createRequestReducer(findRecord, {
    [findRecord.SUCCESS]: extraDataHandler(isJsonApi),
  }),
  [reducerNames.CREATE_RECORD]: createRequestReducer(createRecord, {
    [createRecord.SUCCESS]: extraDataHandler(isJsonApi),
  }),
  [reducerNames.UPDATE_RECORD]: createRequestReducer(updateRecord, {
    [updateRecord.SUCCESS]: extraDataHandler(isJsonApi),
  }),
  [reducerNames.DELETE_RECORD]: createRequestReducer(deleteRecord, {
    [deleteRecord.SUCCESS]: R.always(null),
  }),
})
