import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { NavHashLink } from 'react-router-hash-link'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { usePageViewAnalytics } from 'weplay-core/hooks/usePageViewAnalytics'

import PageHelmet from 'weplay-components/PageHelmet'
import EventCard from 'weplay-components/EventCard'
import Breadcrumbs from 'weplay-components/Breadcrumbs'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Icon from 'weplay-components/Icon'
import Image from 'weplay-components/Image'
import Link from 'weplay-components/Link'
import Section from 'weplay-components/_wrappers/Section'
import HeadLine from 'weplay-components/HeadLine'
import HashAnchor from 'weplay-components/HashAnchor'

import TournamentsBanner from 'weplay-media/components/TournamentsBanner'
import Similars from 'weplay-media/components/Similars'

import { useGiveawayPage } from './container'
import Rules from './Rules'
import bgImage from './img/tournament.jpg'
import imageUrl from './img/hero-section.png'
import extraImage from './img/loonydragcenter.svg'
import loonyBg from './img/newBannerLoony.png'
import styles from './styles.scss'

const loonyDragonLink = '/mini-games/loony-dragon'
const tournamentsLink = '/tournaments'

const GiveawayPage = ({ history }) => {
  const {
    first3news,
    promoEvent,
  } = useGiveawayPage()
  const t = useTranslation()

  const isMobileWidth = useSelector(isMobileWidthSelector)
  const [isRulesOpened, setRulesIsOpened] = useState(false)

  const scrollHandler = (el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setRulesIsOpened(true)
  }

  usePageViewAnalytics(history)

  return (
    <>
      <PageHelmet lokaliseProject="mediaCore" />
      <Section
        className={styles.heroSection}
        data-qa-id={dataQaIds.pages[NAMES.GIVEAWAY].container}
      >
        <div className={styles.heroWrap}>
          {!isMobileWidth && (
          <div className={styles.imgWrap}>
            <Image
              className={classNames(
                'o-img-responsive',
                styles.image,
              )}
              src={imageUrl}
              alt=""
            />
          </div>
          )}
          <div className={styles.textWrap}>
            <HeadLine
              title={t('mediaCore.giveawayPage.heroSection.title')}
            />
            <NavHashLink
              to="#grid"
              scroll={scrollHandler}
              className={styles.button}
            >
              <span className={styles.text}>
                {t('mediaCore.giveawayPage.heroSection.button')}
              </span>
              <Icon
                iconName="arrow-link"
                className={styles.icon}
                size="small"
              />
            </NavHashLink>
          </div>
        </div>
      </Section>
      <ContentContainer>
        <Breadcrumbs entityName="Giveaway" />
        <div
          className={styles.grid}
        >
          <div className={styles.centralBlock}>
            <div className={styles.giveaway}>
              <iframe
                src={t('mediaCore.giveawayPage.campaignLink')}
                frameBorder="0"
                title="giveaway"
                allowFullScreen
              />
              <HashAnchor anchorId="grid" />
            </div>
            <Rules
              buttonText={isRulesOpened
                ? t('mediaCore.seoBlock.btnClose')
                : t('mediaCore.giveawayPage.seeDetails.button')}
              setIsOpened={setRulesIsOpened}
              isOpened={isRulesOpened}
            />
            <Link
              to="/legal/giveaway-rules"
              className={styles.link}
              target="_blank"
            >
              {t('mediaCore.giveawayPage.seeRules.button')}
            </Link>
          </div>
          <div className={styles.tournamentBlock}>
            <TournamentsBanner
              isWide
              title={t('mediaCore.banner.tournamentBanner.title')}
              buttonUrl={tournamentsLink}
              background={bgImage}
              btnText={t('mediaCore.giveawayPage.tournamentBanner.button')}
            />
          </div>
          <div className={styles.loonyBlock}>
            <TournamentsBanner
              buttonUrl={loonyDragonLink}
              background={loonyBg}
              isLogo={false}
              extraImage={extraImage}
              btnText={t('mediaCore.giveawayPage.loonyDragon.button')}
            />
          </div>
          <div className={styles.towBlock}>
            <EventCard
              key={promoEvent.id}
              promoEvent={promoEvent}
            />
          </div>
          <div className={styles.newsBlock}>
            <Similars
              similarNews={first3news}
              isFullCard
              title={t('mediaCore.mediaPage.latestTitle')}
            />
          </div>
        </div>
      </ContentContainer>
    </>
  )
}

GiveawayPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
}

GiveawayPage.defaultProps = {
  // optional props
}

export default React.memo(GiveawayPage)
