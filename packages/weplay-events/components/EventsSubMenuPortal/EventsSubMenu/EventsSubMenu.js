import React from 'react'

import Link from 'weplay-components/Link'

import useLocalizedHeaderMenuItems from '../useLocalizedHeaderMenuItems'

import styles from './SubMenu.scss'

function EventsSubMenu() {
  const localizedHeaderMenuItems = useLocalizedHeaderMenuItems()

  return (
    <ul className={styles.block}>
      {localizedHeaderMenuItems.map(menuItem => (
        <li
          key={menuItem.localizations.url}
          className={styles.listItem}
        >
          <Link
            exact={menuItem.exact}
            to={menuItem.localizations.url}
            className={styles.link}
            activeClassName={styles.isActive}
          >
            {menuItem.SubheaderComponent
              ? <menuItem.SubheaderComponent text={menuItem.localizations.text} />
              : menuItem.localizations.text}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default React.memo(EventsSubMenu)
