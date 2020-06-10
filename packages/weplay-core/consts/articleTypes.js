import { camelCase } from 'weplay-core/helpers/camelCase'

export const ARTICLE_TYPES = {
  USUAL: 1,
  LONGREAD: 3,
  VIDEO: 4,
  AUDIO: 5,
  INTERVIEW: 8,
  GUIDE: 9,
}

export const ARTICLE_TYPE_NAMES = Object.keys(ARTICLE_TYPES).reduce((acc, key) => ({
  ...acc,
  [ARTICLE_TYPES[key]]: camelCase(key),
}), {})
