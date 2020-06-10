import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import MediaPlayer from 'weplay-components/MediaPlayer'
import SectionHeader from 'weplay-components/SectionHeader'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './styles.scss'
import container from './container'

const hotMediaAlignTitle = ['hotMediaAlignTitle', 'hasLinkArrow']

export const VideosListMarkup = ({
  // required props
  i18nTexts,
  allVideosUrl,
  videoUrls,

  // props from container

  // optional props

  // analytic
  contentAction,
  contentType,
}) => {
  const t = useTranslation()

  return (
    <div
      className={styles.videosList}
    >
      <SectionHeader
        title={t('events.mediaHeaders.videos.title')}
        linkUrl={allVideosUrl}
        linkText={t('events.mediaHeaders.videos.link')}
        contentType={contentType}
        contentAction={contentAction}
        modifiers={hotMediaAlignTitle}
        hasLinkArrow
      />

      <div className={styles.wrapper}>
        {videoUrls.map(url => !R.isEmpty(url) && (
          <div
            className={styles.video}
            key={url}
          >
            <MediaPlayer
              url={url}
              i18nTexts={i18nTexts}
              isLive={false}
              isStaticPosition
            />
          </div>
        ))}
      </div>
    </div>
  )
}

VideosListMarkup.propTypes = {
  // required props
  videoUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  allVideosUrl: PropTypes.string.isRequired,

  // optional props
  contentAction: PropTypes.string,
  contentType: PropTypes.string,
}

VideosListMarkup.defaultProps = {
  contentAction: '',
  contentType: '',
}
export default container(VideosListMarkup)
