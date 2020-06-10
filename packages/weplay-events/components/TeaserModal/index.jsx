import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import ReactPlayerWrapper from 'weplay-components/ReactPlayerWrapper'

import container from './container'
import styles from './styles.scss'

const TeaserModal = ({
  // required props
  onCloseModal,
  videoUrl,

  // container props

  // optional props
}) => (
  <div
    className={styles.block}
    onClick={onCloseModal}
  >
    <div className={styles.wrap}>
      <div className={styles.container}>
        <button
          className={classNames(
            styles.close,
          )}
          type="button"
          onClick={onCloseModal}
        >
          <Icon
            iconName="close"
            className={styles.closeIcon}
          />
        </button>
        <div className={styles.wrapVideo}>
          <ReactPlayerWrapper
            className={styles.videoPlayer}
            url={videoUrl}
            width="100%"
            height="100%"
            controls
          />
        </div>
      </div>
    </div>
  </div>
)

TeaserModal.propTypes = {
  // required props
  onCloseModal: PropTypes.func.isRequired,
  videoUrl: PropTypes.string.isRequired,

  // container props

  // optional props
}

TeaserModal.defaultProps = {
  // optional props
}

export default container(TeaserModal)
