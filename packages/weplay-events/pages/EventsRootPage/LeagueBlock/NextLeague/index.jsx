import React from 'react'
import PropTypes from 'prop-types'
import SubscribeBlock from 'weplay-events/components/SubscribeBlock'
import GradientLink from 'weplay-components/GradientLink'
import Icon from 'weplay-components/Icon'
import Image from 'weplay-components/Image'
import i18nTextsPropType from 'weplay-core/customPropTypes/i18nTextsPropType'
import { CS_GO_SUBSCRIPTION_ID } from 'weplay-events/pages/EventsRootPage/constants'

import prevLeagueLogo from '../img/FoM3.jpg'
import { HEADER_LINK } from '../constants'

import container from './container'
import styles from './styles.scss'

const NextLeague = ({
  // required props
  // container props
  i18nTexts,
  showSeason2TeaserModal,
  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.subWrap}>
      <SubscribeBlock
        league="next"
        title={i18nTexts.events.eventsRootPage.leagueBlock.subscribeTop.title}
        text={i18nTexts.events.eventsRootPage.leagueBlock.subscribeTop.text}
        subscriptionScopeId={CS_GO_SUBSCRIPTION_ID}
      />
    </div>
    <div className={styles.teaserWrap}>
      <GradientLink
        to={HEADER_LINK}
        text={i18nTexts.events.eventsRootPage.leagueBlock.subscribeTop.teaserText}
      />
      <button
        type="button"
        className={styles.buttonTeaser}
        onClick={showSeason2TeaserModal}
      >
        <Image
          className={styles.prevLeagueLogo}
          src={prevLeagueLogo}
          alt="nextLeagueTeaser"
        />

        <span className={styles.buttonIconBlock}>
          <Icon
            className={styles.buttonIcon}
            iconName="play-sm"
          />
        </span>
      </button>
    </div>
  </div>

)

NextLeague.propTypes = {
  // required props

  // container props
  showSeason2TeaserModal: PropTypes.func.isRequired,
  i18nTexts: i18nTextsPropType.isRequired,
  // optional props
}

NextLeague.defaultProps = {
  // optional propsSliderMarkup
}

export default container(NextLeague)
