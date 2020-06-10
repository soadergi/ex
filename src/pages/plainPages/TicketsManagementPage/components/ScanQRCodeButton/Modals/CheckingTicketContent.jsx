import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import styles from './styles.scss'

function CheckingTicketContent({ isSuccess, isFailure, scanAnotherTicket }) {
  const t = useTranslation()

  return (
    <div className={classNames(
      styles.block,
      {
        [styles.isSuccess]: isSuccess,
        [styles.isFailure]: isFailure,
      },
    )}
    >
      {(!isSuccess && !isFailure) && (
        <>
          <p className={styles.title}>{t('events.ticketPage.modals.checkingTicketContent.title')}</p>
          <p className={styles.text}>{t('events.ticketPage.modals.checkingTicketContent.text')}</p>
        </>
      )}

      {isSuccess && (
        <>
          <p className={styles.title}>{t('events.ticketPage.modals.checkingTicketContent.success.title')}</p>
          <p className={styles.text}>
            {t('events.ticketPage.modals.checkingTicketContent.success.text')}
            {/* TODO: @Anatoliy need to add nickname user after notification text */}
            <span className={styles.nickname}> nickname!</span>
          </p>

          <Button
            onClick={scanAnotherTicket}
            color={BUTTON_COLOR.CTA}
          >
            {t('events.ticketPage.modals.checkingTicketContent.success.button')}
          </Button>
        </>
      )}

      {isFailure && (
        <>
          <p className={styles.title}>{t('events.ticketPage.modals.checkingTicketContent.failure.title')}</p>
          <p className={styles.text}>{t('events.ticketPage.modals.checkingTicketContent.failure.text')}</p>

          <Button
            className={styles.button}
            onClick={scanAnotherTicket}
          >
            {t('events.ticketPage.modals.checkingTicketContent.failure.button')}
          </Button>
        </>
      )}
    </div>
  )
}

CheckingTicketContent.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  isFailure: PropTypes.bool.isRequired,
  scanAnotherTicket: PropTypes.func.isRequired,
}

export default CheckingTicketContent
