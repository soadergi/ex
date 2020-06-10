import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { createSpecialTagByTranslateIdSelector } from 'weplay-core/reduxs/specialTags/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    specialProject: createSpecialTagByTranslateIdSelector(R.prop('specialProjectTranslateId')),
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'specialProject',
  ], ({
    specialProject,
  }) => ({
    sliderSpecial: {
      title: R.prop('name', specialProject),
      url: R.prop('url', specialProject),
      backgroundUrl: R.path(['bgImage', 'path'], specialProject),
      backgroundAlt: R.path(['bgImage', 'attributes', 'alt'], specialProject),
      avatarUrl: R.path(['avatar', 'path'], specialProject),
      avatarAlt: R.path(['avatar', 'attributes', 'alt'], specialProject),
      newsCount: R.path(['counters', 'news'], specialProject),
    },
  })),
)

export default container
