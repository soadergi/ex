import React from 'react'
import Icon from 'weplay-components/Icon'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import container from './container'
import styles from './styles.scss'


const LogOut = ({
  // required props
  onClick,
  deleteAccountHandler,
  // container props

  // optional props
}) => {
  const t = useTranslation()
  return (
    <>
      <div className={styles.block}>
        <div className={styles.wrapper}>
          <Icon
            iconName="leave"
            className={styles.icon}
          />
          <button
            onClick={onClick}
            className={styles.logOut}
            type="button"
          >
            {t('mediaCore.profile.accountSettings.logOut')}
          </button>
        </div>
        <button
          className={styles.delete}
          type="button"
          onClick={deleteAccountHandler}
        >
          {t('mediaCore.profile.accountSettings.deleteAccount')}
        </button>
      </div>
    </>
  )
}

LogOut.propTypes = {
  // required props
  onClick: PropTypes.func.isRequired,
  deleteAccountHandler: PropTypes.func.isRequired,
  // container props

  // optional props
}

LogOut.defaultProps = {
  // optional props
}

export default container(LogOut)
