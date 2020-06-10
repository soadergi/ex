import {
  useState,
  useEffect,
  useCallback,
} from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { getActiveTournamentLiveStreamSelector } from 'weplay-core/reduxs/activeTournament/selectors'
import useAction from 'weplay-core/helpers/useAction'
import { setActiveTournamentLiveStream } from 'weplay-core/reduxs/activeTournament/actions'

import { tournamentActions } from 'weplay-events/reduxs/tournament'
import getTwitchStreamByUrl from 'weplay-events/helpers/getTwitchStreamByUrl'
import { TOURNAMENT_STATUSES } from 'weplay-events/pages/EventPage/constants'

import { useTournamentInfo } from './useTournamentInfo'

const getFirstTournament = tournaments => tournaments?.data?.[0] ?? {}
const getFirstStreamTitle = streams => streams?.[0] ?? {}

function getStream(streamUrls, onActiveStreamFound) {
  if (streamUrls.length === 0) return

  const [url, ...rest] = streamUrls

  getTwitchStreamByUrl({ streamUrl: url })
    .then((resp) => {
      const responseData = resp?.data?.data ?? []

      if (responseData.length) {
        const firstLiveStream = getFirstStreamTitle(responseData)
        const streamTitle = firstLiveStream.title
        const streamThumbnailWithDimensions = firstLiveStream.thumbnailUrl
        onActiveStreamFound({ url, streamTitle, streamThumbnailWithDimensions })
      } else {
        getStream(rest)
      }
    })
    .catch(() => {
      getStream(rest)
    })
}

export default function useActiveTournament() {
  const { locale } = useLocale()
  const { getTournaments } = useAction({ getTournaments: tournamentActions.queryRecords.request })
  const { setActiveTournamentLiveStreamAction } = useAction(
    { setActiveTournamentLiveStreamAction: setActiveTournamentLiveStream },
  )
  const [liveStreamUrl, setLiveStreamUrl] = useState('')

  const setActiveTournamentLiveStreamLiveStreamUrl = useCallback(
    ({ url, streamTitle, streamThumbnailWithDimensions }) => {
      setLiveStreamUrl(url)
      setActiveTournamentLiveStreamAction({
        liveStreamUrl: url,
        streamTitle,
        streamThumbnailWithDimensions,
      })
    },
    [],
  )

  const makeActiveTournament = useCallback(
    () => {
      getTournaments({
        included: 'streams,discipline',
        'filter[status]': TOURNAMENT_STATUSES.ONGOING,
        'page[limit]': 1,
        sort: 'start_date',
      }).then((response) => {
        const activeTournamentId = getFirstTournament(response).id

        if (activeTournamentId) {
          setActiveTournamentLiveStreamAction({
            tournamentId: activeTournamentId,
          })
        }

        const stream = response?.included?.stream ?? {}
        const twitchStreams = Object.values(stream)[0]?.attributes?.items?.twitchStreamLinks ?? []
        const currentUrls = twitchStreams.map(twitchStream => twitchStream.url)

        getStream(currentUrls, setActiveTournamentLiveStreamLiveStreamUrl)
      })
    },
    [
      getTournaments,
      liveStreamUrl,
      setActiveTournamentLiveStreamAction,
      setActiveTournamentLiveStreamLiveStreamUrl,
    ],
  )

  useEffect(
    () => makeActiveTournament(),
    [locale],
  )
  const { tournamentId } = useSelector(getActiveTournamentLiveStreamSelector)
  const {
    tournament,
    tournamentLinkUrl,
  } = useTournamentInfo({ tournamentId })

  return {
    liveStreamUrl,
    tournament,
    tournamentLinkUrl,
  }
}
