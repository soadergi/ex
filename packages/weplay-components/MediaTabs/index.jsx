import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import MediaContent from 'weplay-components/MediaContent/loadable'

import VideoDescription from './VideoDescription'
import VideoPreview from './VideoPreview'
import container from './container'
import styles from './styles.scss'

const MediaTabs = ({
  // required props
  videos,
  viewMoreLink,
  // container props
  activeTabIndex,
  handleSetActiveTabIndex,
  activeVideoUrl,
  activeVideoTitle,
  isFirstVideoViewed,
  // optional props
  isViewMoreVideoButtonDisable,
}) => {
  const t = useTranslation()

  return (
    <div
      className={styles.block}
    >
      <div className={styles.videoContainer}>
        <MediaContent
          title={activeVideoTitle}
          url={activeVideoUrl}
          isAutoplay={isFirstVideoViewed}
        />
        <div className={styles.wrapDescription}>
          <VideoDescription
            video={videos[activeTabIndex]}
          />
        </div>
      </div>

      <div className={styles.videosListing}>
        <div className={styles.wrap}>
          {videos.map((video, index) => (
            <VideoPreview
              key={video.title}
              video={video}
              onClick={() => handleSetActiveTabIndex(index)}
              isActive={activeTabIndex === index}
            />
          ))}
        </div>

        {!isViewMoreVideoButtonDisable && (
          <Link
            to={viewMoreLink}
            className={styles.link}
          >
            {t('button.viewMoreBtn')}
            <Icon
              iconName="arrow"
              className={styles.icon}
            />
          </Link>
        )}
      </div>
    </div>
  )
}

MediaTabs.propTypes = {
  // required props
  videos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  viewMoreLink: PropTypes.string.isRequired,
  // container props
  activeTabIndex: PropTypes.number.isRequired,
  handleSetActiveTabIndex: PropTypes.func.isRequired,
  activeVideoUrl: PropTypes.string.isRequired,
  activeVideoTitle: PropTypes.string.isRequired,
  isFirstVideoViewed: PropTypes.bool.isRequired,
  // optional props
  isViewMoreVideoButtonDisable: PropTypes.bool,
}

MediaTabs.defaultProps = {
  // optional props
  isViewMoreVideoButtonDisable: false,
}

export default container(MediaTabs)
