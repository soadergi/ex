import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'

import styles from './MenuItem.scss'

const MenuItem = ({
  // required props
  text,
  url,
  onClick,
  // optional props
  iconName,
  isHighlighted,
  ...linkProps
}) => (
  <li className={styles.block}>
    <Link
      to={url}
      className={classNames(
        styles.link,
        { [styles.highlighted]: isHighlighted },
      )}
      onClick={onClick}
      activeClassName={styles.isActive}
      {...linkProps}
    >
      {text}

      {iconName && (
        <Icon
          iconName={iconName}
          className={styles.menuIcon}
          size="small"
        />
      )}
    </Link>
  </li>
)

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  isHighlighted: PropTypes.bool,
}

MenuItem.defaultProps = {
  iconName: '',
  isHighlighted: false,
}

export default React.memo(MenuItem)
