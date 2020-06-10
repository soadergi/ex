import {
  compose,
  withPropsOnChange,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { TIME_INTERVAL } from './consts'

const container = compose(
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    // selectors
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'i18nTexts',
  ], ({
    i18nTexts,
  }) => ({
    timeIntervalOptions:
      TIME_INTERVAL.map(value => ({ value, label: i18nTexts.notificationsSettings.timeIntervalOptions[value] })),
    placeholder: i18nTexts.notificationsSettings.timeIntervalOptions.monthly,
  })),

  withProps({
    time: '00.30',
  }),
)

export default container
