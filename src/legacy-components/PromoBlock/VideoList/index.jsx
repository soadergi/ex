import React from 'react'
import PropTypes from 'prop-types'
import VideoItem from 'legacy-components/PromoBlock/VideoList/VideoItem'
import styles from 'legacy-components/PromoBlock/VideoList/styles.scss'
import container from 'legacy-components/PromoBlock/VideoList/container'

const VideoList = ({
  i18nTexts,
  videos,
}) => (
  <div>
    <ul className={styles.list}>
      {videos.map(video => (
        <li key={video.id}>
          <VideoItem
            video={video}
          />
        </li>
      ))}
    </ul>

    <a
      target="_blank"
      rel="noreferrer noopener"
      className={styles.link}
      href="https://www.youtube.com/channel/UCB1Cp_eNvUGWoIt4K0ZGDDg"
    >
      {i18nTexts.promoBlock.videoLink}
    </a>
  </div>
)

VideoList.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    videoUrl: PropTypes.string.isRequired,
  })).isRequired,
}

export default container(VideoList)
