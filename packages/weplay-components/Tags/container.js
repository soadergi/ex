import * as R from 'ramda'
import {
  compose,
  branch,
  renderNothing,
  defaultProps,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { createSpecialTagAllTagsSelector } from 'weplay-core/reduxs/specialTags/reducer'

const DEFAULT_LIST_LENGTH = 2

const container = compose(
  connect(createStructuredSelector({
    isMobileWidth: isMobileWidthSelector,
    tagsForSpecials: createSpecialTagAllTagsSelector(R.prop('specialTagTranslateId')),
  })),

  defaultProps({
    isHiddenSpecialTag: false,
    isFullList: false,
    currentTagUrl: null,
  }),

  withPropsOnChange([
    'specialTag',
    'tagsForNews',
    'tagsForSpecials',
  ], ({
    specialTagTranslateId,
    specialTag,
    tagsForNews,
    tagsForSpecials,
    isHiddenSpecialTag,
    isFullList,
    currentTagUrl,
  }) => {
    let allTags
    if (!specialTagTranslateId) {
      const viewedTags = currentTagUrl
        ? R.reject(R.propEq('url', currentTagUrl), tagsForNews)
        : tagsForNews
      allTags = !isHiddenSpecialTag && specialTag
        ? R.prepend(specialTag, viewedTags)
        : viewedTags
    } else {
      allTags = tagsForSpecials
    }
    return {
      tagsToShow: isFullList ? allTags : R.slice(0, DEFAULT_LIST_LENGTH, allTags),
    }
  }),

  branch(
    ({ tagsToShow }) => R.isNil(tagsToShow),
    renderNothing,
  ),
)

export default container
