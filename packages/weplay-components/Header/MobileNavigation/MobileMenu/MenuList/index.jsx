import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import BetaLabel from 'weplay-components/BetaLabel'

import container from './container'
import styles from './styles.scss'

const MenuList = ({
  // required props
  title,
  // container props
  isCollapsed,
  handleClick,
  // optional props
  url,
  label,
  customSubmenu,
}) => (
  <div className={styles.block}>
    <Link
      to={customSubmenu ? '/' : url}
      className={styles.title}
      onClick={handleClick}
    >
      <span className={styles.text}>
        {title}
        {label && (
        <BetaLabel text={label} />
        )}
      </span>

      {customSubmenu && (
        <span className={classNames(
          styles.icon,
          { [styles.isArrowUp]: isCollapsed },
        )}
        >
          <Icon
            iconName="arrow-down-second"
            size="small"
            className={styles.arrow}
          />
        </span>
      )}
    </Link>

    {customSubmenu && (
      <ul
        className={classNames(
          styles.list,
          { [styles.isCollapsed]: isCollapsed },
        )}
      >
        {customSubmenu}
      </ul>
    )}
  </div>
)

MenuList.propTypes = {
  // required props
  title: PropTypes.string.isRequired,
  // container props
  isCollapsed: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  customSubmenu: PropTypes.node.isRequired,
  // hasSubMenu: PropTypes.bool.isRequired,
  // optional props
  url: PropTypes.string,
  label: PropTypes.string,
}

MenuList.defaultProps = {
  // optional props
  url: '',
  label: '',
}

export default container(MenuList)
