import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import Search from '../Search'

import SubMenu from './SubMenu/SubMenu'
import MoreMenu from './MoreMenu/MoreMenu'
import container from './container'
import styles from './styles.scss'

const SubHeader = ({
  // required props
  // container props
  handleMenuLineRef,
  primaryMenu,
  secondaryMenu,
  moreMenu,
  // optional props
}) => {
  const isLoggedIn = useSelector(isLoggedInSelector)
  const isMoreMenu = moreMenu.length > 0
  const isSecondaryMenu = isLoggedIn && secondaryMenu.length > 0

  return (
    <div className={styles.block}>
      <div
        className={styles.menuLine}
        ref={handleMenuLineRef}
      >
        <div className={styles.menuWrapper}>
          <SubMenu items={primaryMenu} />
          {isMoreMenu && (
            <MoreMenu items={moreMenu} />
          )}
        </div>
        <div className={styles.menuWrapper}>
          {isSecondaryMenu && (
            <div className={styles.rightMenu}>
              <SubMenu
                items={secondaryMenu}
                isSecondary
              />
            </div>
          )}
          <Search />
        </div>
      </div>
    </div>
  )
}

SubHeader.propTypes = {
  // required props
  // container props
  handleMenuLineRef: PropTypes.func.isRequired,
  primaryMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  secondaryMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  moreMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // optional props
}

SubHeader.defaultProps = {
  // optional props
}

export default container(SubHeader)
