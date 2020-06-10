import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

export const modifiers = [
  'icon',
  'eye',
  'comment',
  'share',
  'clock',
  'white',
]
export const ActivityMarkup = ({
  children,
  activityIcon,
  className,
  modifications,
}) => {
  const iconModification = styles[activityIcon]

  return (
    <li className={classNames(
      styles.item,
      className,
      modifications.map(modification => styles[modification]),
    )}
    >
      <div className={classNames(
        'u-mr-1',
        iconModification,
      )}
      >
        <Icon
          iconName={activityIcon}
          className={styles.icon}
        />
      </div>

      <span className={styles.data}>
        { children }
      </span>
    </li>
  )
}

ActivityMarkup.propTypes = {
  children: PropTypes.node.isRequired,
  activityIcon: PropTypes.string.isRequired,

  className: PropTypes.string,
  modifications: PropTypes.arrayOf(PropTypes.oneOf(modifiers)),
}

ActivityMarkup.defaultProps = {
  className: '',
  modifications: [],
}

export default container(ActivityMarkup)
