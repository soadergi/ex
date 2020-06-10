import { $isEmpty } from './$isEmpty'
import { $isNil } from './$isNil'

export const $hasData = entity => !$isEmpty(entity) && !$isNil(entity)
