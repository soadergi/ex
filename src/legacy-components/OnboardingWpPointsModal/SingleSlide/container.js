import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { singleSlideItems } from '../config'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'i18nTexts',
  ], ({
    i18nTexts,
  }) => ({
    items: singleSlideItems.map(item => ({
      icon: item.iconName,
      text: i18nTexts.onboardingWpPointsModal[item.localizationKey],
    })),
  })),
)

export default container
