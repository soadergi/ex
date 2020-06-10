import React, {
  useCallback,
  useState,
  useMemo,
} from 'react'
import { useSelector } from 'react-redux'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import {
  getActiveTournamentLiveStreamSelector,
  getLiveStreamThumbnailWithDimensionsSelector,
} from 'weplay-core/reduxs/activeTournament/selectors'
import MediaPlayer from 'weplay-components/MediaPlayer'
import Avatar from 'weplay-components/Avatar'

import AudioPlayerControls from './AudioPlayerControls'
import OnlineDescription from './OnlineDescription'
import OfflineDescription from './OfflineDescription'
import styles from './style.scss'

const initialVolumeValue = 0.5
const DEFAULT_STREAM_PICTURE_DIMENSIONS = {
  width: 48,
  height: 48,
}

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(initialVolumeValue)
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const { liveStreamUrl, streamTitle } = useSelector(getActiveTournamentLiveStreamSelector)
  const getLiveStreamThumbnailWithDimensions = useSelector(getLiveStreamThumbnailWithDimensionsSelector)

  const streamPictureURL = useMemo(
    () => getLiveStreamThumbnailWithDimensions({
      width: DEFAULT_STREAM_PICTURE_DIMENSIONS.width,
      height: DEFAULT_STREAM_PICTURE_DIMENSIONS.height,
    }),
    [getLiveStreamThumbnailWithDimensions],
  )

  const togglePlaying = useCallback(
    () => setIsPlaying(!isPlaying),
    [isPlaying],
  )

  const changeVolume = useCallback(
    event => setVolume(Number(event.target.value)),
    [],
  )

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        {!isMobileWidth && (
          <Avatar
            avatar={streamPictureURL}
            className={styles.logo}
            size="48"
          />
        )}

        <div className={styles.content}>
          {liveStreamUrl ? <OnlineDescription streamTitle={streamTitle} /> : <OfflineDescription />}
        </div>
      </div>

      <AudioPlayerControls
        togglePlaying={togglePlaying}
        changeVolume={changeVolume}
        volume={volume}
        isLive={Boolean(liveStreamUrl)}
        isPlaying={isPlaying}
      />

      {liveStreamUrl && (
        <MediaPlayer
          className={styles.mediaPlayer}
          url={liveStreamUrl}
          isAutoplay={isPlaying}
          volume={volume}
          isAudioStream
        />
      )}
    </div>
  )
}

export default AudioPlayer
