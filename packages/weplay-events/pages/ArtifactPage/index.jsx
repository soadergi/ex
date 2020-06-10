/* eslint-disable max-lines */
// TODO: events team please fix this

import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import articlesPropType from 'weplay-core/customPropTypes/articlesPropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import HrefLangLink from 'weplay-components/HrefLangLink'
import PageHelmet from 'weplay-components/PageHelmet'
import MediaPlayer from 'weplay-components/MediaPlayer'
import ArticlesList from 'weplay-components/ArticlesList'
import BottomArticles from 'weplay-components/BottomArticles'
import SectionBody from 'weplay-components/SectionBody'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'

import PlayOff from 'weplay-events/components/EventsPlayOff'
import PromoCodesBanner from 'weplay-events/components/PromoCodesBanner'
import tableTabsPropTypes from 'weplay-events/customPropTypes/tableTabs'
import EventPartners from 'weplay-events/components/EventPartners'
import TournamentBrackets from 'weplay-events/components/TournamentBrackets'
import HotMediaWrapper from 'weplay-events/components/HotMediaWrapper'
import VideosList from 'weplay-events/components/VideosList'
import TweetsList from 'weplay-events/components/TweetsList'
import Page from 'weplay-events/components/Page'
import Wrapper from 'weplay-events/components/Wrapper'

import container from './container'
import styles from './styles.scss'
import Players from './Players'
import MainBanner from './MainBanner'

const mockBackground = 'https://static-cdn.jtvnw.net/jtv_user_pictures/66994279-3d09-49fa-a564-ca55fd6caa6c-'
    + 'channel_offline_image-1920x1080.jpeg'

const subscribeFormModifiers = ['promo']

const ArtifactPage = ({
  i18nTexts,
  ogImage,
  first3Articles,
  first4Articles,
  first6Articles,
  isTournamentInProgress,
  isTournamentFinished,
  isTournamentScheduled,
  stageTitle,
  broadcastUrl,
  videoPlayerAnchorRef,
  registrationPromoSource,
  rulesUrls,
  promocodeAgreementUrls,
  promocodeImagesData,
  sourceType,
  sourceId,
  activatedDateFrom,
  activatedDateTo,
  players,
  playoffRounds,
  tableTabs,
}) => (
  <Page>
    <PageHelmet
      ogImage={ogImage}
      subPageName={stageTitle}
    />
    <HrefLangLink pathname="/artifact" />

    <MainBanner
      isTournamentInProgress={isTournamentInProgress}
      stageTitle={stageTitle}
    />

    {/* TODO: fix after artifact release */}
    <div
      ref={videoPlayerAnchorRef}
      data-qa-id={dataQaIds.pages[NAMES.ARTIFACT].container}
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
              overlayCoverUrl={mockBackground}
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
              registrationSource={registrationPromoSource}
              agreementUrls={promocodeAgreementUrls}
              images={promocodeImagesData}
              pageName="artifact"
              modifications={[stageTitle]}
            />
          </div>
        </SectionBody>
      )}

      {isTournamentScheduled && (
        <SectionBody
          className="u-order-2"
          hasPaddingBottom={false}
        >
          <div className={styles.wide}>
            <ArticlesList
              title={i18nTexts.artifact.mediaHeaders.news.title}
              linkUrl={`/${sourceType}/${sourceId}`}
              linkText={i18nTexts.artifact.mediaHeaders.news.link}
              articles={first6Articles}
              modifications={['threeColumns']}
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
                title={i18nTexts.artifact.mediaHeaders.news.title}
                linkUrl={`/${sourceType}/${sourceId}`}
                linkText={i18nTexts.artifact.mediaHeaders.news.link}
                articles={first4Articles}
                modifications={['twoColumnsMedium']}
                isLinkVisible
              />

              <TweetsList />

              <VideosList />
            </HotMediaWrapper>
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
            tournamentTitle={stageTitle}
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
      {!R.isEmpty(players) && (
        <SectionBody
          className="u-order-2"
        >

          <div className={styles.wide}>
            <Players
              i18nTexts={i18nTexts}
              stageTitle={stageTitle}
            />
          </div>
        </SectionBody>
      )}

      { false && (
        <SectionBody
          hasPaddingTop={!isTournamentInProgress}
          hasPaddingBottom={!isTournamentScheduled}
        >
          <div className={styles.wide}>
            <EventPartners />
          </div>
        </SectionBody>
      )}

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
        linkUrl={`/${sourceType}/${sourceId}`}
        className="u-order-7"
        linkText={i18nTexts.artifact.news.allLink}
      >
        <div className={styles.wide}>
          <BottomArticles
            title={i18nTexts.artifact.news.title}
            linkUrl={`/${sourceType}/${sourceId}`}
            linkText={i18nTexts.artifact.news.allLink}
            articles={first3Articles}
          />
        </div>
      </SectionBody>
    </Wrapper>
  </Page>
)

ArtifactPage.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  tableTabs: PropTypes.arrayOf(tableTabsPropTypes.isRequired).isRequired,
  ogImage: PropTypes.string.isRequired,
  rulesUrls: PropTypes.string.isRequired,
  promocodeAgreementUrls: PropTypes.string.isRequired,
  promocodeImagesData: PropTypes.shape({}).isRequired,
  first3Articles: articlesPropType.isRequired,
  first4Articles: articlesPropType.isRequired,
  first6Articles: articlesPropType.isRequired,
  isTournamentInProgress: PropTypes.bool.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  isTournamentScheduled: PropTypes.bool.isRequired,
  stageTitle: PropTypes.string.isRequired,
  broadcastUrl: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  videoPlayerAnchorRef: PropTypes.func.isRequired,
  registrationPromoSource: PropTypes.string.isRequired,
  sourceType: PropTypes.string.isRequired,
  sourceId: PropTypes.number.isRequired,
  activatedDateFrom: PropTypes.string.isRequired,
  activatedDateTo: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  playoffRounds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    // games: PropTypes.array,
  })).isRequired,
}

export default container(ArtifactPage)
