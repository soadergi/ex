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

import { ARTIFACT_INTELLIGENCE } from 'weplay-events/constants/signUpSources'
import PromoCodesBanner from 'weplay-events/components/PromoCodesBanner'
import TournamentBrackets from 'weplay-events/components/TournamentBrackets'
import HotMediaWrapper from 'weplay-events/components/HotMediaWrapper'
import VideosList from 'weplay-events/components/VideosList'
import TweetsList from 'weplay-events/components/TweetsList'
import EventPartners from 'weplay-events/components/EventPartners'
import HeroSection from 'weplay-events/components/HeroSection'
import InvitedTeamsList from 'weplay-events/components/InvitedTeamsList'
import PlayOff from 'weplay-events/components/EventsPlayOff'
import tableTabsPropTypes from 'weplay-events/customPropTypes/tableTabs'
import SocialLinksBlock from 'weplay-events/components/SocialLinksBlock'
import Wrapper from 'weplay-events/components/Wrapper'

import backgroundUrl from './img/main-bg.jpg'
import logoUrl from './img/logo.png'
import container from './container'
import styles from './styles.scss'

const subscribeFormModifiers = ['promo']
const socialLinksModifications = ['promo']

const WinterMadnessPage = ({
  i18nTexts,
  MADNESS_TOURNAMENT_ID,
  ogImage,
  first3Articles,
  first4Articles,
  broadcastUrl,
  isTournamentScheduled,
  isTournamentInProgress,
  isTournamentFinished,
  rulesUrls,
  promocodeAgreementUrls,
  promocodeImagesData,
  tournamentHasSponsors,
  videoPlayerAnchorRef,
  sourceType,
  sourceId,
  tournamentTitle,
  playoffRounds,
  mainWinner,
  winners,
  tableTabs,
}) => (
  <>
    <PageHelmet
      ogImage={ogImage}
    />

    <HrefLangLink pathname="/events/dota-2/winter-madness" />

    <HeroSection
      TOURNAMENT_ID={MADNESS_TOURNAMENT_ID}
      modification={tournamentTitle}
      tournamentTitle={tournamentTitle}
      logoUrl={logoUrl}
      backgroundUrl={backgroundUrl}
      mainWinner={mainWinner}
      winners={winners}
    />

    <div
      ref={videoPlayerAnchorRef}
      data-qa-id={dataQaIds.pages[NAMES.WINTER_MADNESS].container}
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
              activatedDateFrom="2018-12-27 14:00:00"
              activatedDateTo="2019-01-05 23:00:00"
              modifications={['winterMadness']}
              agreementUrls={promocodeAgreementUrls}
              images={promocodeImagesData}
              registrationSource={ARTIFACT_INTELLIGENCE}
              pageName="winterMadness"
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
                title={i18nTexts.winterMadness.mediaHeaders.news.title}
                linkUrl={`/${sourceType}/${sourceId}`}
                linkText={i18nTexts.winterMadness.mediaHeaders.news.link}
                articles={first4Articles}
                modifications={['twoColumnsMedium']}
              />

              <TweetsList />

              <VideosList />
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
        <div className={styles.wide}>
          <InvitedTeamsList
            tournamentTitle={tournamentTitle}
          />
        </div>
      </SectionBody>

      <SectionBody
        hasPaddingTop={isTournamentInProgress}
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
            title={i18nTexts.winterMadness.news.title}
            linkUrl={`/${sourceType}/${sourceId}`}
            linkText={i18nTexts.winterMadness.news.allLink}
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

WinterMadnessPage.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  tableTabs: PropTypes.arrayOf(tableTabsPropTypes.isRequired).isRequired,
  MADNESS_TOURNAMENT_ID: PropTypes.number.isRequired,
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
  tournamentHasSponsors: PropTypes.bool.isRequired,
  videoPlayerAnchorRef: PropTypes.func.isRequired,
  sourceType: PropTypes.string.isRequired,
  sourceId: PropTypes.number.isRequired,
  tournamentTitle: PropTypes.string,
  winners: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mainWinner: PropTypes.shape({}).isRequired,
  playoffRounds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    games: PropTypes.arrayOf(PropTypes.shape({})),
  })).isRequired,

}

WinterMadnessPage.defaultProps = {
  tournamentTitle: '',
}

export default container(WinterMadnessPage)
