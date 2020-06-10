/* eslint-disable max-lines */
// TODO: events team please fix this
import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import SectionBody from 'weplay-components/SectionBody'
import PageHelmet from 'weplay-components/PageHelmet'
import HrefLangLink from 'weplay-components/HrefLangLink'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import Tabs from 'weplay-components/Tabs'

import TournamentBottomArticles from 'weplay-events/components/TournamentArticles/TournamentBottomArticles'
import ScheduleTab from 'weplay-events/components/TournamentBrackets/ScheduleTab'

import VotingItem from './VotingItem'
import copyLinkBannerImage from './img/scroll.svg'
import HeroSectionVote from './HeroSectionVote'
import SearchFilter from './SearchFilter'
import CopyLinkBanner from './CopyLinkBanner'
import AuthBlock from './AuthBlock'
import { articlesParams } from './constants'
import container from './container'
import styles from './styles.scss'

const subscribeFormModifiers = ['promo']
const detailsButtonModifiersHeroSection = ['alignCenterX', 'textDetails']
const detailsButtonModifiersButton = ['textDetails', 'voteMVP']

const VotingMVP = ({
  // required props

  // container props
  isVotingFinished,
  votingStartDatetime,
  tabs,
  setActiveTab,
  activeTab,
  searchInputValue,
  setSearchInputValue,
  filteredCandidates,
  isLoggedIn,
  openLoginModal,
  triggerSignUpModal,
  activeVotingId,
  copyLink,
  ogImage,
  toggleCollapsed,
  i18nTexts,
  isReversed,
  toggleReversed,
  sortByDropdownOptions,
  chooseByDropdownOptions,
  sortType,
  setSortType,
  teamName,
  setTeamName,
  tournamentTitle,
  candidatesStats,
  activeCandidateId,
  setClearSearchInputValue,
  showMoreVisible,
  match,

  // optional props
}) => (
  <div className={styles.block}>
    <PageHelmet
      ogImage={ogImage}
    />

    <HrefLangLink
      pathname="/voting/tug-of-war-dire-mvp"
    />

    <HeroSectionVote
      modifiers={detailsButtonModifiersHeroSection}
      tournamentTitle={tournamentTitle}
    />

    {!isVotingFinished && (
      <CopyLinkBanner
        linkUrl={copyLink}
        linkText={i18nTexts.votingMVP.copyLinkBanner.linkText}
        messageText={i18nTexts.votingMVP.copyLinkBanner.message}
        imageUrl={copyLinkBannerImage}
      />
    )}

    <div
      className={styles.wrapper}
      data-qa-id={dataQaIds.pages[NAMES.VOTING_MWP].container}
    >
      {isVotingFinished && (
        <div className={styles.container}>
          <p className={styles.mainTitle}>
            {i18nTexts.votingMVP.mainTitle}
          </p>
        </div>
      )}

      {!isLoggedIn && !isVotingFinished && (
        <div className={styles.container}>
          <AuthBlock
            signUpHandler={triggerSignUpModal}
            loginHandler={openLoginModal}
          />
        </div>
      )}

      <SectionBody
        hasPaddingTop={false}
        hasPaddingBottom={false}
        className={styles.container}
      >
        <div className={classNames(
          styles.tabs,
        )}
        >
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            TabComponent={ScheduleTab}
            onChange={setActiveTab}
          />
        </div>
      </SectionBody>

      {!isVotingFinished && (
        <SearchFilter
          inputValue={searchInputValue}
          changedHandler={setSearchInputValue}
          isReversed={isReversed}
          handleReverse={toggleReversed}
          sortByDropdownOptions={sortByDropdownOptions}
          chooseByDropdownOptions={chooseByDropdownOptions}
          sortType={sortType}
          setSortType={setSortType}
          chooseBy={teamName}
          setChooseBy={setTeamName}
          hasNoResults={R.isEmpty(filteredCandidates)}
          handleClearSearch={setClearSearchInputValue}
        />
      )}

      <SectionBody
        hasPaddingTop={false}
        hasPaddingBottom={false}
        className={classNames(
          styles.videowrapper,
          'u-order-1',
        )}
      >
        <div className={styles.wrapCandidates}>
          {filteredCandidates.map((candidate, index) => (
            <VotingItem
              match={match}
              key={candidate.id}
              candidate={candidate}
              activeVotingId={activeVotingId}
              activeTabId={activeTab.id}
              modifiers={detailsButtonModifiersButton}
              tournamentTitle={tournamentTitle}
              copyLink={copyLink}
              isWinner={isVotingFinished && index === 0}
              isHighlighted={candidate.id === activeCandidateId}
              isVotingFinished={isVotingFinished}
              votingStartDatetime={votingStartDatetime}
              activeCandidateId={activeCandidateId}
              stats={R.prop(R.path(['extra', 'steamId'], candidate))(candidatesStats)}
            />
          ))}
        </div>

        {showMoreVisible && (
          <div className="u-text-center u-mt-3">
            <Button
              priority={BUTTON_PRIORITY.SECONDARY}
              icon="load-more"
              onClick={toggleCollapsed}
            >
              {i18nTexts.button.loadMore}
            </Button>
          </div>
        )}
      </SectionBody>

      <SectionBody
        hasPaddingBottom={false}
        className={classNames(
          'u-order-3',
        )}
      >
        <SubscriptionBlock
          wrapperClass={styles.container}
          modifiers={subscribeFormModifiers}
        />
      </SectionBody>

      <TournamentBottomArticles
        className={classNames(
          'u-pt-5',
          'u-pb-4',
          'u-pt-lg-6',
        )}
        customSourceType={articlesParams.sourceType}
        customSourceId={articlesParams.sourceId}
      />
    </div>
  </div>
)

VotingMVP.propTypes = {
  // required props
  tournamentTitle: PropTypes.string.isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  isVotingFinished: PropTypes.bool.isRequired,
  votingStartDatetime: PropTypes.bool.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  searchInputValue: PropTypes.string.isRequired,
  setSearchInputValue: PropTypes.func.isRequired,
  filteredCandidates: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  openLoginModal: PropTypes.func.isRequired,
  triggerSignUpModal: PropTypes.func.isRequired,
  ogImage: PropTypes.string.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  copyLink: PropTypes.string.isRequired,
  activeVotingId: PropTypes.number.isRequired,
  isReversed: PropTypes.bool.isRequired,
  toggleReversed: PropTypes.func.isRequired,
  sortByDropdownOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  chooseByDropdownOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sortType: PropTypes.string.isRequired,
  setSortType: PropTypes.func.isRequired,
  teamName: PropTypes.string.isRequired,
  setTeamName: PropTypes.func.isRequired,
  candidatesStats: PropTypes.shape({}).isRequired,
  activeCandidateId: PropTypes.number.isRequired,
  setClearSearchInputValue: PropTypes.func.isRequired,
  showMoreVisible: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,

  // optional props
}

VotingMVP.defaultProps = {
  // optional props
}

export default container(VotingMVP)
