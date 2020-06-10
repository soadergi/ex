import * as R from 'ramda'
import { createSelector } from 'reselect'

import { isFunction } from 'weplay-core/helpers/isFunction'
import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { localizeWith } from 'weplay-core/reduxs/helpers'

import { createRequestSelectors } from '../request/createRequestSelectors'

const getErrorTextSelector = createSelector(
  [i18nTextsSelector],
  i18nTexts => R.pipe(
    code => i18nTexts.serverErrors[code],
    R.defaultTo(i18nTexts.serverErrors[0]),
    R.of,
  ),
)
const createFieldsErrorSelector = errorSelector => createSelector(
  [errorSelector, getErrorTextSelector],
  (error, getErrorText) => R.pipe(
    R.pathOr([], ['error', 'fieldsMapping']),
    R.reduce((errorsObj, value) => ({
      ...errorsObj,
      [value.field]: getErrorText(value.code),
    }), {}),
  )(error),
)
const createFormErrorsSelector = errorSelector => createSelector(
  [errorSelector, getErrorTextSelector],
  (error, getErrorText) => R.pipe(
    R.pathOr(null, ['error', 'code']),
    R.ifElse(
      R.isNil,
      R.defaultTo([]),
      getErrorText,
    ),
  )(error),
)

const getRecordHandler = (byId, currentLanguage) => id => R.pipe(
  R.prop(id),
  localizeWith(currentLanguage),
  // TODO: make recursive expand of relationship
  // R.evolve({
  //   relationships: R.pipe(
  //     R.mapObjIndexed((record, type) => {
  //
  //     }),
  //   ),
  // }),
  R.defaultTo({
    id: NaN,
    type: '',
    isFetched: false,
  }),
)(byId)

export const createCollectionSelectors = ({
  reducerNames,
  pathToRoot = [],
  isJsonApi = false,
}) => {
  // ======================== mainSelectors =====================
  const domainSelector = R.path([...pathToRoot, reducerNames.ROOT])
  const byIdSelector = createSelector(
    [domainSelector],
    R.prop(reducerNames.BY_ID),
  )
  const getRecordByIdSelector = createSelector(
    [byIdSelector, currentLanguageSelector],
    getRecordHandler,
  )
  const createRecordsByIdsSelector = ids => createSelector(
    [byIdSelector, currentLanguageSelector],
    (byId, currentLanguage) => ids.map(id => getRecordHandler(byId, currentLanguage)(id)),
  )

  const createRecordByIdSelector = mapPropsOrId => createSelector(
    [
      (state, props) => (isFunction(mapPropsOrId) ? mapPropsOrId(props) : mapPropsOrId),
      byIdSelector,
      currentLanguageSelector,
    ],
    (id, byId, currentLanguage) => getRecordHandler(byId, currentLanguage)(id),
  )

  const allRecordsSelector = createSelector(
    [byIdSelector, currentLanguageSelector],
    (byId, currentLanguage) => R.pipe(
      R.values,
      R.map(localizeWith(currentLanguage)), // TODO: localize should be deep
    )(byId),
  )

  const createRecordsByFilterSelector = mapStateAndPropsToFilter => createSelector(
    [mapStateAndPropsToFilter, allRecordsSelector],
    R.filter,
  )

  // ======================== queryRecordsSelectors =====================
  const queryRecordsSelectors = createRequestSelectors([...pathToRoot, reducerNames.ROOT, reducerNames.QUERY_RECORDS])
  const paginationSelector = isJsonApi
    ? createSelector(
      [queryRecordsSelectors.dataSelector],
      R.pathOr({
        offset: 0,
        limit: 0,
        total: 0,
      }, ['meta', 'pagination']),
    )
    : createSelector(
      [queryRecordsSelectors.dataSelector],
      R.propOr({
        currentPage: 0,
        itemsPerPage: 0,
        totalItems: 0,
      }, 'meta'),
    )

  const queryRecordsTotalItemsSelector = isJsonApi
    ? createSelector(
      [paginationSelector],
      R.propOr(0, 'total'),
    )
    : createSelector(
      [paginationSelector],
      R.propOr(0, 'totalItems'),
    )

  const paginationInfoSelector = createSelector(
    [queryRecordsSelectors.dataSelector],
    R.prop('paginationInfo'),
  )
  const offsetSelector = createSelector(
    [paginationInfoSelector],
    R.propOr(null, 'offset'),
  )
  const hasMoreSelector = createSelector(
    [paginationInfoSelector],
    R.pipe(
      R.defaultTo({
        count: 1,
        offset: 0,
        limit: 0,
      }),
      paginationInfo => paginationInfo.count > paginationInfo.offset + paginationInfo.limit,
    ),
  )

  // ======================== findRecordSelectors =====================
  const findRecordSelectors = createRequestSelectors([...pathToRoot, reducerNames.ROOT, reducerNames.FIND_RECORD])

  // ======================== createRecordSelectors =====================
  const createRecordSelectors = createRequestSelectors([...pathToRoot, reducerNames.ROOT, reducerNames.CREATE_RECORD])

  // ======================== updateRecordSelectors =====================
  const updateRecordSelectors = createRequestSelectors([...pathToRoot, reducerNames.ROOT, reducerNames.UPDATE_RECORD])

  // ======================== deleteRecordSelectors =====================
  const deleteRecordSelectors = createRequestSelectors([...pathToRoot, reducerNames.ROOT, reducerNames.DELETE_RECORD])

  return {
    createRecordByIdSelector,
    createRecordsByIdsSelector,
    getRecordByIdSelector,

    allRecordsSelector,
    createRecordsByFilterSelector,

    queryRecordsSelectors,
    paginationSelector,
    queryRecordsTotalItemsSelector,
    offsetSelector,
    hasMoreSelector,

    findRecordSelectors,

    createRecordSelectors,
    createFieldsErrorSelector: createFieldsErrorSelector(createRecordSelectors.errorSelector),
    createFormErrorsSelector: createFormErrorsSelector(createRecordSelectors.errorSelector),

    deleteRecordSelectors,
    deleteFieldsErrorSelector: createFieldsErrorSelector(deleteRecordSelectors.errorSelector),
    deleteFormErrorsSelector: createFormErrorsSelector(deleteRecordSelectors.errorSelector),

    updateRecordSelectors,
    updateFieldsErrorSelector: createFieldsErrorSelector(updateRecordSelectors.errorSelector),
    updateFormErrorsSelector: createFormErrorsSelector(updateRecordSelectors.errorSelector),
  }
}
