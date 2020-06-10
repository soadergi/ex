import {
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react'
import { useSelector } from 'react-redux'

import { getEventStreamsSelector } from 'weplay-events/reduxs/streams/selectors'
import useCurrentTournamentStatus from 'weplay-events/pages/EventPage/hooks/useCurrentTournamentStatus'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

import { MIN_STREAMS_PREVIEW_AMOUNT } from './constants'

export const useStreamsPlayer = () => {
  const tournamentId = useCurrentTournamentId()
  const { isOngoing } = useCurrentTournamentStatus()
  const allTournamentStreams = useSelector(getEventStreamsSelector)(tournamentId)
  const [currentStream, setCurrentStream] = useState(null)
  const [currentStreamTitle, setCurrentStreamTitle] = useState('')
  const tournamentStreams = allTournamentStreams?.items?.twitchStreamLinks ?? []

  useEffect(() => {
    if (tournamentStreams.length) {
      setCurrentStream(tournamentStreams[0])
      setCurrentStreamTitle('')
    }
  }, [tournamentStreams, tournamentId])

  const previewStreams = useMemo(() => (
    tournamentStreams.length >= MIN_STREAMS_PREVIEW_AMOUNT ? tournamentStreams : []), [tournamentStreams])

  const isPlayerVisible = useMemo(() => Boolean(isOngoing && currentStream?.url), [isOngoing, currentStream])

  const clickHandler = useCallback((stream) => {
    setCurrentStream(stream)
    setCurrentStreamTitle('')
  }, [setCurrentStream, setCurrentStreamTitle])

  return {
    previewStreams,
    currentStream,
    setCurrentStream,
    isPlayerVisible,
    currentStreamTitle,
    setCurrentStreamTitle,
    clickHandler,
  }
}
