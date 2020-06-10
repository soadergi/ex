import { createAction } from 'redux-actions'

import { createRequestActions } from '../request/createRequestActions'

import { createCollectionRequests } from './createCollectionRequests'

export const createCollectionActions = ({
  actionNames,
  domainUrl,
  isJsonApi,
  service,
}) => {
  const {
    findRecordRequest,
    queryRecordsRequest,
    createRecordRequest,
    updateRecordRequest,
    deleteRecordRequest,
  } = createCollectionRequests({
    domainUrl,
    isJsonApi,
  })

  return ({
    putById: createAction(actionNames.PUT_BY_ID),
    patchById: createAction(actionNames.PATCH_BY_ID),
    clearRecords: createAction(actionNames.CLEAR_RECORDS),

    findRecord: createRequestActions(actionNames.FIND_RECORD, findRecordRequest, isJsonApi, service),
    queryRecords: createRequestActions(actionNames.QUERY_RECORDS, queryRecordsRequest, isJsonApi, service),
    createRecord: createRequestActions(actionNames.CREATE_RECORD, createRecordRequest, isJsonApi, service),
    updateRecord: createRequestActions(actionNames.UPDATE_RECORD, updateRecordRequest, isJsonApi, service),
    deleteRecord: createRequestActions(actionNames.DELETE_RECORD, deleteRecordRequest, isJsonApi, service),
  })
}
