// eslint-disable-line max-lines
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import PageHelmet from 'weplay-components/PageHelmet'
import AlertModal from 'weplay-components/Modals/AlertModal'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'

import matchPropType from 'weplay-competitive/customPropTypes/matchPropType'
import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import matchMemberPropType from 'weplay-competitive/customPropTypes/matchMemberPropType'
import csGoPropType from 'weplay-competitive/customPropTypes/statistic/csGoPropType'
import Wrapper from 'weplay-competitive/components/Wrapper'
import EmptyState from 'weplay-competitive/components/EmptyState'
import WrapperOverflowX from 'weplay-competitive/components/WrapperOverflowX'
import container from 'weplay-competitive/pages/MatchPage/container'
import MatchHeader from 'weplay-competitive/pages/MatchPage/MatchHeader'
import MatchMembers from 'weplay-competitive/pages/MatchPage/MatchMembers'
import TeamTabSwitcher from 'weplay-competitive/pages/MatchPage/TeamTabSwitcher'
import Information from 'weplay-competitive/pages/MatchPage/Information'
import ScoreBox from 'weplay-competitive/pages/MatchPage/ScoreBox'
import ScoreboxNew from 'weplay-competitive/pages/MatchPage/ScoreboxNew/ScoreboxNew'

import styles from './styles.scss'

const redSkull = 'https://static-prod.weplay.tv/2020-03-16/a49cddfb5f77c99f074713e92bde8b6f.050D2C-E292AC-7C848C.png'

const MatchPage = ({
  // required props

  // container props
  matchId,
  lobbyId,
  matchMembers,
  homeMatchMembers,
  homeTournamentMemberIds,
  matchPlayer1Id,
  seoParams,
  startVoteDatetime,
  handlerRefreshLobby,
  mapsStats,

  awayMatchMembers,
  awayTournamentMemberIds,
  matchPlayer2Id,
  match,
  isVoteItemsNotEmpty,
  isShowRestartLobbyAlert,
  setShowRestartLobbyAlert,
  emptyText,

  activeTab,
  handleTabClick,
  tabs,

  // props from HOC
  discipline,

  // optional props
}) => (

  <div
    className={styles.page}
    data-qa-id={dataQaIds.pages[NAMES.MATCH].container}
  >
    <PageHelmet
      seoParams={seoParams}
    />
    <MatchHeader
      matchId={matchId}
      lobbyId={lobbyId}
      homeTournamentMemberIds={homeTournamentMemberIds}
      awayTournamentMemberIds={awayTournamentMemberIds}
      matchMembers={matchMembers}
      discipline={discipline}
      mapsStats={mapsStats}
    />
    {/* add tabs overview & scorebox */}
    {false && (
    <Wrapper>
      <InlineTabs
        className="u-mt-3"
        hasSeparator
      >
        <Tab
          tab="Overview"
          handleClick
          activeTab
        />
        <Tab
          tab="Scorebox"
          handleClick
        />
      </InlineTabs>
    </Wrapper>
    )}
    <Wrapper>
      {
        (emptyText) ? (
          <>
            <div className={classNames(
              styles.grid,
              {
                [styles.isFullWidthLayout]: awayMatchMembers.length === 1,
              },
            )}
            />
            <EmptyState
              className={styles.empty}
              text={emptyText}
              avatar={redSkull}
              isHorizontal
            />
          </>
        ) : (
          <>
            {awayMatchMembers.length > 1 && (
              <TeamTabSwitcher
                homeTournamentMemberId={matchPlayer1Id}
                awayTournamentMemberId={matchPlayer2Id}
                activeTab={activeTab}
                handleTabClick={handleTabClick}
                tabs={tabs}
              />
            )}
            <div className={classNames(
              styles.grid,
              {
                [styles.isFullWidthLayout]: awayMatchMembers.length === 1,
              },
            )}
            >
              <MatchMembers
                matchId={matchId}
                matchMemberParticipationType={MATCH_MEMBER_PARTICIPATION_TYPES.HOME}
                matchMembers={homeMatchMembers}
                className={classNames(
                  styles.tab,
                  styles.firstTab,
                  {
                    [styles.isActive]: activeTab === MATCH_MEMBER_PARTICIPATION_TYPES.HOME,
                  },
                )}
              />
              <MatchMembers
                matchId={matchId}
                matchMemberParticipationType={MATCH_MEMBER_PARTICIPATION_TYPES.AWAY}
                matchMembers={awayMatchMembers}
                className={classNames(
                  styles.tab,
                  styles.secondTab,
                  {
                    [styles.isActive]: activeTab === MATCH_MEMBER_PARTICIPATION_TYPES.AWAY,
                  },
                )}
              />
              {match.relationships.lobby && (
                <Information
                  className={styles.information}
                  awayTournamentMemberIds={awayTournamentMemberIds}
                  homeTournamentMemberIds={homeTournamentMemberIds}
                  matchPlayer1Id={matchPlayer1Id}
                  matchPlayer2Id={matchPlayer2Id}
                  lobbyId={match.relationships.lobby.id}
                  matchStatus={match.status}
                  isVoteItemsNotEmpty={isVoteItemsNotEmpty}
                  startVoteDatetime={startVoteDatetime}
                  discipline={discipline}
                />
              )}
              {/* add scorebox */}
              {false && (
              <WrapperOverflowX>
                <ScoreboxNew />
              </WrapperOverflowX>
              )}
            </div>
          </>
        )
      }
      {isShowRestartLobbyAlert && (
      <AlertModal
        isShown={isShowRestartLobbyAlert}
        onCloseModal={() => setShowRestartLobbyAlert(false)}
        onConfirmModal={handlerRefreshLobby}
        texts="competitive.match.modals.alertRestartLobby"
        preview=""
      />
      )}
    </Wrapper>
    { (mapsStats && mapsStats.length > 0) && (
    <ScoreBox
      matchId={matchId}
      mapsStats={mapsStats}
      discipline={discipline}
    />
    )}
  </div>
)
MatchPage.propTypes = {
  // required props

  // container props
  matchId: PropTypes.number.isRequired,
  lobbyId: PropTypes.number.isRequired,
  matchMembers: PropTypes.arrayOf(matchMemberPropType).isRequired,
  homeMatchMembers: PropTypes.arrayOf(matchMemberPropType).isRequired,
  homeTournamentMemberIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  mapsStats: csGoPropType.isRequired,
  matchPlayer1Id: PropTypes.number.isRequired,
  matchPlayer2Id: PropTypes.number.isRequired,
  awayMatchMembers: PropTypes.arrayOf(matchMemberPropType).isRequired,
  awayTournamentMemberIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  match: matchPropType.isRequired,
  isVoteItemsNotEmpty: PropTypes.bool.isRequired,
  isShowRestartLobbyAlert: PropTypes.bool.isRequired,
  setShowRestartLobbyAlert: PropTypes.func.isRequired,
  handlerRefreshLobby: PropTypes.func.isRequired,
  startVoteDatetime: PropTypes.string.isRequired,
  emptyText: PropTypes.string.isRequired,

  handleTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ])).isRequired,

  // props from HOCs
  discipline: PropTypes.string.isRequired,

  // optional props
}

export default container(MatchPage)
