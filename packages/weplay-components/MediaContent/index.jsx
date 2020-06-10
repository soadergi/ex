import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import MediaPlayer from 'weplay-components/MediaPlayer'

import styles from './styles.scss'

const articlePlayer = ['articlePlayer']

const MediaContent = ({
  // required props
  url,
  // optional props
  isAudio,
  isAutoplay,
}) => (
  <div className={classNames(
    styles.block,
    { [styles.audio]: isAudio },
  )}
  >
    <div className={styles.videoWrap}>
      <MediaPlayer
        url={url}
        modifiers={articlePlayer}
        isAudio={isAudio}
        isAutoplay={isAutoplay}
      />
    </div>
  </div>
)

MediaContent.propTypes = {
  // required props
  url: PropTypes.string.isRequired,
  // optional props
  isAudio: PropTypes.bool,
  isAutoplay: PropTypes.bool,
}

MediaContent.defaultProps = {
  // optional props
  isAudio: false,
  isAutoplay: false,
}

export default React.memo(MediaContent)
