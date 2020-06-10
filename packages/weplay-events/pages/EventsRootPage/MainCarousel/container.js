import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { createEventRootPageTopSliderSelector } from 'weplay-events/reduxs/rootpage/selectors'

import { ROOT_PAGE_ID } from '../constants'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nText: i18nTextsSelector,
    eventRootPageTopSlider: createEventRootPageTopSliderSelector(() => ROOT_PAGE_ID),
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'i18nText',
    'eventRootPageTopSlider',
  ], ({
    i18nText,
    eventRootPageTopSlider,
  }) => ({
    title: i18nText.events.eventsRootPage.topSlider.title,
    slides: eventRootPageTopSlider,
  })),
)

export default container
