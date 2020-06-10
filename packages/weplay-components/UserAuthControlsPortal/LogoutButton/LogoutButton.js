import React, { useCallback } from 'react'
import * as PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getUserNotifications } from 'weplay-core/reduxs/notifications/actions'
import useAction from 'weplay-core/helpers/useAction'
import { signOut } from 'weplay-core/reduxs/_legacy/auth/actions'
import { getUserWallet } from 'weplay-core/reduxs/wallets/actions'

import Icon from 'weplay-components/Icon'

import styles from './LogoutButton.scss'

const LogoutButton = ({
  // required props
  onClick,
  // container props
  // optional props
}) => {
  const {
    triggerSignOut,
    clearUserWallet,
    clearUserNotifications,
  } = useAction({
    triggerSignOut: signOut,
    clearUserWallet: getUserWallet.clear,
    clearUserNotifications: getUserNotifications.clear,
  })

  const t = useTranslation()
  const handleLogOut = useCallback(
    () => {
      onClick()
      // TODO: @Andrew, think about of combine all methods call on Logout
      triggerSignOut()
        .then(() => {
          clearUserWallet()
          clearUserNotifications()
        })
    },
    [],
  )

  return (
    <div className={styles.block}>
      <button
        type="button"
        className={styles.button}
        onClick={handleLogOut}
      >
        <Icon
          iconName="SignOut"
          className={styles.icon}
        />
        {t('cabinet.logOut')}
      </button>
    </div>
  )
}

LogoutButton.propTypes = {
  // required props
  onClick: PropTypes.func,
  // container props
  // optional props
}

LogoutButton.defaultProps = {
  // optional props
  onClick: () => {},
}

export default React.memo(LogoutButton)
