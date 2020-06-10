import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import Label from 'weplay-components/Label'

import styles from './SubMenu.scss'

const SubMenu = ({
  items,
  isSecondary,
}) => (
  <ul className={styles.block}>
    {items.map(({
      text,
      url,
      iconName,
      label,
      isHighlighted,
      isExternal,
      ...linkProps
    }) => (
      <li
        key={text}
        className={styles.listItem}
      >
        <Link
          to={url}
          className={classNames(
            styles.link,
            isSecondary && styles.gray,
            isHighlighted && styles.highlighted,
          )}
          activeClassName={styles.isActive}
          {...linkProps}
        >
          {iconName && (
            <Icon
              iconName={iconName}
              className={styles.icon}
            />
          )}
          <span>{text}</span>
          {label && (
            <Label
              color={label.color}
              className={styles.label}
            >
              {label.text}
            </Label>
          )}
        </Link>
      </li>
    ))}
  </ul>
)

SubMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    iconName: PropTypes.string,
    label: PropTypes.shape({
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  })).isRequired,
  isSecondary: PropTypes.bool,
}

SubMenu.defaultProps = {
  isSecondary: false,
}

export default React.memo(SubMenu)
