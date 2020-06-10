import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import withSocialLoginHandlers from 'weplay-core/HOCs/withSocialLoginHandlers'
import { useOAuth2Listener } from 'weplay-core/hooks/auth/useOAuth2Listener'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { getSocialConfigs } from 'weplay-components/SocialNetworksLogin/consts'
import OAuth2Button from 'weplay-components/auth/OAuth2Button'
import FacebookAuthButton from 'weplay-components/auth/FacebookAuthButton'
import { BUTTON_PRIORITY } from 'weplay-components/Button'

import TournamentBetaButton from 'weplay-competitive/pages/TournamentBetaPage/TournamentBetaButton'
import { GA__CREATE_ACCOUNT } from 'weplay-competitive/analytics/landingAnalytics'

import styles from './styles.scss'

const JoinButtons = ({
  // required props
  buttonNames,
  getSocialLoginSuccessHandler,
  getSocialErrorHandler,
  // optional props
}) => {
  const t = useTranslation()
  const oAuth2Listener = useOAuth2Listener(getSocialLoginSuccessHandler, getSocialErrorHandler)
  const globalScope = useSelector(globalScopeSelector)
  const isLoggedIn = useSelector(isLoggedInSelector)
  const config = getSocialConfigs(globalScope.location.origin)
  const getSocialItem = (name) => {
    const currentItem = config.find(item => item.source === name)
    switch (name) {
      case 'default':
        return (
          <TournamentBetaButton
            key={name}
            className={styles.button}
            content={t('competitive.tournamentLanding.heroSection.button')}
            analyticEvent={GA__CREATE_ACCOUNT}
          />
        )
      case 'allLink':
        return (
          <div
            className={styles.linkWrapper}
            key={name}
          >
            <TournamentBetaButton
              key={name}
              content={t('competitive.tournamentLanding.heroSection.all')}
              className={styles.link}
              priority={BUTTON_PRIORITY.LINK}
              analyticEvent={GA__CREATE_ACCOUNT}
            />
          </div>
        )
      case 'allButton':
        return (
          <TournamentBetaButton
            key={name}
            content={t('competitive.tournamentLanding.heroSection.all')}
            className={styles.button}
            analyticEvent={GA__CREATE_ACCOUNT}
          />
        )
      case 'facebook':
        return (
          <FacebookAuthButton
            key={name}
            config={currentItem}
            text={t('competitive.tournamentLanding.heroSection.facebook')}
            className={styles.button}
            icon="facebook"
          />
        )
      default:
        return (
          <OAuth2Button
            className={styles.button}
            key={name}
            icon={name}
            color={name}
            config={currentItem}
            text={t(`competitive.tournamentLanding.heroSection.${name}`)}
          />
        )
    }
  }

  useEffect(() => {
    globalScope.addEventListener('message', oAuth2Listener)

    return () => {
      globalScope.removeEventListener('message', oAuth2Listener)
    }
  }, [])

  return (!isLoggedIn && (
    <div className={styles.buttonsWrapper}>
      {buttonNames.map(buttonName => getSocialItem(buttonName))}
    </div>
  ))
}

JoinButtons.propTypes = {
  // required props
  buttonNames: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  getSocialLoginSuccessHandler: PropTypes.func.isRequired,
  getSocialErrorHandler: PropTypes.func.isRequired,
  // container props
  // optional props
}

JoinButtons.defaultProps = {
  // optional props
}

export default React.memo(withSocialLoginHandlers({
  socialErrorKey: 'socialNetworkUsedButNotLinked',
})(JoinButtons))
