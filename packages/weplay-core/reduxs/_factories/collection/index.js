import { createCollectionNames } from './createCollectionNames'
import { createCollectionActions } from './createCollectionActions'
import { createCollectionSelectors } from './createCollectionSelectors'
import { createCollectionReducer } from './createCollectionReducer'

// ================ BELOW ===========
// TODO: register reducer in root reducer here??
export const createCollectionRedux = ({
  domain,
  service,
  isJsonApi = true,
  pathToRoot,
  apiVersion,
}) => {
  const {
    reducerNames,
    actionNames,
    domainUrl,
    idFieldName,
  } = createCollectionNames({
    domain,
    service,
    isJsonApi,
    apiVersion,
  })
  const collectionActions = createCollectionActions({
    actionNames,
    domainUrl,
    isJsonApi,
    service, // for dispatching included models (other then domain here)
  })

  return ({
    REDUCER_NAME: reducerNames.ROOT,
    actions: collectionActions,
    selectors: createCollectionSelectors({
      reducerNames,
      pathToRoot,
      isJsonApi,
    }),
    reducer: createCollectionReducer({
      reducerNames,
      isJsonApi,

      idFieldName,
      collectionActions,
    }),
  })
}
