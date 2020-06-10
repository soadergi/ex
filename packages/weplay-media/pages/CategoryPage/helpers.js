import { snakeCase } from 'weplay-core/helpers/cases'

export const getTagsType = tagType => snakeCase(`${tagType}s`)

export const sortTags = (tags, selectedTags) => tags.sort((a, b) => {
  if (selectedTags[getTagsType(a.type)]?.includes(a.id)) {
    return -1
  }
  if (selectedTags[getTagsType(b.type)]?.includes(b.id)) {
    return +1
  }
  return 0
})
