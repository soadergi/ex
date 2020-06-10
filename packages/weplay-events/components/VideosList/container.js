import {
  compose,
  withProps,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { videoUrlsSelector, allVideosUrlSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    videoUrls: videoUrlsSelector,
    allVideosUrl: allVideosUrlSelector,
  }), {
    // actionCreators
  }),

  withProps({
    // analytic
    contentType: 'Content',
    contentAction: 'Show all videos',
  }),
)

export default container
