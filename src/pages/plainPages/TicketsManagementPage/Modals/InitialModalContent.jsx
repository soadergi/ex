import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import styles from './styles.scss'

function InitialModalContent({ handleClose }) {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <p className={styles.title}>{t('events.ticketPage.modals.initialModalContent.title')}</p>
      <p className={styles.text}>{t('events.ticketPage.modals.initialModalContent.text')}</p>

      <Button
        color={BUTTON_COLOR.CTA}
        onClick={handleClose}
      >
        {t('events.ticketPage.modals.initialModalContent.button')}
      </Button>
    </div>
  )
}

InitialModalContent.propTypes = {
  handleClose: PropTypes.func.isRequired,
}

export default InitialModalContent
