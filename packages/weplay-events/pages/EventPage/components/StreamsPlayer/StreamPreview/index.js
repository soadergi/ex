import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'

import { useStreamPreview } from './container'
import styles from './styles.scss'

const StreamPreview = ({
  stream,
  isActive,
  clickHandler,
  setCurrentStreamTitle,
}) => {
  const t = useTranslation()
  const {
    handleClick,
    streamThumbnailUrl,
    isLive,
    streamTitle,
  } = useStreamPreview({
    stream,
    clickHandler,
    setCurrentStreamTitle,
    isActive,
  })

  return (
    <div className={classNames(
      styles.block,
      { [styles.isActive]: isActive },
      { [styles.isOffline]: !isLive },
    )}
    >
      {isLive && (
        <div className={styles.liveNotification}>
          <span className={styles.liveText}>
            {t('events.liveNotification')}
          </span>
        </div>
      )}

      <div className={styles.wrapImage}>
        <Image
          className={styles.image}
          src={streamThumbnailUrl}
          alt=""
          onClick={handleClick}
        />
      </div>

      <span className={styles.text}>
        {streamTitle}
      </span>
    </div>
  )
}

StreamPreview.propTypes = {
  stream: PropTypes.shape({}).isRequired,
  // isActive: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  setCurrentStreamTitle: PropTypes.func.isRequired,
}

export default StreamPreview
