import { camelCase } from 'weplay-core/helpers/camelCase'
import transliterate from 'weplay-core/helpers/translit'
import { pathWithParamsByRoute } from 'weplay-core/routes'

export const getCanonicalUrl = ({ type, name, id }) => {
  const entityType = camelCase(type)
  const param = `${entityType}Id`
  const url = pathWithParamsByRoute(entityType, { [param]: id })
  return url.replace('*', transliterate(name))
}
