import React, {
  memo,
  useMemo,
} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import LocalizedMoment from 'weplay-components/LocalizedMoment'

import { tournamentSelectors } from 'weplay-events/reduxs/tournament'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import { gridItemsSelectors } from 'weplay-events/reduxs/gridItems'
import { gridSelectors } from 'weplay-events/reduxs/grids'
import { MATCH_FORMATS } from 'weplay-events/pages/EventPage/constants'

const MatchSubtitleInfo = ({
  match,
  withDateTime,
}) => {
  const tournamentId = useCurrentTournamentId()
  const getTournamentByIdSelector = useSelector(tournamentSelectors.getRecordByIdSelector)
  const getGridItemByIdSelector = useSelector(gridItemsSelectors.getRecordByIdSelector)
  const getGridByIdSelector = useSelector(gridSelectors.getRecordByIdSelector)
  const { matchGridItemId, matchFormat } = useMemo(() => ({
    matchGridItemId: match.relationships?.gridItem?.id,
    matchFormat: MATCH_FORMATS[match.format],
  }), [match])

  const { shortName } = useMemo(() => getTournamentByIdSelector(tournamentId),
    [tournamentId])

  const name = useMemo(() => {
    const gridItem = getGridItemByIdSelector(matchGridItemId)
    const gridId = gridItem.relationships.grid.id
    const grid = getGridByIdSelector(gridId)
    if (grid.bracketType === 'round-robin') {
      return grid.name
    }
    return gridItem.name
  }, [tournamentId, matchGridItemId, getGridByIdSelector, getGridItemByIdSelector])

  return (
    <>
      {`${shortName} • ${name} • ${matchFormat}`}

      {withDateTime && match.showStartDatetime && (
        <>
          {' '}
          •
          {' '}
          <LocalizedMoment
            formatKey="dateMonthYear"
            dateTime={match.startDatetime}
          />
          {' '}
          •
          {' '}
          <LocalizedMoment
            formatKey="24h"
            dateTime={match.startDatetime}
          />
        </>
      )}
    </>
  )
}

MatchSubtitleInfo.propTypes = {
  match: PropTypes.shape({
    showStartDatetime: PropTypes.bool,
    status: PropTypes.string,
    startDatetime: PropTypes.string,
    relationships: PropTypes.shape({}),
    format: PropTypes.string,
  }).isRequired,
  withDateTime: PropTypes.bool,
}

MatchSubtitleInfo.defaultProps = {
  withDateTime: false,
}

export default memo(MatchSubtitleInfo)
