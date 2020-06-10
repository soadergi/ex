import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ShareBlock from 'weplay-components/ShareBlock/ShareBlock'

import styles from './ShareGameBlock.scss'

const shareBlockColor = 'borderNone'

const ShareGameBlock = ({
  caption,
  shareText,
  className,
}) => (
  <div className={classNames(styles.block, className)}>
    <span className={styles.title}>
      {caption}
    </span>
    <ShareBlock
      className={styles.share}
      color={shareBlockColor}
      sharedText={shareText}
    />
  </div>
)

ShareGameBlock.propTypes = {
  caption: PropTypes.string.isRequired,
  shareText: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ShareGameBlock.defaultProps = {
  className: '',
}

export default React.memo(ShareGameBlock)
