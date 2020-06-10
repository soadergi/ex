import React, {
  useState,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { getUserByIdRequest } from 'weplay-events/services/e-ticket-service'

import CheckInTime from '../CheckInTime'

import styles from './styles.scss'

function UsersItem({ user }) {
  const t = useTranslation()
  const [currentUser, setCurrentUser] = useState({})

  useEffect(
    () => {
      getUserByIdRequest(user.userId)
        .then((userDataResponse) => {
          const currentUserData = userDataResponse?.data?.data?.[0] ?? {}
          setCurrentUser(currentUserData)
        })
    },
    [user.userId],
  )

  return (
    <div
      className={styles.row}
      id="currentUserTicketRow"
    >
      <p className={styles.headerTextMobile}>{t('events.ticketsPage.userItem.nickname')}</p>
      <p
        id="currentUserNickname"
        className={styles.text}
      >
        {currentUser.nickname}
      </p>
      <p className={styles.headerTextMobile}>{t('events.ticketsPage.userItem.firstName')}</p>
      <p
        className={styles.text}
        id="currentUserFirstName"
      >
        {currentUser.firstName}
      </p>
      <p className={styles.headerTextMobile}>{t('events.ticketsPage.userItem.lastName')}</p>
      <p
        className={styles.text}
        id="currentUserLastName"
      >
        {currentUser.lastName}
      </p>
      <p className={styles.headerTextMobile}>{t('events.ticketsPage.userItem.email')}</p>
      <p
        className={styles.text}
        id="currentUserEmail"
      >
        {currentUser.email}
      </p>
      <p className={styles.headerTextMobile}>{t('events.ticketsPage.userItem.checkInTime')}</p>
      <div className={styles.wrap}>
        <CheckInTime tournamentDates={Object.keys(user.activations)} />
      </div>
    </div>
  )
}

UsersItem.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    activations: PropTypes.shape({}).isRequired,
  }).isRequired,
}

export default UsersItem
