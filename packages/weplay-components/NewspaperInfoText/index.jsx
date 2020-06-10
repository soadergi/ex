import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'
import Skeleton from 'weplay-components/Skeleton'

import styles from './styles.scss'

const colors = ['gray', 'white']

const NewspaperInfoText = ({
  // required props
  text,
  // container props
  // optional props
  hasIcon,
  className,
  isLight,
  color,
}) => (
  <div
    className={classNames(
      styles.block,
      styles[color],
      { [styles.gray]: isLight },
      className,
    )}
  >
    {hasIcon && (
      <Icon
        iconName="speedometer"
        size="small"
        className={styles.icon}
      />
    )}
    <span className={styles.time}>
      {text || <Skeleton minWidth="80px" /> }
    </span>
  </div>
)

NewspaperInfoText.propTypes = {
  // required props
  // container props
  text: PropTypes.string.isRequired,
  // optional props
  hasIcon: PropTypes.bool,
  isLight: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.oneOf([...colors, '']),
}

NewspaperInfoText.defaultProps = {
  // optional props
  hasIcon: false,
  isLight: false,
  className: '',
  color: '',
}

export default React.memo(NewspaperInfoText)
