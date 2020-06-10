import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'
import PlayOff from 'weplay-events/components/EventsPlayOff'
import Scoreboard from 'weplay-events/components/TournamentBrackets/Scoreboard'
import Groups from 'weplay-events/components/TournamentBrackets/Groups'

import container from './container'
import styles from './styles.scss'

const MainContent = ({
  // required props
  scoreboardGroups,
  groups,
  isRoundRobinTournament,
  playoffRounds,
  isTournamentFinished,
  ScoreGroup,
  groupWinnersNumber,

  // container props
  routeInfo,

  // optional props
  CustomGroupTableRow,
  tournamentTitle,
  hasTicketIcon,
  renderTableHead,
  winnerIconName,
  stage3playOff,
  hasBracketNote,
}) => (
  <div
    className={classNames(
      styles.block,
      styles[tournamentTitle],
      { [styles.roundRobin]: isRoundRobinTournament },
    )}
  >
    {!R.isEmpty(scoreboardGroups) && (
      <Scoreboard
        groups={scoreboardGroups}
        isRoundRobinTournament={isRoundRobinTournament}
        ScoreGroup={ScoreGroup}
        tournamentTitle={tournamentTitle}
      />
    )}

    {!R.isEmpty(groups) && (
      <Groups
        groups={groups}
        stageTitle={routeInfo.title}
        isRoundRobinTournament={isRoundRobinTournament}
        CustomGroupTableRow={CustomGroupTableRow}
        renderTableHead={renderTableHead}
        winnerIconName={winnerIconName}
        tournamentTitle={tournamentTitle}
        hasTicketIcon={hasTicketIcon}
        stage3playOff={stage3playOff}
        groupWinnersNumber={groupWinnersNumber}
      />
    )}

    {!R.isEmpty(playoffRounds) && (
      <PlayOff
        rounds={playoffRounds}
        isTournamentFinished={isTournamentFinished}
        tournamentTitle={tournamentTitle}
        stage3playOff={stage3playOff}
        hasWideRound={stage3playOff}
        hasRemoveOffSetTop
        hasBracketNote={hasBracketNote}
      />
    )}
  </div>
)

MainContent.propTypes = {
  // required props
  stage3playOff: PropTypes.bool.isRequired,
  scoreboardGroups: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  isRoundRobinTournament: PropTypes.bool.isRequired,
  playoffRounds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    games: PropTypes.arrayOf(PropTypes.shape({})),
  })).isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  groupWinnersNumber: PropTypes.number.isRequired,

  // container props
  routeInfo: routeInfoPropType.isRequired,

  // optional props
  CustomGroupTableRow: PropTypes.func,
  renderTableHead: PropTypes.func,
  winnerIconName: PropTypes.string,
  tournamentTitle: PropTypes.string,
  hasTicketIcon: PropTypes.bool,
  hasBracketNote: PropTypes.bool,
  ScoreGroup: PropTypes.shape({}),
}

MainContent.defaultProps = {
  // optional props
  CustomGroupTableRow: null,
  renderTableHead: null,
  winnerIconName: '',
  tournamentTitle: '',
  hasTicketIcon: false,
  hasBracketNote: false,
  ScoreGroup: null,
}

export default container(MainContent)
