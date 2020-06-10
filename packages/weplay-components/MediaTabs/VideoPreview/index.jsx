import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Image from 'weplay-components/Image'
import HashTags from 'weplay-components/HashTags'
import { cutTextWithLength } from 'weplay-core/helpers/cutTextWithLength'
import { getTimeStringFromYoutube } from 'weplay-core/helpers/getTimeStringFromYoutube'

import styles from './styles.scss'

const TITLE_MAX_LENGTH = 35

const VideoPreview = ({
  // required props
  video,
  onClick,
  isActive,
}) => {
  const title = cutTextWithLength({
    text: video.title,
    maxLength: TITLE_MAX_LENGTH,
  })
  const duration = getTimeStringFromYoutube(video?.duration)

  return (
    <div
      className={classNames(
        styles.block,
        { [styles.isActive]: isActive },
      )}
      onClick={onClick}
    >
      <figure className={styles.figure}>
        <Image
          className={styles.image}
          src={video.previewUrl}
          alt={video.title}
        />
        <span className={styles.videoInfo}>{duration}</span>
      </figure>

      <HashTags
        className="u-pt-2"
        tags={video.tags}
      />

      <h2 className={styles.title}>{title}</h2>
    </div>
  )
}

VideoPreview.propTypes = {
  // required props
  video: PropTypes.shape({
    previewUrl: PropTypes.string,
    title: PropTypes.string,
    videoInfo: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default VideoPreview
