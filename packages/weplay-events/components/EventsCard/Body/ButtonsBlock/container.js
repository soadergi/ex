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
    'event',
    'i18nTexts',
  ], ({
    event,
    i18nTexts,
  }) => ({
    detailsButtonText: i18nTexts.events.eventsRootPage.futureEventsBlock.body[
      event.tournamentType === 'qualification'
        ? 'takePartButton'
        : 'detailsButton'
    ],
  })),
)

export default container
