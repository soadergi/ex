import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Image from 'weplay-components/Image'
import Icon from 'weplay-components/Icon'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './styles.scss'

const VideoArticleTabs = ({
  // required props
  previewUrl,
  onClick,
  isActive,
  iconName,
  // container props
  duration,
  ...restProps
}) => (
  <div
    className={classNames(
      styles.block,
      { [styles.isActive]: isActive },
    )}
    {...restProps}
  >
    <Button
      onClick={onClick}
      className={styles.button}
      priority={BUTTON_PRIORITY.RESET}
    >
      <figure className={styles.figure}>
        <Image
          className={styles.image}
          src={previewUrl}
          alt={previewUrl}
        />
      </figure>
      <div className={styles.wrapInfo}>
        <Icon
          iconName={iconName}
          className={styles.icon}
          size="small"
        />
        <p className={styles.videoInfo}>{duration}</p>
      </div>
    </Button>
  </div>
)

VideoArticleTabs.propTypes = {
  // required props
  previewUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  iconName: PropTypes.string.isRequired,
  // container props
  duration: PropTypes.string.isRequired,

}

VideoArticleTabs.defaultProps = {
  // optional props
}

export default React.memo(VideoArticleTabs)
