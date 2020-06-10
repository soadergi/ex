export const NAMES = {
  MEDIA: 'media',
  ARTICLE_SHOW: 'article',
  TAGS: 'tags',
  TAG_SHOW: 'tag',
  UNUSUAL_TAG: 'unusualTag',
  SPECIAL_TAGS: 'specialTags',
  SPECIAL_TAG: 'specialTag',
  AUTHOR: 'author',
  COLUMNISTS: 'columnists',
  COLUMNIST: 'columnist',
  GIVEAWAY: 'giveaway',
  CATEGORIES: 'categories',
  CHARACTERS: 'characters',
  CHARACTER: 'character',
  MY_MEDIA: 'myMedia',
  NO_LANG: 'noLang',
}

export const PROJECT_PREFIX = 'media'

export const ROUTES = [
  {
    name: NAMES.MEDIA,
    path: 'media',
  },
  {
    name: NAMES.ARTICLE_SHOW,
    path: 'news/*-:articleId/:tab?',
  },
  {
    name: NAMES.NO_LANG,
    path: ':pathNamePrefix/no-language-page-:itemId/:tab?',
  },
  {
    name: NAMES.TAGS,
    path: 'tags',
  },
  {
    name: NAMES.TAG_SHOW,
    path: 'tags/*-:tagId',
  },
  {
    name: NAMES.UNUSUAL_TAG,
    path: 'unusual-tags/*-:unusualTagId',
  },
  {
    name: NAMES.SPECIAL_TAGS,
    path: 'special-tags',
  },
  {
    name: NAMES.SPECIAL_TAG,
    path: 'special-tags/*-:specialTagId',
  },
  {
    name: NAMES.AUTHOR,
    path: '(authors|columnists)/*-:authorId',
  },
  {
    name: NAMES.COLUMNISTS,
    path: 'columnists',
  },
  {
    name: NAMES.GIVEAWAY,
    path: 'giveaway',
  },
  {
    name: NAMES.CATEGORIES,
    path: 'categories/:categoryName/:tab?',
  },
  {
    name: NAMES.CHARACTERS,
    path: 'characters',
    isDevOnly: true,
  },
  {
    name: NAMES.CHARACTER,
    path: 'characters/:character/:section?',
    isDevOnly: true,
  },
]
