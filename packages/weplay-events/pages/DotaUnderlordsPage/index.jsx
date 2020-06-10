/* eslint-disable max-lines */
// TODO: events team please fix this

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import PageHelmet from 'weplay-components/PageHelmet'
import HrefLangLink from 'weplay-components/HrefLangLink'
import MediaPlayer from 'weplay-components/MediaPlayer'
import SectionBody from 'weplay-components/SectionBody'

import HeroSection from 'weplay-events/components/HeroSection'
import HotMediaWrapper from 'weplay-events/components/HotMediaWrapper'
import TweetsList from 'weplay-events/components/TweetsList'
import VideosList from 'weplay-events/components/VideosList'
import TournamentBottomArticles from 'weplay-events/components/TournamentArticles/TournamentBottomArticles'
import TournamentArticlesList from 'weplay-events/components/TournamentArticles/TournamentArticlesList'
import EventPartners from 'weplay-events/components/EventPartners'
import AdvertisementBanner from 'weplay-events/components/AdvertisementBanner'
import Page from 'weplay-events/components/Page'
import Wrapper from 'weplay-events/components/Wrapper'

import backgroundUrl from './img/underlords-bg.jpg'
import logoUrl from './img/underlords-logo.png'
import SheduleSection from './SheduleSection'
import InvitedPlayers from './InvitedPlayers'
import DotaUnderlordsGroups from './DotaUnderlordsGroups'
import container from './container'
import styles from './styles.scss'

const subscribeFormModifiers = ['promo']
const detailsButtonModifiers = ['alignCenterX', 'textDetails']
const dateFormat = {
  start: 'date',
  end: 'dateMonth',
}

const DotaUnderlordsPage = ({
  // props from container
  ogImage,
  i18nTexts,
  broadcastUrl,
  isTournamentFinished,
  videoPlayerAnchorRef,
  isTournamentScheduled,
  isTournamentInProgress,
  currentStageId,
  winners,
  mainWinner,
  hreflangUrl,
  rulesUrls,
  // analytic
}) => (
  <Page>
    <div data-qa-id={dataQaIds.pages[NAMES.DOTA_UNDERLORDS].container} />

    <PageHelmet
      ogImage={ogImage}
    />

    <HrefLangLink pathname={hreflangUrl} />

    <HeroSection
      TOURNAMENT_ID={currentStageId}
      tournamentTitle="dotaUnderlords"
      logoUrl={logoUrl}
      backgroundUrl={backgroundUrl}
      winners={winners}
      mainWinner={mainWinner}
      dateFormat={dateFormat}
      isTournamentInProgress={isTournamentInProgress}
      hasGroupStagePrizes
      modifiers={detailsButtonModifiers}
    />

    <div
      className={styles.hookForVideoPlayer}
      ref={videoPlayerAnchorRef}
    />

    <Wrapper className={styles.wrapper}>

      {isTournamentInProgress && (
        <SectionBody
          hasPaddingTop={false}
          hasPaddingBottom={false}
          className={classNames(
            styles.videoWrapper,
            'u-order-1',
          )}
        >
          <ContentContainer>
            {broadcastUrl && (
            <MediaPlayer
              withChat={isTournamentInProgress}
              url={broadcastUrl}
            />
            )}
          </ContentContainer>
        </SectionBody>
      )}

      {isTournamentScheduled && (
        <SectionBody
          hasPaddingBottom={false}
          className="u-order-1"
        >
          <ContentContainer>
            <AdvertisementBanner
              url="https://discordapp.com/invite/rAhq4jc"
              isDotaUnderlordsPage
            />
          </ContentContainer>
        </SectionBody>
      )}

      {!isTournamentScheduled && (
        <SectionBody
          hasPaddingBottom={false}
          className={classNames(
            { 'u-order-1': isTournamentInProgress },
            { 'u-order-2': isTournamentFinished },
          )}
        >
          <ContentContainer>
            <DotaUnderlordsGroups
              tournamentTitle="dotaUnderlords"
              rulesUrls={rulesUrls}
              i18nTexts={i18nTexts}
              addTableFooter
            />
          </ContentContainer>
        </SectionBody>
      )}

      {isTournamentInProgress && (
        <SectionBody
          className="u-order-2"
          hasPaddingBottom={!isTournamentInProgress}
        >
          <ContentContainer>
            <SheduleSection />
          </ContentContainer>
        </SectionBody>
      )}

      {isTournamentFinished && (
        <SectionBody
          hasPaddingBottom={!isTournamentFinished}
          className={classNames(
            'u-order-1',
          )}
        >
          <ContentContainer>
            <HotMediaWrapper>
              <TournamentArticlesList
                tournamentTitle="dotaUnderlords"
                isEventsPage
              />
              <TweetsList
                title={i18nTexts.dotaUnderlords.mediaHeaders.tweets.title}
                linkText={i18nTexts.dotaUnderlords.mediaHeaders.tweets.link}
              />
              <VideosList
                title={i18nTexts.dotaUnderlords.mediaHeaders.videos.title}
                linkText={i18nTexts.dotaUnderlords.mediaHeaders.videos.link}
              />
            </HotMediaWrapper>
          </ContentContainer>
        </SectionBody>
      )}

      <SectionBody
        hasPaddingTop={isTournamentFinished}
        hasPaddingBottom={!isTournamentScheduled}
        className={classNames(
          { 'u-order-4': isTournamentScheduled },
          { 'u-order-5': isTournamentInProgress },
          { 'u-order-3': isTournamentFinished },
        )}
      >
        <ContentContainer>
          <InvitedPlayers
            tournamentTitle="dotaUnderlords"
          />
        </ContentContainer>
      </SectionBody>

      <SectionBody
        hasPaddingTop={isTournamentScheduled}
        hasPaddingBottom={isTournamentFinished}
        className={classNames(
          isTournamentFinished ? 'u-order-4' : 'u-order-5',
        )}
      >
        <ContentContainer>
          <SubscriptionBlock modifiers={subscribeFormModifiers} />
        </ContentContainer>
      </SectionBody>

      <div className={classNames(
        {
          'u-order-2': isTournamentScheduled,
          'u-order-4': isTournamentInProgress,
          'u-order-8': isTournamentFinished,
        },
      )}
      >
        <TournamentBottomArticles isTournamentFinished={isTournamentFinished} />
      </div>

      <SectionBody
        hasPaddingTop={!isTournamentFinished}
        hasPaddingBottom={!isTournamentFinished}
        className={classNames(
          'u-order-7',
          { 'u-order-6': isTournamentInProgress || isTournamentFinished },
        )}
      >
        <EventPartners />
      </SectionBody>
    </Wrapper>
  </Page>
)

DotaUnderlordsPage.propTypes = {
  // required props
  // container props
  rulesUrls: PropTypes.string.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  broadcastUrl: PropTypes.string.isRequired,
  isTournamentInProgress: PropTypes.bool.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  isTournamentScheduled: PropTypes.bool.isRequired,
  videoPlayerAnchorRef: PropTypes.func.isRequired,
  ogImage: imgPropType.isRequired,
  winners: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mainWinner: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]).isRequired,
  currentStageId: PropTypes.number.isRequired,
  hreflangUrl: PropTypes.string.isRequired,
}

export default container(DotaUnderlordsPage)
