import { combineReducers } from 'redux'

import tags, { TAGS_RN } from './tags/reducer'
import banners, { BANNERS_RN } from './banners/reducer'
import { AUTHORS_RN, authorReducer } from './authors'
import unusualTags, { UNUSUAL_TAGS_RN } from './unusualTag/reducer'
import seoTags, { SEO_TAGS_RN } from './seoTags/reducer'
import comments, { COMMENTS_RN } from './comments/reducer'
import categories, { CATEGORIES_RN } from './categories/reducer'
import allTags, { ALL_TAGS_RN } from './allTags/reducer'

export default combineReducers({
  [TAGS_RN]: tags,
  [BANNERS_RN]: banners,
  [AUTHORS_RN]: authorReducer,
  [UNUSUAL_TAGS_RN]: unusualTags,
  [SEO_TAGS_RN]: seoTags,
  [COMMENTS_RN]: comments,
  [CATEGORIES_RN]: categories,
  [ALL_TAGS_RN]: allTags,
})
