import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import UserItem from '../UserItem'
import styles from '../UserItem/styles.scss'

function UsersList({ ticketsActivationsList }) {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)

  return (
    <>
      {!isMobileWidth && (
        <div className={styles.row}>
          <p className={styles.headerText}>{t('events.ticketsPage.userItem.nickname')}</p>
          <p className={styles.headerText}>{t('events.ticketsPage.userItem.firstName')}</p>
          <p className={styles.headerText}>{t('events.ticketsPage.userItem.lastName')}</p>
          <p className={styles.headerText}>{t('events.ticketsPage.userItem.email')}</p>
          <p className={styles.headerText}>{t('events.ticketsPage.userItem.checkInTime')}</p>
        </div>
      )}

      {ticketsActivationsList.map(user => (
        <UserItem
          key={user.userId}
          user={user}
        />
      ))}
    </>
  )
}

UsersList.propTypes = {
  ticketsActivationsList: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
}

export default UsersList
