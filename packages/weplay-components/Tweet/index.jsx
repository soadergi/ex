import React from 'react'
import PropTypes from 'prop-types'
import { TwitterTweetEmbed } from 'react-twitter-embed'

import container from './container'
import './tweet.scss'

export const TweetMarkup = ({
  // required props
  tweetId,

  // container props

  // optional props
}) => (
  <TwitterTweetEmbed tweetId={tweetId} />
)

TweetMarkup.propTypes = {
  // required props
  tweetId: PropTypes.string.isRequired,

  // container props

  // optional props
}

TweetMarkup.defaultProps = {
  // optional props
}

export default container(TweetMarkup)
