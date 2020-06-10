import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { $propEq } from 'weplay-core/$utils/$propEq'
import withSocialLoginHandlers from 'weplay-core/HOCs/withSocialLoginHandlers'

import ModalBase from 'weplay-components/ModalBase'
import { getSocialConfigs } from 'weplay-components/SocialNetworksLogin/consts'

import ConnectTwitchAccountButton from '../../components/ConnectTwitchAccountButton/ConnectTwitchAccountButton'

import { useTwitchOAuth2Listener } from './helpers'
import styles from './ConnectTwitchModal.scss'

const ConnectTwitchModal = ({
  isShown,
  handleClose,
  getSocialLoginSuccessHandler,
  getSocialErrorHandler,
}) => {
  const t = useTranslation()
  const globalScope = useSelector(globalScopeSelector)
  const twitchSocialAuthSettings = useMemo(() => getSocialConfigs(globalScope.location.origin)
    .find($propEq('source', 'twitch')),
  [globalScope])

  const twitchOAuth2Listener = useTwitchOAuth2Listener(getSocialLoginSuccessHandler, getSocialErrorHandler)

  useEffect(() => {
    if (isShown) {
      globalScope.addEventListener('message', twitchOAuth2Listener)
    }

    return () => globalScope.removeEventListener('message', twitchOAuth2Listener)
  }, [isShown, twitchOAuth2Listener, globalScope])

  return (
    <ModalBase
      isShown={isShown}
      handleClose={handleClose}
    >
      <div className={styles.block}>
        <p className={styles.title}>
          {t('events.connectTwitchModal.title')}
        </p>

        <p className={styles.description}>
          {t('events.connectTwitchModal.description')}
        </p>

        <ConnectTwitchAccountButton
          config={twitchSocialAuthSettings}
          text={t('events.connectTwitchModal.buttonText')}
        />
      </div>
    </ModalBase>
  )
}

ConnectTwitchModal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  getSocialLoginSuccessHandler: PropTypes.func.isRequired,
  getSocialErrorHandler: PropTypes.func.isRequired,
}

export default React.memo(withSocialLoginHandlers({
  socialErrorKey: 'socialNetworkUsedButNotLinked',
})(ConnectTwitchModal))
