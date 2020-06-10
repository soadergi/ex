import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import TournamentNotificationModal from './TournamentNotificationModal'
import container from './container'
import styles from './styles.scss'

export const ReminderButton = ({
  // required props
  toggleSetTournamentNotificationModal,
  subscriptionScopeId,
  modalTitle,

  // container props
  handleClick,
  isUserSubscribed,
  buttonText,
  isTournamentNotificationModalOpened,

  // optional props
  className,
}) => (
  <>
    <div
      {...getAnalyticsAttributes({
        category: 'Reminder',
        action: 'keep me updated',
        label: modalTitle,
        position: LOOKUP,
      })}
    >
      <button
        type="button"
        className={classNames(
          className,
          styles.button,
          { [styles.successButton]: isUserSubscribed },
        )}
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>

    <TournamentNotificationModal
      isSubscribed={isUserSubscribed}
      toggleSetTournamentNotificationModal={toggleSetTournamentNotificationModal}
      isShown={isTournamentNotificationModalOpened}
      subscriptionScopeId={subscriptionScopeId}
      modalTitle={modalTitle}
    />
  </>
)

ReminderButton.propTypes = {
  // required props
  toggleSetTournamentNotificationModal: PropTypes.func.isRequired,
  subscriptionScopeId: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,

  // container props
  handleClick: PropTypes.func.isRequired,
  isUserSubscribed: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  isTournamentNotificationModalOpened: PropTypes.bool.isRequired,

  // optional props
  className: PropTypes.string,
}

ReminderButton.defaultProps = {
  // optional props
  className: '',
}

export default container(ReminderButton)
