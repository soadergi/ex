/* eslint-disable max-lines */
// TODO: events team please fix this
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import SectionBody from 'weplay-components/SectionBody'
import MediaPlayer from 'weplay-components/MediaPlayer'
import SectionHeader from 'weplay-components/SectionHeader'
import HrefLangLink from 'weplay-components/HrefLangLink'
import PageHelmet from 'weplay-components/PageHelmet'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import SocialLinks from 'weplay-components/SocialLinks'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import HeroSection from 'weplay-events/components/HeroSection'
import HotMediaWrapper from 'weplay-events/components/HotMediaWrapper'
import TweetsList from 'weplay-events/components/TweetsList'
import VideosList from 'weplay-events/components/VideosList'
import TournamentBottomArticles from 'weplay-events/components/TournamentArticles/TournamentBottomArticles'
import TournamentArticlesList from 'weplay-events/components/TournamentArticles/TournamentArticlesList'
import InvitedTeamsList from 'weplay-events/components/InvitedTeamsList'
import EventPartners from 'weplay-events/components/EventPartners'
import SocialLinksBlock from 'weplay-events/components/SocialLinksBlock'
import { playoffRoundPropType } from 'weplay-events/customPropTypes'
import BetProviderLogo from 'weplay-events/components/BetProviderLogo'
import Page from 'weplay-events/components/Page'
import Wrapper from 'weplay-events/components/Wrapper'

import DireParallax from './DireParallax'
import TugOfWarFirstPlacePrize from './TugOfWarFirstPlacePrize'
import Brackets from './Brackets'
import container from './container'
import styles from './styles.scss'

const subscribeFormModifiers = ['promo']
const socialLinksModifications = ['promo']
const detailsButtonModifiers = ['alignCenterX', 'textDetails']

const dateFormat = {
  start: 'month',
  end: 'month',
}

const TugOfWarPage = ({
  // props from container
  ogImage,
  playoffRounds,
  playoff2Rounds,
  playoff3Rounds,
  playoff4Rounds,
  grandFinal,
  grandFinal2,
  i18nTexts,
  rulesUrlsRadiant,
  rulesUrlsDire,
  broadcastUrl,
  allTweetsUrl,
  allVideosUrl,
  isTournamentFinished,
  videoPlayerAnchorRef,
  isTournamentScheduled,
  isTournamentInProgress,
  modifications,
  stageTitle,
  hrefLangLinkPathname,
  // analytic
  contentType,
  contentAction,
  currentStageId,
  winners,
  mainWinnerComplemented,
  tournamentStagesDates,
  prizeListRules,
  isDirePage,
  logoUrls,
  backgroundUrls,
  backgroundDireSecUrls,
}) => (
  <Page>

    <PageHelmet
      ogImage={ogImage}
      subPageName={stageTitle}
    />

    <HrefLangLink pathname={hrefLangLinkPathname} />

    <HeroSection
      TOURNAMENT_ID={currentStageId}
      modification={stageTitle}
      // TODO: rename tournamentTitle to stageTitle all over the project
      tournamentTitle={stageTitle}
      logoUrl={logoUrls}
      backgroundUrl={backgroundUrls}
      backgroundDireSecUrl={backgroundDireSecUrls}
      withTournamentTabs
      winners={winners}
      mainWinner={mainWinnerComplemented}
      FirstPlacePrizeComponent={TugOfWarFirstPlacePrize}
      labelIconName="invite"
      dateFormat={dateFormat}
      tournamentStagesDates={tournamentStagesDates}
      stageTitle={stageTitle}
      modifiers={detailsButtonModifiers}
      prizeListRules={prizeListRules}
      renderCustomBackground={isDirePage ? () => (
        <DireParallax
          backgroundUrl={backgroundUrls}
          backgroundDireSecUrl={backgroundDireSecUrls}
        />
      ) : (
        null
      )}
    />

    <div
      data-qa-id={dataQaIds.pages[NAMES.TUG_OF_WAR].container}
      className={styles.hookForVideoPlayer}
      ref={videoPlayerAnchorRef}
    />

    <Wrapper className="u-py-2 u-py-md-4">
      {(!isDirePage || !isTournamentFinished) && (
        <SectionBody
          hasPaddingTop={false}
          hasPaddingBottom={isTournamentInProgress}
          className={classNames(
            styles.videowrapper,
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

      {isTournamentFinished && (
        <SectionBody
          className="u-order-2"
        >
          <ContentContainer>
            <HotMediaWrapper
              className={classNames(
                { [styles.dire]: isDirePage },
              )}
            >
              <TournamentArticlesList
                tournamentTitle={stageTitle}
                isEventsPage
              />
              <TweetsList
                linkUrl={allTweetsUrl}
              />
              <VideosList
                linkUrl={allVideosUrl}
              />
            </HotMediaWrapper>
          </ContentContainer>
        </SectionBody>
      )}

      {!isTournamentScheduled && (
        <SectionBody
          modifiers={modifications}
          linkUrl={isDirePage ? rulesUrlsDire : rulesUrlsRadiant}
          linkText={i18nTexts.tournamentStages[stageTitle].tournamentBracket.link}
          className={classNames(
            isTournamentFinished ? 'u-order-4' : 'u-order-3',
          )}
        >
          <ContentContainer>
            <SectionHeader
              title={i18nTexts.tournamentStages[stageTitle].tournamentBracket.title}
              linkUrl={isDirePage ? rulesUrlsDire : rulesUrlsRadiant}
              linkText={i18nTexts.tournamentStages[stageTitle].tournamentBracket.link}
              contentType={contentType}
              contentAction={contentAction}
            >
              <BetProviderLogo />
            </SectionHeader>

            <Brackets
              stageTitle={stageTitle}
              isTournamentFinished={isTournamentFinished}
              playoffRounds={playoffRounds}
              playoff2Rounds={playoff2Rounds}
              playoff3Rounds={playoff3Rounds}
              playoff4Rounds={playoff4Rounds}
              grandFinal={grandFinal}
              grandFinal2={grandFinal2}
            />
          </ContentContainer>
        </SectionBody>
      )}

      <SectionBody
        hasPaddingTop={(isDirePage && isTournamentFinished) || !isDirePage}
        hasPaddingBottom={false}
        className={classNames(
          'u-order-3',
          { 'u-order-4': !isDirePage && isTournamentInProgress },
          { 'u-order-5': isDirePage && isTournamentInProgress },
          { 'u-order-5': isTournamentFinished },
        )}
      >
        <InvitedTeamsList
          tournamentTitle={stageTitle}
          isCaptainWithRole
        />
      </SectionBody>

      {isDirePage && (
        <SectionBody
          hasPaddingBottom={!isTournamentFinished}
          className={classNames(
            'u-order-7',
            { 'u-order-6': isTournamentFinished },
          )}
        >
          <EventPartners />
        </SectionBody>
      )}
      {(isTournamentScheduled || !isDirePage) && (
        <SectionBody
          hasPaddingTop={isTournamentScheduled || isTournamentInProgress}
          hasPaddingBottom={isTournamentFinished}
          className={classNames(
            isTournamentFinished ? 'u-order-3' : 'u-order-5',
            {
              'u-order-6': isDirePage && isTournamentInProgress,
            },
          )}
        >
          <ContentContainer>
            <SubscriptionBlock modifiers={subscribeFormModifiers} />
          </ContentContainer>
        </SectionBody>
      )}

      <div className={classNames(
        {
          'u-order-7': !isDirePage,
          'u-order-2': isDirePage && isTournamentScheduled,
          'u-order-4': isDirePage && isTournamentInProgress,
          'u-order-8': isDirePage && isTournamentFinished,
        },
      )}
      >
        <TournamentBottomArticles isTournamentFinished={isTournamentFinished} />
      </div>

      <div className="u-order-9">
        <SocialLinksBlock
          title={i18nTexts.EVENTS.socialLinks.title}
        >
          <SocialLinks
            promo
            modifiers={socialLinksModifications}
          />
        </SocialLinksBlock>
      </div>
    </Wrapper>
  </Page>
)

TugOfWarPage.propTypes = {
  // required props
  prizeListRules: PropTypes.arrayOf(PropTypes.string).isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  rulesUrlsRadiant: PropTypes.string.isRequired,
  rulesUrlsDire: PropTypes.string.isRequired,
  broadcastUrl: PropTypes.string.isRequired,
  logoUrls: PropTypes.string.isRequired,
  backgroundUrls: PropTypes.string.isRequired,
  backgroundDireSecUrls: PropTypes.string.isRequired,
  isTournamentInProgress: PropTypes.bool.isRequired,
  allTweetsUrl: PropTypes.string.isRequired,
  allVideosUrl: PropTypes.string.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  isTournamentScheduled: PropTypes.bool.isRequired,
  isDirePage: PropTypes.bool.isRequired,
  videoPlayerAnchorRef: PropTypes.func.isRequired,
  contentType: PropTypes.string.isRequired,
  contentAction: PropTypes.string.isRequired,
  ogImage: PropTypes.shape({}).isRequired,
  stageTitle: PropTypes.string.isRequired,
  playoffRounds: playoffRoundPropType.isRequired,
  playoff2Rounds: playoffRoundPropType.isRequired,
  playoff3Rounds: playoffRoundPropType.isRequired,
  playoff4Rounds: playoffRoundPropType.isRequired,
  grandFinal: playoffRoundPropType.isRequired,
  grandFinal2: playoffRoundPropType.isRequired,
  winners: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mainWinnerComplemented: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
  modifications: PropTypes.arrayOf(PropTypes.string).isRequired,
  votingId: PropTypes.number.isRequired,
  hrefLangLinkPathname: PropTypes.string.isRequired,

  // optional props
  currentStageId: PropTypes.number.isRequired,
  tournamentStagesDates: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  // analytics
}

TugOfWarPage.defaultProps = {
  // optional props
}

export default container(TugOfWarPage)
