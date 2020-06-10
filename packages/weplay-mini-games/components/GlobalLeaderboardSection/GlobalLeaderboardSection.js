import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import {
  getGlobalLeaders,
  getMaxResult,
} from 'weplay-mini-games/reduxs/gameLeaders/actions'
import {
  gameMaxResultSelector,
  isGameGlobalLeadersLoadingSelector,
  gameGlobalLeadersPaginationSelector,
} from 'weplay-mini-games/reduxs/gameLeaders/reducer'
import GameLeaderboard from 'weplay-mini-games/components/GameLeaderboard/GameLeaderboard'

const BUTTON_MODIFIERS = ['blockBorderWhite']
const initialFetchParams = {
  limit: 25,
  offset: 0,
}

const GlobalLeaderboardSection = ({ gameId }) => {
  const userMaxResult = useSelector(gameMaxResultSelector)
  const isLeadersLoading = useSelector(isGameGlobalLeadersLoadingSelector)
  const pagination = useSelector(gameGlobalLeadersPaginationSelector)

  return (
    <GameLeaderboard
      userPosition={0}
      userBestScore={userMaxResult}
      gameId={gameId}
      getLeaders={getGlobalLeaders}
      pagination={pagination}
      isLeadersLoading={isLeadersLoading}
      buttonModifiers={BUTTON_MODIFIERS}
      color="darkBlue"
      initialFetchParams={initialFetchParams}
      getMaxResult={getMaxResult}
    />
  )
}

GlobalLeaderboardSection.propTypes = {
  gameId: PropTypes.number.isRequired,
}

export default GlobalLeaderboardSection
