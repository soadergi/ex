import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const MAX_LATEST_NEWS = 5
const MIN_LATEST_NEWS = 3

// TODO: @front please rewrite it with hooks
const container = compose(
  connect(createStructuredSelector({
    // selectors
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'latestNews',
  ], ({
    latestNews,
  }) => ({
    latest5News: latestNews.slice(0, MAX_LATEST_NEWS),
    latest3News: latestNews.slice(0, MIN_LATEST_NEWS),
  })),
)

export default container
