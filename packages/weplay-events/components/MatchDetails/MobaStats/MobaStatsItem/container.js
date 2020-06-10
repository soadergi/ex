import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withPropsOnChange,
  withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { getOpenDotaRequest } from 'weplay-events/reduxs/openDota/request'

const makeTeam = (match, startIndex, endIndex) => R.pipe(
  R.propOr([], 'players'),
  players => R.slice(startIndex, endIndex, players),
)(match)

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withStateHandlers({
    matchDetails: null,
  }, {
    setMatchDetails: () => matchDetails => ({ matchDetails }),
  }),

  withPropsOnChange([
    'participantA',
    'matchDetails',
  ], ({
    participantA,
    matchDetails,
  }) => {
    const isRadiantLeft = R.pipe(
      R.pathOr('', ['radiantTeam', 'name']),
      radiantTeamName => radiantTeamName.toLowerCase().trim() === participantA.nickname.toLowerCase().trim(),
    )(matchDetails)

    const isRadiantWin = R.propOr(false, 'radiantWin', matchDetails)

    return {
      isWinIconRight: (!isRadiantLeft && isRadiantWin) || (isRadiantLeft && !isRadiantWin),
      isRadiantLeft,
    }
  }),

  withPropsOnChange([
    'matchDetails',
  ], ({
    matchDetails,
    i18nTexts,
  }) => {
    const duration = R.propOr(0, 'duration', matchDetails)
    let durationHours = Math.floor(duration / 3600)
    durationHours = durationHours < 10 ? `0${durationHours}` : durationHours
    const durationMinutes = Math.floor((duration % 3600) / 60)
    let durationSeconds = Math.floor((duration % 3600) % 60)
    durationSeconds = durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds
    const hoursText = i18nTexts.time.formats.shortHours
    const minutesText = i18nTexts.time.formats.shortMinutes
    const secondsText = i18nTexts.time.formats.shortSeconds

    return {
      radiantHeroes: makeTeam(matchDetails, 0, 5),
      direHeroes: makeTeam(matchDetails, 5, 10),
      duration: durationHours > 0
        ? `${durationHours}${hoursText}${durationMinutes}${minutesText}`
        : `${durationMinutes}${minutesText}${durationSeconds}${secondsText}`,
    }
  }),

  lifecycle({
    componentDidMount() {
      const { matchId, setMatchDetails } = this.props

      getOpenDotaRequest({ matchId }).then(response => setMatchDetails(response))
    },
  }),
)

export default container
