import _ from 'lodash'
import * as R from 'ramda'

import { camelCase } from '../helpers/camelCase'

export const getWriterTitle = (writer) => {
  if (!writer || R.isEmpty(writer)) return null
  if (writer.nameFieldSelector === 'nick_name') {
    return writer.nickName
  }
  return (writer.firstName && writer.lastName) ? `${writer.firstName} ${writer.lastName}` : null
}
// TODO: add deep camelize into axios interceptor
// TODO: make localize also as deep as camelize
export const arrayToMapById = (array, idKey = 'id', startIndex = 0) => R.ifElse(
  Array.isArray,
  R.reduce((mapById, entity) => ({
    ...mapById,
    [entity[idKey]]: {
      ...R.mapObjIndexed((val, key) => (key === 'viewsCount' ? Number(val) : val))(entity),
      _indexInArray: array.indexOf(entity) + startIndex,
    },
  }), {}),
  R.identity,
)(array)
export const localizeWith = currentLanguage => R.ifElse(
  R.is(Object),
  R.mapObjIndexed(
    R.ifElse(
      value => R.is(Object, value) && (currentLanguage in value),
      R.prop(currentLanguage),
      R.identity,
    ),
  ),
  R.identity,
)
const getDeepTransformKeys = (transformKey, ignoredKeys = []) => {
  const recursiveTransform = (data) => {
    if (data === null) {
      return data
    }

    if (typeof data !== 'object') {
      return data
    }
    if (data instanceof Array) {
      return data.map(recursiveTransform)
    }

    return Object.keys(data)
      .reduce((memo, key) => {
        memo[ // eslint-disable-line
          ignoredKeys.includes(key)
            ? key
            : transformKey(key)
        ] = recursiveTransform(data[key])
        return memo
      }, {})
  }
  return recursiveTransform
}
export const camelizeKeys = getDeepTransformKeys(camelCase, ['3-4', '5-8'])
export const snakeizeKeys = getDeepTransformKeys(_.snakeCase)
export const createSuccessDataByEntityId = ({
  entityName,
  payloadPath,
  pagination,
  idKey,
}) => (state, { payload }) => ({
  ...state,
  data: {
    ...state.data,
    [entityName]: {
      ...R.pathOr({}, ['data', entityName], state),
      ...arrayToMapById(R.pathOr([], payloadPath || [], payload.data), idKey || 'id'),
    },
    ...(pagination ? { paginationInfo: payload.paginationInfo } : {}),
  },
  loading: false,
  error: null,
})

export const prepareRequestData = R.pipe(
  R.prop('data'),
  camelizeKeys,
)
