import {
  useMemo,
  useState,
  useEffect,
} from 'react'
import { useSelector } from 'react-redux'

import { getOpenDotaRequest } from 'weplay-events/reduxs/openDota/request'
import { gamesSelectors } from 'weplay-events/reduxs/games'

const secondsInHour = 3600

const calculateDetails = ({ gameDetails, participants }) => {
  const duration = gameDetails.duration
  const durationHours = String(Math.floor(duration / secondsInHour)).padStart(2, '0')
  const durationMinutes = String(Math.floor((duration % secondsInHour) / 60)).padStart(2, '0')
  const durationSeconds = String(Math.floor((duration % secondsInHour) % 60)).padStart(2, '0')

  const radiantTeamName = gameDetails?.radiantTeam?.name || ''
  const isRadiantLeft = radiantTeamName.toLowerCase().trim() === String(participants[0]?.name).toLowerCase().trim()
  const isRadiantWin = gameDetails.radiantWin
  const isWinIconRight = (!isRadiantLeft && isRadiantWin) || (isRadiantLeft && !isRadiantWin)

  return {
    allHeroes: gameDetails?.players,
    duration: `${durationHours}:${durationMinutes}:${durationSeconds}`,
    isRadiantLeft,
    isWinIconRight,
  }
}

export const useGameStats = ({
  gameId,
  participants,
}) => {
  const [gameDetails, setGameDetails] = useState({})
  const getAllGamesSelectors = useSelector(gamesSelectors.getRecordByIdSelector)

  const game = useMemo(
    () => getAllGamesSelectors(gameId),
    [gameId, getAllGamesSelectors],
  )

  const isGameDetails = useMemo(
    () => Boolean(Object.keys(gameDetails).length),
    [gameDetails],
  )

  useEffect(
    () => {
      if (!isGameDetails && game.whId) {
        getOpenDotaRequest({ matchId: game.whId }).then(setGameDetails)
      }
    },
    [isGameDetails, game.whId],
  )

  const details = useMemo(
    () => (
      isGameDetails
        ? calculateDetails({ gameDetails, participants })
        : null
    ),
    [isGameDetails, participants],
  )

  const gameLinks = useMemo(
    () => game.mediaInfo || {},
    [game],
  )

  return {
    isGameDetails,
    ...details,
    ...gameLinks,
  }
}
