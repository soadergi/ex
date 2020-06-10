import * as R from 'ramda'

const mapTagsToBigBannerConfig = (tags, tagType, language) => tags.map(tag => ({
  tagType,
  tagTypeId: tag.tagId,
  language,
}))

export const getTagsConfigFromNewspaper = (newspaper) => {
  if (!newspaper || R.isEmpty(newspaper)) {
    return null
  }
  const language = newspaper.language
  const tags = mapTagsToBigBannerConfig(newspaper.tags, 'tag', language)
  const unusualTags = mapTagsToBigBannerConfig(newspaper.unusualTags, 'unusualTag', language)
  const specialTag = newspaper.specialTag ? {
    tagType: 'specialTag',
    tagTypeId: newspaper.specialTag.specialTagTranslateId,
    language,
  } : null

  const tagConfigList = tags.concat(unusualTags)

  if (specialTag) {
    tagConfigList.push(specialTag)
  }

  return tagConfigList
}
