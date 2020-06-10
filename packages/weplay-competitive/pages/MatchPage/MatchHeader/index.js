// eslint-disable-line max-lines
import React from 'react'
import PropTypes from 'prop-types'
import { NavHashLink as NavLink } from 'react-router-hash-link'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import breadcrumbPropType from 'weplay-core/customPropTypes/breadcrumbPropType'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import Breadcrumbs from 'weplay-components/Breadcrumbs'
import BackgroundImg from 'weplay-components/BackgroundImg'
import Label from 'weplay-components/Label'

import matchPropType from 'weplay-competitive/customPropTypes/matchPropType'
import lobbyPropType from 'weplay-competitive/customPropTypes/lobbyPropType'
import matchMemberPropType from 'weplay-competitive/customPropTypes/matchMemberPropType'
import csGoPropType from 'weplay-competitive/customPropTypes/statistic/csGoPropType'
import Wrapper from 'weplay-competitive/components/Wrapper'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'
import Tooltip from 'weplay-competitive/pages/MatchPage/MatchHeader/Tooltip'
import container from 'weplay-competitive/pages/MatchPage/MatchHeader/container'
import MatchParticipant from 'weplay-competitive/pages/MatchPage/MatchHeader/MatchParticipant'
import MatchScore from 'weplay-competitive/pages/MatchPage/MatchHeader/MatchScore'
import MatchMainButton from 'weplay-competitive/pages/MatchPage/MatchHeader/MatchMainButton'
import LobbyLink from 'weplay-competitive/pages/MatchPage/MatchHeader/LobbyLink'
import VotingInfo from 'weplay-competitive/pages/MatchPage/MatchHeader/VotingInfo'
import { DISCORD_LINK } from 'weplay-competitive/constants/externalLinks'
import { DISCIPLINE_NAME_CSGO, DISCIPLINE_NAME_DOTA } from 'weplay-competitive/config/disciplines'
import { AT__LOBBY_GAME_STATS } from 'weplay-competitive/analytics/amplitude'

import CopyToClipboardServerLink from './CopyToClipboardServerLink'
import LobbyPassKey from './LobbyPassKey/LobbyPassKey'
import styles from './styles.scss'

const breadCrumbsModification = ['light']
const labelSuccess = 'success'
const labelWarning = 'warning'

const MatchHeader = ({
  // required props
  matchMembers,
  discipline,
  mapsStats,
  // container props
  matchBreadcrumbs,
  firstHomeTournamentMemberId,
  firstAwayTournamentMemberId,
  tournamentId,
  isCurrentMemberInMatch,
  isCurrentMemberTournamentSpectator,
  isCountDownShown,
  match,
  votingStartDatetime,
  isHomeParticipantActive,
  isAwayParticipantActive,
  lobby,
  countHomeOnlineParticipants,
  countAwayOnlineParticipants,
  scrollToScoreBox,
  isDiscordLinkShown,
  isSpectatorLinkShown,
  showMatchLink,
  backgroundSrc,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <BackgroundImg
        src={backgroundSrc}
      />
      <Wrapper className="u-pb-3">
        <div className={styles.breadcrumbs}>
          <Breadcrumbs
            className="u-pb-0 u-mr-2"
            allBreadcrumbs={matchBreadcrumbs}
            modifications={breadCrumbsModification}
          />
          {match.status === MATCH_STATUSES.ONGOING && (
          <Label
            className={styles.breadcrumbsLabel}
            color={labelSuccess}
          >
            {t('competitive.tournaments.statuses.ONGOING')}
          </Label>
          )}
        </div>
        <div
          className={styles.grid}
          data-event-amplitude-source="Game Lobby"
        >
          <div className={styles.discord}>
            <Label color={labelWarning}>
              {t(`competitive.match.warnings.${match.status}`)}
            </Label>
          </div>

          <div className={styles.user}>
            <MatchParticipant
              isParticipantActive={isHomeParticipantActive}
              tournamentMemberId={firstHomeTournamentMemberId}
              tournamentId={tournamentId}
              countOnline={countHomeOnlineParticipants}
            />
          </div>

          <div className={styles.score}>
            {(isDiscordLinkShown || isSpectatorLinkShown) && (
            <div className={styles.links}>
              {isDiscordLinkShown && (
                <LobbyLink
                  icon="discord-contained"
                  lobbyLink={DISCORD_LINK}
                  text={t('competitive.match.headerLinks.discord')}
                  className={styles.lobbyLink}
                />
              )}
              {isSpectatorLinkShown && (
                <LobbyLink
                  icon="spectate"
                  lobbyLink={`${discipline.runCommand}${match.matchLink || ''}`}
                  text={t('competitive.match.headerLinks.watch')}
                  className={styles.lobbyLink}
                />
              )}
            </div>
            )}
            <MatchScore
              match={match}
            />
          </div>

          {mapsStats.length > 0 && (
          <div className={styles.stats}>
            <NavLink
              to="#ScoreBoxSection"
              scroll={scrollToScoreBox}
              className={styles.statsLink}
              {...getAnalyticsAttributes({
                'amplitude-action': AT__LOBBY_GAME_STATS,
              })}
            >
              {t('competitive.match.matchInfo.gameStats')}
            </NavLink>
          </div>
          )}

          <div className={styles.user}>
            <MatchParticipant
              isParticipantActive={isAwayParticipantActive}
              tournamentMemberId={firstAwayTournamentMemberId}
              tournamentId={tournamentId}
              countOnline={countAwayOnlineParticipants}
            />
          </div>

          <div className={styles.button}>
            <MatchMainButton
              matchStatus={match.status}
              isCurrentMemberInMatch={isCurrentMemberInMatch}
              isCurrentMemberTournamentSpectator={isCurrentMemberTournamentSpectator}
              joinMatchLink={match.matchLink}
              tournamentId={tournamentId}
              lobby={lobby}
              match={match}
              matchMembers={matchMembers}
              discipline={discipline}
            />
            {showMatchLink && (
            <div className={styles.copylink}>
              {(match && match.matchLink) && (
                <CopyToClipboardServerLink text={`connect ${match.matchLink}`} />
              )}
            </div>
            )}
            {discipline === DISCIPLINE_NAME_DOTA && <LobbyPassKey matchId={match.id} />}
          </div>
        </div>
      </Wrapper>
      <VotingInfo
        lobby={lobby}
        match={match}
        isCountDownShown={isCountDownShown}
        tournamentId={tournamentId}
        votingStartDatetime={votingStartDatetime}
      />
      {discipline === DISCIPLINE_NAME_CSGO && <Tooltip />}
    </div>
  )
}

MatchHeader.propTypes = {
  // required props
  mapsStats: csGoPropType.isRequired,
  // container props
  matchBreadcrumbs: PropTypes.arrayOf(breadcrumbPropType).isRequired,
  matchMembers: PropTypes.arrayOf(matchMemberPropType).isRequired,
  firstHomeTournamentMemberId: PropTypes.number.isRequired,
  firstAwayTournamentMemberId: PropTypes.number.isRequired,
  tournamentId: PropTypes.number.isRequired,
  isCurrentMemberInMatch: PropTypes.bool.isRequired,
  isCurrentMemberTournamentSpectator: PropTypes.bool.isRequired,
  isCountDownShown: PropTypes.bool.isRequired,
  match: matchPropType.isRequired,
  lobby: lobbyPropType.isRequired,
  votingStartDatetime: PropTypes.shape({}),
  isHomeParticipantActive: PropTypes.bool.isRequired,
  isAwayParticipantActive: PropTypes.bool.isRequired,
  countHomeOnlineParticipants: PropTypes.number.isRequired,
  countAwayOnlineParticipants: PropTypes.number.isRequired,
  scrollToScoreBox: PropTypes.func.isRequired,
  isDiscordLinkShown: PropTypes.bool.isRequired,
  isSpectatorLinkShown: PropTypes.bool.isRequired,
  showMatchLink: PropTypes.bool.isRequired,
  backgroundSrc: imgPropType.isRequired,

  // props from HOCs
  discipline: PropTypes.string.isRequired,

  // optional props
}

MatchHeader.defaultProps = {
  votingStartDatetime: null,
  // optional props
}

export default container(MatchHeader)
