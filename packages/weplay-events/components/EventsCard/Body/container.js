import {
  compose, withPropsOnChange, withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    isMobileWidth: isMobileWidthSelector,
  }), {
    // actionCreators
  }),

  withStateHandlers({
    isExpanded: false,
  }, {
    toggleExpanded: ({
      isExpanded,
    }) => () => ({
      isExpanded: !isExpanded,
    }),
  }),

  withPropsOnChange([
    'isExpanded',
    'i18nTexts',
  ], ({
    isExpanded,
    i18nTexts,
  }) => ({
    toggleButtonText: isExpanded === false
      ? i18nTexts.events.eventsRootPage.futureEventsBlock.body.moreInfoButton
      : i18nTexts.events.eventsRootPage.futureEventsBlock.body.lessInfoButton,
  })),
)

export default container
