import pluralize from 'pluralize'

const createReducerNames = ({ DOMAIN, servicesSuffix }) => ({
  ROOT: `${servicesSuffix}:${pluralize(DOMAIN)}`,
  BY_ID: 'byId',
  FIND_RECORD: `FIND_${DOMAIN}`,
  QUERY_RECORDS: `QUERY_${pluralize(DOMAIN)}`,
  CREATE_RECORD: `CREATE_${DOMAIN}`,
  UPDATE_RECORD: `UPDATE_${DOMAIN}`,
  DELETE_RECORD: `DELETE_${DOMAIN}`,
})
// actionNames should be uniq across all reducers of all platforms
// we need to think about it
// now it is garanteed by service and domain, but version could also have impact
// maybe it is better to pass some id when creating reducer and use just this id
const serviceSuffixRegex = /(.*)-service/
const createActionNames = ({ DOMAIN, servicesSuffix }) => ({
  PUT_BY_ID: `PUT_BY_ID_${DOMAIN}(${servicesSuffix})`,
  PATCH_BY_ID: `PATCH_BY_ID_${DOMAIN}(${servicesSuffix})`,
  CLEAR_RECORDS: `CLEAR_RECORDS_${DOMAIN}(${servicesSuffix})`,

  FIND_RECORD: `FIND_${DOMAIN}(${servicesSuffix})`,
  QUERY_RECORDS: `QUERY_${pluralize(DOMAIN)}(${servicesSuffix})`,
  CREATE_RECORD: `CREATE_${DOMAIN}(${servicesSuffix})`,
  UPDATE_RECORD: `UPDATE_${DOMAIN}(${servicesSuffix})`,
  DELETE_RECORD: `DELETE_${DOMAIN}(${servicesSuffix})`,
})
export const createCollectionNames = ({
  domain,
  service,
  isJsonApi,
  apiVersion,
}) => {
  const DOMAIN = domain.toUpperCase()
  const domainVersion = apiVersion ? `v${apiVersion}/` : ''
  const servicesSuffix = serviceSuffixRegex.exec(service)?.[1]
  return ({
    domainUrl: `/${service}/${domainVersion}${pluralize(domain)}`,
    idFieldName: isJsonApi ? 'id' : `${domain}Id`,
    reducerNames: createReducerNames({ DOMAIN, servicesSuffix }),
    actionNames: createActionNames({ DOMAIN, servicesSuffix }),
  })
}
