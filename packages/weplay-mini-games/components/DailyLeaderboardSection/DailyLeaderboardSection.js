import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'

import {
  getDailyLeaders,
  getMaxResult,
} from 'weplay-mini-games/reduxs/gameLeaders/actions'
import {
  gameMaxResultSelector,
  isGameDailyLeadersLoadingSelector,
  gameDailyLeadersPaginationSelector,
} from 'weplay-mini-games/reduxs/gameLeaders/reducer'
import GameLeaderboard from 'weplay-mini-games/components/GameLeaderboard/GameLeaderboard'

import LadderDatePicker from './LadderDatePicker/LadderDatePicker'
import { useLadderDate } from './useLadderDate'

const BUTTON_MODIFIERS = ['blockBorderWhite']
// TODO: @Andrew, @Artem, extend with this param on back and BO
const DATE_START = '2020-04-22'

const DailyLeaderboardSection = ({ gameId }) => {
  const userMaxResult = useSelector(gameMaxResultSelector)
  const isLeadersLoading = useSelector(isGameDailyLeadersLoadingSelector)
  const pagination = useSelector(gameDailyLeadersPaginationSelector)

  const {
    decrementDay,
    incrementDay,
    dateFetchParams,
    dateLocalizedText,
    isStartDate,
    isEndDate,
  } = useLadderDate({ startDate: DATE_START })

  return (
    <>
      <LadderDatePicker
        text={dateLocalizedText}
        decrementDay={decrementDay}
        incrementDay={incrementDay}
        isStartDate={isStartDate}
        isEndDate={isEndDate}
      />
      <GameLeaderboard
        userPosition={0}
        userBestScore={userMaxResult}
        gameId={gameId}
        isLeadersLoading={isLeadersLoading}
        buttonModifiers={BUTTON_MODIFIERS}
        getLeaders={getDailyLeaders}
        pagination={pagination}
        color="darkBlue"
        getMaxResult={getMaxResult}
        additionalFetchParams={dateFetchParams}
      />
    </>
  )
}

DailyLeaderboardSection.propTypes = {
  gameId: PropTypes.number.isRequired,
}

export default DailyLeaderboardSection
