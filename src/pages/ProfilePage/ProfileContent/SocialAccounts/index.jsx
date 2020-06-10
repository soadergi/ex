import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import LastSocialNotificationModal from '../LastSocialNotificationModal'

import FacebookAccountLink from './FacebookAccountLink'
import GoogleAccountLink from './GoogleAccountLink'
import SocialAccount from './SocialAccount'
import styles from './styles.scss'
import container from './container'

const SocialAccounts = ({
  socialAuthSettings,
  checkIsActive,
  disableUserSocial,
  toggleLastSocialNotificationModal,
  isLastSocialNotificationModalVisible,
}) => {
  const t = useTranslation()
  return (
    <>
      <p className={styles.subtitle}>{t('mediaCore.profile.accountSettings.socialsTitle')}</p>
      <ul className={styles.socialAccounts}>
        {socialAuthSettings.map(socialAuthSetting => (
          <li
            className={styles.item}
            key={socialAuthSetting.icon}
          >
            {socialAuthSetting.socialName !== 'Facebook' && socialAuthSetting.socialName !== 'Google'
                && (
                <SocialAccount
                  config={socialAuthSetting}
                  isActive={checkIsActive(socialAuthSetting)}
                  disableUserSocial={disableUserSocial}
                />
                )}
            {socialAuthSetting.socialName === 'Facebook'
                 && ( // TODO: Andrew, Artem please fix this button
                 <FacebookAccountLink
                   config={socialAuthSetting}
                   isActive={checkIsActive(socialAuthSetting)}
                   disableUserSocial={disableUserSocial}
                 />
                 )}
            {socialAuthSetting.socialName === 'Google'
                  && (
                  <GoogleAccountLink
                    config={socialAuthSetting}
                    isActive={checkIsActive(socialAuthSetting)}
                    disableUserSocial={disableUserSocial}
                  />
                  )}
          </li>
        ))}
      </ul>
      <LastSocialNotificationModal
        toggleLastSocialNotificationModal={toggleLastSocialNotificationModal}
        isShown={isLastSocialNotificationModalVisible}
      />
    </>
  )
}

SocialAccounts.propTypes = {
  disableUserSocial: PropTypes.func.isRequired,
  socialAuthSettings: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    socialName: PropTypes.string.isRequired,
  })).isRequired,
  checkIsActive: PropTypes.func.isRequired,
  toggleLastSocialNotificationModal: PropTypes.func.isRequired,
  isLastSocialNotificationModalVisible: PropTypes.bool.isRequired,
}

export default container(SocialAccounts)
