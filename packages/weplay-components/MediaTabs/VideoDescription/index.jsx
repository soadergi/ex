import tagPropType from 'weplay-core/customPropTypes/tagPropType'
import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Icon from 'weplay-components/Icon'
import HashTags from 'weplay-components/HashTags'

import container from './container'
import styles from './styles.scss'

const VideoDescription = ({
  // required props
  video,
  // container props
  seoText,
  isReadMoreActive,
  toggleSeoTextViewStatus,
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <HashTags
        tags={video.tags}
      />

      <h2 className={styles.title}>{video.title}</h2>
      <p className={styles.text}>{seoText}</p>

      {isReadMoreActive && (
        <>
          <p className={styles.cut}>{video.seo}</p>
          <button
            type="button"
            onClick={toggleSeoTextViewStatus}
            className={styles.button}
          >
            {t('root.videos.readMore')}
            <Icon
              iconName="arrow-expand"
              className={styles.icon}
            />
          </button>
        </>
      )}
    </div>
  )
}

VideoDescription.propTypes = {
  // required props
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(tagPropType),
    seo: PropTypes.string.isRequired,
  }).isRequired,
  // container props
  seoText: PropTypes.string.isRequired,
  isReadMoreActive: PropTypes.bool.isRequired,
  toggleSeoTextViewStatus: PropTypes.func.isRequired,
  // optional props
}

VideoDescription.defaultProps = {
  // optional props
}

export default container(VideoDescription)
