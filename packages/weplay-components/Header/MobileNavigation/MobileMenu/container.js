import {
  compose,
  withPropsOnChange,
} from 'recompose'

// TODO: @mambyk
// import withClosestTournamentEvent from 'HOCs/withClosestTournamentEvent'

const container = compose(
  // withClosestTournamentEvent, // props: { tournamentEvent, isTournamentEventInProgress }
  withPropsOnChange([
    'isMobileWidth',
    'isTournamentEventInProgress',
  ], ({
    isMobileWidth,
    isTournamentEventInProgress,
  }) => ({
    isMobileTournamentInfoVisible: Boolean(isTournamentEventInProgress && isMobileWidth),
  })),
)

export default container
