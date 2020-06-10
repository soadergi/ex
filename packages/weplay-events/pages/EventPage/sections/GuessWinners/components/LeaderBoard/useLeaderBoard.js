import { useEffect, useState, useCallback } from 'react'

import { $prop } from 'weplay-core/$utils/$prop'

import { getLeaderBoardItems, getLeaderBoardItem } from 'weplay-events/services/leader-boards'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import getTwitchUsersById from 'weplay-events/helpers/getTwitchUsersById'
import useConnectedTwitchAccountId from 'weplay-events/pages/EventPage/hooks/useConnectedTwitchAccountId'

const PAGE_LIMIT = 10

const normalizeUser = user => ({
  ...user,
  id: Number(user.id),
})

function useLeaderBoard() {
  const tournamentId = useCurrentTournamentId()
  const connectedTwitchAccountId = useConnectedTwitchAccountId()
  const [leaderBoard, setLeaderBoard] = useState([])
  const [pageOffset, setPageOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isAllListLoaded, setIsAllListLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const handleLoadMore = useCallback(() => setPageOffset(currentPageOffset => currentPageOffset + PAGE_LIMIT), [])

  const getLeaderBoardUsersTwitchData = useCallback((leaderBoardData) => {
    const leaderBoardUserTwitchIds = leaderBoardData.map($prop('id'))

    if (leaderBoardUserTwitchIds.includes(connectedTwitchAccountId)) {
      setCurrentUser(false) // currentUser was found in leaderBoard list, and will be rendered there now
    }

    if (leaderBoardUserTwitchIds.length === 0) {
      return {}
    }

    return getTwitchUsersById(leaderBoardUserTwitchIds)
      .then((twitchResponse) => {
        const leaderBoardDataComplementedWithTwitch = leaderBoardData.map((leaderBoardItem) => {
          const leaderBoardItemTwitchData = twitchResponse.data.data
            .find(twitchDataItem => twitchDataItem.id === String(leaderBoardItem.id))
          return {
            ...leaderBoardItemTwitchData,
            ...leaderBoardItem,
          }
        })

        setLeaderBoard(currentLeaderBoard => currentLeaderBoard.concat(leaderBoardDataComplementedWithTwitch))
      })
      .catch((error) => {
        setLeaderBoard(currentLeaderBoard => currentLeaderBoard.concat(leaderBoardData))
        console.warn(error)
      })
  }, [connectedTwitchAccountId])

  useEffect(() => {
    if (!tournamentId) {
      return
    }

    setIsLoading(true)

    getLeaderBoardItems({
      tournamentId,
      pageLimit: PAGE_LIMIT,
      pageOffset,
    })
      .then((leaderBoardResponse) => {
        const { total, offset, limit } = leaderBoardResponse.data.meta.pagination
        if (total <= offset + limit) {
          setIsAllListLoaded(true)
        }
        return getLeaderBoardUsersTwitchData(leaderBoardResponse.data.data)
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        setIsLoading(false)
        console.warn(error)
      })
  }, [tournamentId, pageOffset, /* getLeaderBoardUsersTwitchData commented to prevent fetch on login/logout */
  ])

  const appendDataToCurrentUser = useCallback((userData) => {
    setCurrentUser((user) => {
      if (user === false) return user // user is in leaderBoard list already

      return {
        ...user,
        ...normalizeUser(userData),
      }
    })
  }, [])

  useEffect(() => {
    if (!connectedTwitchAccountId) {
      return
    }

    getTwitchUsersById([connectedTwitchAccountId])
      .then(twitchResponse => appendDataToCurrentUser(twitchResponse.data.data[0]))

    if (!tournamentId) {
      return
    }

    getLeaderBoardItem({
      tournamentId,
      participantTwitchId: connectedTwitchAccountId,
    })
      .then(leaderBoardResponse => appendDataToCurrentUser(leaderBoardResponse.data.data))
      .catch((error) => {
        setCurrentUser(false)
        console.warn(error)
      })
  }, [tournamentId, connectedTwitchAccountId, appendDataToCurrentUser])

  return {
    leaderBoard,
    connectedTwitchAccountId,
    currentUser,
    isLoading,
    PAGE_LIMIT,
    isAllListLoaded,
    handleLoadMore,
  }
}

export default useLeaderBoard
