import React from 'react'
import PropTypes from 'prop-types'
import Tweet from 'weplay-components/Tweet/loadable'

const TweetWidget = props => (
  <div id="content">
    <Tweet tweetId={props.id} />
  </div>
)

export default (TweetWidget)

TweetWidget.propTypes = {
  id: PropTypes.string.isRequired,
}
