import React from 'react'
import PropTypes from 'prop-types'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ModalBase from 'weplay-components/ModalBase'
import Checkbox from 'weplay-components/Checkbox'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import container from './container'
import styles from './styles.scss'

const TournamentNotificationModal = ({
  // required props
  toggleSetTournamentNotificationModal,
  toggleCheckBox,
  isChecked,
  modalTitle,

  // container props
  saveChanges,

  // optional props
  isShown,
}) => {
  const { tournamentSlug = 'defaultTournamentSlug' } = useParams()
  const t = useTranslation()

  return (
    <ModalBase
      handleClose={toggleSetTournamentNotificationModal}
      isShown={isShown}
    >
      <div className={styles.block}>
        <p className={styles.title}>
          {modalTitle}
        </p>

        <div className={styles.section}>
          <Checkbox
            className={styles.checkbox}
            onChange={toggleCheckBox}
            value={isChecked}
          >
            <span className={styles.text}>
              {t(`events.eventsRootPage.modals.TournamentNotificationModal.${tournamentSlug}.emailLabel`)}
            </span>
          </Checkbox>
          {/* TODO: replace this with correct button */}
          {false && (
            <span className={styles.text}>
              {t('events.eventsRootPage.modals.TournamentNotificationModal.text')}
            </span>
          )}
        </div>

        {false && (
          <Button
            color={BUTTON_COLOR.TELEGRAM}
            href="https://t.me/weplay_esportsbot?start=notify"
            className={styles.buttonTelegram}
          >
            {t('events.ReminderButton.TournamentNotificationModal.telegramBot.button')}
          </Button>
        )}

        <div className={styles.footer}>
          <Button
            color={BUTTON_COLOR.BASIC}
            type="button"
            className={styles.button}
            onClick={saveChanges}
          >
            {t(`events.eventsRootPage.modals.TournamentNotificationModal.${tournamentSlug}.saveChangesButton`)}
          </Button>
          {/* TODO: enable when changeSettings will be available */}
          {false && (
            <Button
              type="button"
              className={styles.buttonSettings}
            >
              {t('.events.eventsRootPage.modals.TournamentNotificationModal.changeSettingsButton')}
            </Button>
          )}
        </div>
      </div>
    </ModalBase>
  )
}

TournamentNotificationModal.propTypes = {
  // required props
  toggleSetTournamentNotificationModal: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  modalTitle: PropTypes.string.isRequired,

  // container props
  saveChanges: PropTypes.func.isRequired,
  toggleCheckBox: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,

  // optional props
}

TournamentNotificationModal.defaultProps = {
  // optional props
}

export default container(TournamentNotificationModal)
