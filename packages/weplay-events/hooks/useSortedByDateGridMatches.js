import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { $prop } from 'weplay-core/$utils/$prop'

import splitDateTime from 'weplay-events/helpers/splitDateTime'
import { MATCH_STATUSES } from 'weplay-events/pages/EventPage/constants'

import { getGridItemsByGridIdSelector } from '../reduxs/gridItems/selectors'
import { matchesSelectors } from '../reduxs/matches'

const groupMatchesByDateAvailability = ({ matches, withTBAMatches }) => matches.reduce((acc, match) => {
  if (match.extraInfo?.hideMatch || !match.startDatetime || match.status === MATCH_STATUSES.INACTIVE) {
    return acc
  }

  if (!withTBAMatches && match.relationships.participants.length < 2) {
    return acc
  }

  if (!match.showStartDatetime) {
    acc.matchesWithoutDate.push(match)
    return acc
  }

  acc.matchesWithDate.push(match)
  return acc
}, {
  matchesWithoutDate: [],
  matchesWithDate: [],
})

const groupMatchesByStatus = matches => matches.reduce((acc, match) => {
  const { date } = splitDateTime(match.startDatetime)

  if (match.status === MATCH_STATUSES.SCHEDULED || match.status === MATCH_STATUSES.ACTIVE) {
    if (acc.upcoming[date]) {
      acc.upcoming[date].push(match)
      return acc
    }
    acc.upcoming[date] = [match]
    return acc
  }

  if (match.status === MATCH_STATUSES.FINISHED) {
    if (acc.past[date]) {
      acc.past[date].push(match)
      return acc
    }
    acc.past[date] = [match]
    return acc
  }

  return acc
}, {
  upcoming: {},
  past: {},
})

function useSortedByDateGridMatches({ gridIds, withTBAMatches }) {
  const gridItemsByGridIdSelector = useSelector(getGridItemsByGridIdSelector)
  const getMatchByIdSelector = useSelector(matchesSelectors.getRecordByIdSelector)

  const tournamentGridItems = useMemo(() => gridIds.flatMap(gridItemsByGridIdSelector),
    [gridIds, gridItemsByGridIdSelector])

  const gridMatches = useMemo(() => tournamentGridItems
    .flatMap(gridItem => gridItem?.relationships?.matches ?? []).map($prop('id')).map(getMatchByIdSelector),
  [tournamentGridItems, getMatchByIdSelector])

  const { matchesWithoutDate, matchesWithDate } = groupMatchesByDateAvailability({
    matches: gridMatches,
    withTBAMatches,
  })

  const sortedMatchesWithDate = useMemo(() => matchesWithDate
    .sort((a, b) => new Date(a.startDatetime) - new Date(b.startDatetime)),
  [matchesWithDate])

  const matchesByDate = groupMatchesByStatus(sortedMatchesWithDate)

  const tbaMatches = matchesWithoutDate.length > 0 && withTBAMatches ? [{ matches: matchesWithoutDate }] : []

  return useMemo(() => [
    ...Object.keys(matchesByDate.upcoming).map(date => ({
      title: date,
      isFinished: false,
      matches: matchesByDate.upcoming[date],
    })),
    ...tbaMatches,
    ...Object.keys(matchesByDate.past).reverse().map(date => ({
      title: date,
      isFinished: true,
      matches: matchesByDate.past[date],
    })),
  ], [gridMatches, withTBAMatches])
}

export default useSortedByDateGridMatches
