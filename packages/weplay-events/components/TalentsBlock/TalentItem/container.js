import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'talent',
  ], ({
    talent,
  }) => ({
    socialLinks: R.map(link => ({
      url: link.link,
      type: link.linkType,
      title: link.title,
    }), talent.socialLinks),
  })),

)

export default container
