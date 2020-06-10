import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import socialPostPropType from 'weplay-core/customPropTypes/socialPostPropType'
import { SOCIAL_NAMES } from 'weplay-core/config'

import MediaPlayer from 'weplay-components/MediaPlayer'
import IframePost from 'weplay-components/IframePost/loadable'

import Tweet from '../Tweet/loadable'
import FacebookPost from '../FacebookPost/index'
import InstagramPost from '../InstagramPost/loadable'

import { getTwitchLink } from './getTwitchLink'
import container from './container'

const SocialPost = ({
  // required props
  post,
  // container props
  // optional props
  className,
}) => (
  <div className={classNames(
    'u-mb-2',
    className,
  )}
  >
    {(post.type === SOCIAL_NAMES.FB) && (
      <FacebookPost postUrl={post.url} />
    )}
    {(post.type === SOCIAL_NAMES.TW) && (
      <Tweet
        tweetId={post.id}
      />
    )}
    {(post.type === SOCIAL_NAMES.INST) && (
      <InstagramPost
        url={post.url}
      />
    )}
    {(post.type === SOCIAL_NAMES.LINK) && (
      <IframePost
        url={post.url}
      />
    )}
    {((post.type === SOCIAL_NAMES.TWITCH)) && (
      <IframePost
        url={getTwitchLink(post.url)}
      />
    )}
    {(post.type === SOCIAL_NAMES.YOUTUBE) && (
      <MediaPlayer
        url={post.url}
        isLive={false}
      />
    )}
  </div>
)

SocialPost.propTypes = {
  // required props
  post: socialPostPropType.isRequired,
  // container props
  // optional props
  className: PropTypes.string,
}

SocialPost.defaultProps = {
  // optional props
  className: '',
}

export default container(SocialPost)
