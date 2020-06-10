import * as R from 'ramda'
import {
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import getTwitchStreamByUrl from 'weplay-events/helpers/getTwitchStreamByUrl'

import { OFFLINE_STREAM_THUMBNAIL_URL } from '../constants'

export const useStreamPreview = ({
  stream,
  clickHandler,
  thumbnailWidth = '180',
  thumbnailHeight = '100',
  setCurrentStreamTitle,
  isActive,
}) => {
  const t = useTranslation()
  const handleClick = useCallback(() => clickHandler(stream), [clickHandler, stream])
  const [twitchStreamData, setTwitchStreamData] = useState({})

  const setTwitchStreamDataCallBack = useCallback((streamData) => {
    if (streamData?.data.length) {
      setTwitchStreamData(streamData.data[0])
    }
  }, [])

  useEffect(() => {
    getTwitchStreamByUrl({ streamUrl: stream.url })
      .then(resp => setTwitchStreamDataCallBack(resp.data))
      .catch((error) => { console.warn(error) })
  }, [stream, setTwitchStreamDataCallBack])

  const streamThumbnailUrl = useMemo(() => {
    const twitchStreamDataThumbnailUrl = twitchStreamData?.thumbnailUrl
    return twitchStreamDataThumbnailUrl
      ? twitchStreamDataThumbnailUrl.replace('{width}', thumbnailWidth).replace('{height}', thumbnailHeight)
      : OFFLINE_STREAM_THUMBNAIL_URL
  }, [twitchStreamData, thumbnailWidth, thumbnailHeight])

  const isLive = useMemo(() => !R.isEmpty(twitchStreamData), [twitchStreamData])

  const streamTitle = useMemo(() => (
    twitchStreamData?.title ?? t('events.streamPreview.offlineStream')
  ), [twitchStreamData, t])

  useEffect(() => {
    if (twitchStreamData.title && isActive) {
      setCurrentStreamTitle(twitchStreamData.title)
    }
  }, [twitchStreamData, setCurrentStreamTitle, isActive])

  return {
    handleClick,
    streamThumbnailUrl,
    isLive,
    streamTitle,
  }
}
