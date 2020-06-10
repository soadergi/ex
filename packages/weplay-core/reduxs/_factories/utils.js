import * as R from 'ramda'
import _ from 'lodash'
import createAction from 'redux-actions/es/createAction'

import { createCollectionNames } from './collection/createCollectionNames' // TODO: FIX!!!

const createModelAction = actionName => ({ modelType, service }) => modelType
  |> _.kebabCase
  |> (domain => createCollectionNames({
    domain,
    isJsonApi: true,
    service,
  }))
  |> R.path(['actionNames', actionName])
  |> createAction

const createModelPutAction = createModelAction('PUT_BY_ID')
const createModelPatchAction = createModelAction('PATCH_BY_ID')

const squashModel = (model) => {
  const newAttrs = model.attributes && 'type' in model.attributes
    ? R.pipe(
      R.omit(['type']),
      R.merge({
        [`${_.camelCase(model.type)}Type`]: model.attributes.type,
      }),
    )(model.attributes)
    : model.attributes
  return ({
    isFetched: true,
    ...R.omit(['attributes'])(model),
    ...newAttrs,
    relationships: R.mapObjIndexed(R.prop('data'), model.relationships),
  })
}
export const dispatchPartialModelAction = ({
  partialModel,
  service,
}) => (dispatch) => {
  const squashedPartialRecord = squashModel(partialModel)
  const patchAction = createModelPatchAction({
    modelType: partialModel.type,
    service,
  })
  dispatch(patchAction(squashedPartialRecord))
}

const getDispatchIncludedModel = dispatch => (modelsById, modelType, service) => {
  const squashedHashIdToModel = R.mapObjIndexed(squashModel, modelsById)
  const secondaryModelPutAction = createModelPutAction({
    modelType,
    service,
  })
  dispatch(secondaryModelPutAction(squashedHashIdToModel))
}

export const dispatchAllModels = ({
  responseData,
  dispatch,
  mainSuccessActionActionCreator,
  service,
}) => {
  const hashIdsByModelType = responseData.included ?? {}
  const dispatchIncludedModel = getDispatchIncludedModel(dispatch)
  Object.keys(hashIdsByModelType).forEach((modelType) => {
    const modelsById = hashIdsByModelType[modelType]
    dispatchIncludedModel(modelsById, modelType, service)
  })

  const mainRecordOrRecords = responseData.data
  const squashedMainRecordOrRecords = Array.isArray(mainRecordOrRecords)
    ? mainRecordOrRecords.map(squashModel)
    : squashModel(mainRecordOrRecords)
  dispatch(mainSuccessActionActionCreator({
    recordOrRecords: squashedMainRecordOrRecords,
    extraData: R.omit(['data', 'included'])(responseData),
  }))
}
