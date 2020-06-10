/* eslint-disable max-lines */
// TODO: events team please fix this
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import articlesPropType from 'weplay-core/customPropTypes/articlesPropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import HrefLangLink from 'weplay-components/HrefLangLink'
import PageHelmet from 'weplay-components/PageHelmet'
import SectionBody from 'weplay-components/SectionBody'
import ArticlesList from 'weplay-components/ArticlesList'
import BottomArticles from 'weplay-components/BottomArticles'
import MediaPlayer from 'weplay-components/MediaPlayer'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import SocialLinks from 'weplay-components/SocialLinks'

import PromoCodesBanner from 'weplay-events/components/PromoCodesBanner'
import TournamentBrackets from 'weplay-events/components/TournamentBrackets'
import HotMediaWrapper from 'weplay-events/components/HotMediaWrapper'
import VideosList from 'weplay-events/components/VideosList'
import TweetsList from 'weplay-events/components/TweetsList'
import EventPartners from 'weplay-events/components/EventPartners'
import InvitedTeamsList from 'weplay-events/components/InvitedTeamsList'
import HeroSection from 'weplay-events/components/HeroSection'
import TournamentBanner from 'weplay-events/components/TournamentBanner'
import PlayOff from 'weplay-events/components/EventsPlayOff'
import tableTabsPropTypes from 'weplay-events/customPropTypes/tableTabs'
import SocialLinksBlock from 'weplay-events/components/SocialLinksBlock'
import Wrapper from 'weplay-events/components/Wrapper'

import backgroundUrl from './img/header-bg.jpg'
import logoUrl from './img/logo.png'
import container from './container'
import styles from './styles.scss'

const subscribeFormModifiers = ['promo']
const socialLinksModifications = ['promo']

const LockAndLoadPage = ({
  i18nTexts,
  LOCK_AND_LOAD_TOURNAMENT_ID,
  ogImage,
  first3Articles,
  first4Articles,
  broadcastUrl,
  isTournamentScheduled,
  isTournamentInProgress,
  isTournamentFinished,
  allTweetsUrl,
  allVideosUrl,
  rulesUrls,
  promocodeAgreementUrls,
  promocodeImagesData,
  tournamentHasSponsors,
  videoPlayerAnchorRef,
  tournamentTitle,
  sourceType,
  sourceId,
  activatedDateFrom,
  activatedDateTo,
  currentLanguage,
  winners,
  mainWinner,
  playoffRounds,
  tableTabs,
  bannerEventCategory,
  bannerEventAction,
}) => (
  <>
    <PageHelmet
      ogImage={ogImage}
    />

    <HrefLangLink pathname="/events/cs-go/lock-and-load" />

    <HeroSection
      TOURNAMENT_ID={LOCK_AND_LOAD_TOURNAMENT_ID}
      modification={tournamentTitle}
      tournamentTitle={tournamentTitle}
      logoUrl={logoUrl}
      backgroundUrl={backgroundUrl}
      winners={winners}
      mainWinner={mainWinner}
    />

    <div
      ref={videoPlayerAnchorRef}
      data-qa-id={dataQaIds.pages[NAMES.LOCK_AND_LOAD].container}
    />

    <Wrapper className="u-py-2 u-py-md-4">
      <SectionBody
        hasPaddingTop={false}
        hasPaddingBottom={false}
        className={classNames(
          styles.videowrapper,
          'u-order-1',
        )}
      >
        <div
          className={classNames(
            'u-pb-4',
            {
              [styles.fluid]: isTournamentInProgress,
              [styles.wide]: !isTournamentInProgress,
            },
          )}
        >
          {broadcastUrl && (
            <MediaPlayer
              withChat={isTournamentInProgress}
              url={broadcastUrl}
            />
          )}
        </div>
      </SectionBody>

      {isTournamentInProgress && (
      <SectionBody
        hasPaddingTop={false}
        className="u-order-2"
      >
        <div className={styles.fluid}>
          <PromoCodesBanner
            activatedDateFrom={activatedDateFrom}
            activatedDateTo={activatedDateTo}
            modifications={['lockAndLoad']}
            agreementUrls={promocodeAgreementUrls}
            images={promocodeImagesData}
            pageName="lockAndLoad"
          />
        </div>
      </SectionBody>
      )}

      {isTournamentFinished && (
        <SectionBody
          className="u-order-2"
        >
          <div className={styles.wide}>
            <HotMediaWrapper>
              <ArticlesList
                title={i18nTexts.lockAndLoad.mediaHeaders.news.title}
                linkUrl={`/${sourceType}/${sourceId}`}
                linkText={i18nTexts.lockAndLoad.mediaHeaders.news.link}
                articles={first4Articles}
                modifications={['twoColumnsMedium']}
                isLinkVisible
              />

              <TweetsList
                linkUrl={allTweetsUrl}
              />

              <VideosList
                linkUrl={allVideosUrl}
              />
            </HotMediaWrapper>
          </div>
        </SectionBody>
      )}

      {tournamentHasSponsors && (
        <SectionBody
          hasPaddingTop={!isTournamentInProgress}
          hasPaddingBottom={!isTournamentScheduled}
          className="u-order-6"
        >
          <div className={styles.wide}>
            <EventPartners />
          </div>
        </SectionBody>
      )}

      {!isTournamentScheduled && (
        <div
          className={classNames(
            isTournamentFinished ? 'u-order-4' : 'u-order-3',
          )}
        >
          <TournamentBrackets
            isTournamentFinished={isTournamentFinished}
            rulesUrls={rulesUrls}
            tournamentTitle={tournamentTitle}
            tableTabs={tableTabs}
          >
            <div className={styles.bracketsWrap}>
              <PlayOff
                rounds={playoffRounds}
                isTournamentFinished={isTournamentFinished}
              />
            </div>
          </TournamentBrackets>
        </div>
      )}

      <SectionBody
        className={classNames(
          'u-order-3',
          { 'u-order-4': isTournamentInProgress },
          { 'u-order-5': isTournamentFinished },
        )}
      >
        {currentLanguage === 'ru' && (
          <TournamentBanner
            title={i18nTexts.lockAndLoad.tournamentBanner.title}
            text={i18nTexts.lockAndLoad.tournamentBanner.text}
            linkText={i18nTexts.lockAndLoad.tournamentBanner.linkText}
            linkUrl="/tournaments/join"
            bannerEventCategory={bannerEventCategory}
            bannerEventAction={bannerEventAction}
          />
        )}

        <div className={styles.wide}>
          <InvitedTeamsList
            tournamentTitle={tournamentTitle}
          />
        </div>
      </SectionBody>

      <SectionBody
        hasPaddingTop={false}
        hasPaddingBottom={isTournamentFinished}
        className={classNames(
          isTournamentFinished ? 'u-order-3' : 'u-order-5',
        )}
      >
        <SubscriptionBlock
          wrapperClass={styles.wide}
          modifiers={subscribeFormModifiers}
        />
      </SectionBody>

      <SectionBody
        hasPaddingTop={!isTournamentFinished}
        className="u-order-7"
      >
        <div className={styles.wide}>
          <BottomArticles
            title={i18nTexts.lockAndLoad.news.title}
            linkUrl={`/${sourceType}/${sourceId}`}
            linkText={i18nTexts.lockAndLoad.news.allLink}
            articles={first3Articles}
          />
        </div>
      </SectionBody>

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
  </>
)

LockAndLoadPage.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  tableTabs: PropTypes.arrayOf(tableTabsPropTypes.isRequired).isRequired,
  LOCK_AND_LOAD_TOURNAMENT_ID: PropTypes.number.isRequired,
  ogImage: PropTypes.string.isRequired,
  rulesUrls: PropTypes.string.isRequired,
  promocodeAgreementUrls: PropTypes.string.isRequired,
  promocodeImagesData: PropTypes.shape({}).isRequired,
  first3Articles: articlesPropType.isRequired,
  first4Articles: articlesPropType.isRequired,
  broadcastUrl: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  isTournamentScheduled: PropTypes.bool.isRequired,
  isTournamentInProgress: PropTypes.bool.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  allTweetsUrl: PropTypes.string.isRequired,
  allVideosUrl: PropTypes.string.isRequired,
  tournamentHasSponsors: PropTypes.bool.isRequired,
  videoPlayerAnchorRef: PropTypes.func.isRequired,
  tournamentTitle: PropTypes.string,
  sourceType: PropTypes.string.isRequired,
  sourceId: PropTypes.number,
  activatedDateFrom: PropTypes.string.isRequired,
  activatedDateTo: PropTypes.string.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  playoffRounds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    // games: PropTypes.array,
  })).isRequired,
  mainWinner: PropTypes.shape({}).isRequired,
  winners: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // analytics
  bannerEventCategory: PropTypes.string,
  bannerEventAction: PropTypes.string,
}

LockAndLoadPage.defaultProps = {
  tournamentTitle: '',
  sourceId: null,
  bannerEventCategory: 'Banner',
  bannerEventAction: 'Banner',
}

export default container(LockAndLoadPage)
