import React from 'react'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'


const IconList = ({
  // required props
  items,
  // container props

  // optional props
  className,
}) => (
  <ul className={classNames(
    styles.block,
    className,
  )}
  >
    {items.map(item => (
      <li
        className={styles.icon}
        key={item.iconName}
      >
        <span className={styles.tooltip}>{item.tooltipText}</span>
        <Icon
          iconName={item.iconName}
          size="small"
        />
      </li>
    ))}
  </ul>
)

IconList.propTypes = {
  // required props
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // container props

  // optional props
  className: PropTypes.string,
}

IconList.defaultProps = {
  // optional props
  className: '',
}

export default container(IconList)
