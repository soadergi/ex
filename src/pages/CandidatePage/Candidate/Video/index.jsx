import React from 'react'
import MediaPlayer from 'weplay-components/MediaPlayer'
import PropTypes from 'prop-types'


import styles from './styles.scss'
import container from './container'

const Video = ({ videoUrl }) => (
  <div className={styles.content}>
    <MediaPlayer
      url={videoUrl}
      isLive={false}
    />
  </div>
)

Video.propTypes = {
  videoUrl: PropTypes.string.isRequired,
}

export default container(Video)
