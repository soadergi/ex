import React from 'react'
import PropTypes from 'prop-types'
import MediaPlayer from 'weplay-components/MediaPlayer'
import container from 'legacy-components/PromoBlock/VideoList/VideoItem/container'

const VideoItem = ({
  video,
  isLive,
  isTournamentInProgress,
}) => (
  <MediaPlayer
    withChat={isTournamentInProgress}
    url={video.videoUrl}
    isLive={isLive}
  />
)

VideoItem.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    videoUrl: PropTypes.string.isRequired,
  }).isRequired,
  isLive: PropTypes.bool.isRequired,
  isTournamentInProgress: PropTypes.bool.isRequired,

}

export default container(VideoItem)
