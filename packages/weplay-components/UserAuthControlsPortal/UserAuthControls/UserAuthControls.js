import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import UserAvatar from 'weplay-components/UserAvatar'
import ProfileNavigationPopupMenu from 'weplay-components/ProfileNavigationPopupMenu/ProfileNavigationPopupMenu'

import NotificationsBell from '../NotificationsBell/NotificationsBell'

import container from './container'
import styles from './styles.scss'

const BELL_WRAPPER_ID = 'AB-test-notification-bell'
const bellWrapperStyle = { display: 'none' }

const UserAuthControls = ({
  // required props
  // container props
  isControlsPopupOpen,
  triggerControlsPopup,
  handleSignUpButtonClick,
  isUserHasNotifications,
  isPremiumAccount,
  // optional props
  isLoggedIn,
  avatarPath,
  closeControlsPopup,
}) => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      {isLoggedIn ? (
        <>
          {isUserHasNotifications && <NotificationsBell />}

          <div className={styles.controlsBlock}>
            <button
              type="button"
              className={styles.user}
              onClick={triggerControlsPopup}
            >
              <UserAvatar
                avatar={avatarPath}
                isPremiumAccount={isPremiumAccount}
                size="40"
              />
            </button>
          </div>

          <ProfileNavigationPopupMenu
            isOpen={isControlsPopupOpen}
            handleClick={closeControlsPopup}
            outsideClickIgnoreClass={styles.user}
          />
        </>
      ) : (
        <>
          <div
            id={BELL_WRAPPER_ID}
            style={bellWrapperStyle}
          >
            <NotificationsBell />
          </div>

          <Button
            color={BUTTON_COLOR.CTA}
            onClick={handleSignUpButtonClick}
            size="sm"
          >
            {t('mediaCore.header.signUp')}
          </Button>
        </>
      )}
    </div>
  )
}

UserAuthControls.propTypes = {
  // required props
  // container props
  isControlsPopupOpen: PropTypes.bool.isRequired,
  triggerControlsPopup: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  handleSignUpButtonClick: PropTypes.func.isRequired,
  isUserHasNotifications: PropTypes.bool.isRequired,
  // container props
  // optional props
  isPremiumAccount: PropTypes.bool,
  avatarPath: imgPropType,
  closeControlsPopup: PropTypes.func.isRequired,
}

UserAuthControls.defaultProps = {
  // optional props
  avatarPath: '',
  isPremiumAccount: false,
}

export default container(UserAuthControls)
