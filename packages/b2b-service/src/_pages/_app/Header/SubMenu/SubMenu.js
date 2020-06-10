import React from 'react'
import classNames from 'classnames'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import Link from 'weplay-components/Link'

import styles from './SubMenu.scss'

const SubMenu = ({
  locale,
  menuList,
  currentUrl,
  match,
}) => {
  const langPrefix = locale === 'en' ? '' : `/${locale}`
  return (
    <div className={styles.block}>
      <div className={styles.menuLine}>
        <ul className={styles.menuBlock}>
          {menuList.map((menuItem) => {
            const menuItemUrl = `${langPrefix}${menuItem.localizations.url}`
            const isTeamMemberPage = currentUrl === `${menuItemUrl}/${match.params.memberName}`
            const isUrlStrictMatch = currentUrl === `${menuItemUrl}`
            const isActive = isUrlStrictMatch || isTeamMemberPage
            return (
              <li
                key={menuItem.id}
                className={styles.listItem}
              >
                <Link
                  to={menuItem.localizations.url}
                  className={classNames(
                    styles.link,
                    {
                      [styles.isActive]: isActive,
                    },
                  )}
                >
                  {menuItem.localizations.text}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default withRouteInfo(SubMenu)
