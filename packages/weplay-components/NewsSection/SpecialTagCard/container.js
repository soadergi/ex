import * as R from 'ramda'
import {
  branch,
  compose, renderNothing,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { transformUrl } from 'weplay-core/helpers/transformUrl'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { createSpecialTagByIdSelector } from 'weplay-core/reduxs/specialTags/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    specialTag: createSpecialTagByIdSelector(R.prop('specialTagId')),
  }), {
    // actionCreators
  }),

  branch(
    ({ specialTag }) => R.or(R.isNil(specialTag), R.isEmpty(specialTag)),
    renderNothing,
  ),

  withPropsOnChange([
    'specialTag',
    'i18nTexts',
  ], ({
    specialTag,
    i18nTexts,
  }) => ({
    title: R.prop('name', specialTag),
    url: `/special-tags/${transformUrl(specialTag)}`, // TODO: @Andrew, use more general solution
    image: {
      url: R.path(['avatar', 'path'], specialTag),
      alt: R.path(['avatar', 'attributes', 'alt'], specialTag),
    },
    newsCounter: `${R.path(['counters', 'news'], specialTag)} ${i18nTexts.article.articles}`,
    description: R.prop('shortDescription', specialTag),
  })),

  withPropsOnChange(
    [
      'title',
      'url',
    ], ({
      title,
      url,
    }) => ({
      tags: [
        {
          name: title,
          url,
        },
      ],
    }),
  ),
)

export default container
