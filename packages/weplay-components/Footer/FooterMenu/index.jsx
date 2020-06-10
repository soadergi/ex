import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import FooterList from './FooterList'
import container from './container'
import styles from './styles.scss'

const FooterMenu = ({
  hasSubMenu,
  menu,
  currentLanguage,
}) => (
  <div className={styles.block}>
    {hasSubMenu
      ? (menu.map((submenu, index) => (
        <div
          key={submenu.id}
          className={classNames({ 'u-mb-3': index !== menu.length })}
        >
          <h4 className={styles.subTitle}>
            {submenu.localizations.name}
          </h4>
          <FooterList
            currentLanguage={currentLanguage}
            list={submenu.submenu}
          />
        </div>
      ))) : (
        <FooterList
          currentLanguage={currentLanguage}
          list={menu}
        />
      )}
  </div>
)

FooterMenu.propTypes = {
  // required props
  menu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  // container props
  hasSubMenu: PropTypes.bool.isRequired,
  // optional props
}

FooterMenu.defaultProps = {
  // optional props
}

export default container(FooterMenu)
