import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Label from 'weplay-components/Label'
import Logo from 'weplay-components/Logo'

import JoinButtons from 'weplay-competitive/components/JoinButtons'
import withFeatureSupport from 'weplay-competitive/HOCs/withFeatureSupport'
import { FEATURES } from 'weplay-competitive/config/features'
import { GA__CREATE_ACCOUNT } from 'weplay-competitive/analytics/landingAnalytics'
import TournamentBetaButton from 'weplay-competitive/pages/TournamentBetaPage/TournamentBetaButton'

import styles from './styles.scss'

const video = 'https://static-prod.weplay.tv/2020-03-27/aa7e8a358697c841990863767eba4878.mp4'

const buttonNames = ['default', 'discord', 'twitch', 'allButton', 'allLink', 'facebook']

const HeroSection = ({
  // required props

  // container props
  // optional props
  // HOC
  isFeatureSupported,
  children,
}) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const isABTestActive = isFeatureSupported(FEATURES.LANDING_AB)
  return (
    <div className={styles.block}>
      {!isMobileWidth && (
      <video
        className={styles.video}
        autoPlay
        muted
        loop
      >
        <source
          src={video}
          type="video/mp4"
        />
      </video>
      )}
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Logo isFluid />
        </div>
        <p className={styles.description}>
          {t('competitive.tournamentLanding.heroSection.description')}
          <Label
            className="u-ml-1"
            color="magenta"
          >
            beta
          </Label>
        </p>
        <h1 className={styles.title}>
          {t('competitive.tournamentLanding.heroSection.title')}
          <br />
          {t('competitive.tournamentLanding.heroSection.subTitle')}
        </h1>
        {
          isABTestActive
            ? <JoinButtons buttonNames={buttonNames} />
            : (
              <TournamentBetaButton
                className={styles.button}
                content={t('competitive.tournamentLanding.heroSection.button')}
                analyticEvent={GA__CREATE_ACCOUNT}
              />
            )
        }
      </div>
      {children}
    </div>
  )
}

HeroSection.propTypes = {
  // required props
  // container props
  // optional props
  // HOC
  isFeatureSupported: PropTypes.func.isRequired,
  children: PropTypes.node,
}

HeroSection.defaultProps = {
  // optional props
  children: null,
}

export default withFeatureSupport(HeroSection)
