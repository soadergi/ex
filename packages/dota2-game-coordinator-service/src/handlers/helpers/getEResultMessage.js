import { EResult } from '../../config'

export const getEResultMessage = EResultCode => {
  return Object.keys(EResult).find(key => EResult[key] === EResultCode)
}
