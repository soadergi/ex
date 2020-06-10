import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import styles from './style.scss'

const VOLUME_TO_PERCENTS_COEFFICIENT = 100

const getVolumeInPercents = volume => `${volume * VOLUME_TO_PERCENTS_COEFFICIENT}%`

function AudioPlayerControls({
  togglePlaying,
  changeVolume,
  volume,
  isLive,
  isPlaying,
}) {
  const volumePercentageValue = useMemo(
    () => getVolumeInPercents(volume),
    [volume],
  )

  return (
    <div
      className={classNames(
        styles.block,
        { [styles.disabled]: !isLive },
      )}
    >
      <div className={styles.controls}>
        <Icon
          onClick={togglePlaying}
          iconName={isPlaying ? 'pause' : 'play-sm'}
          className={styles.icon}
        />

        <Icon
          iconName="volume"
          className={styles.icon}
        />

        <div className={styles.wrapProgressbar}>
          <input
            className={styles.progressbar}
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={changeVolume}
          />
        </div>

        <span>{volumePercentageValue}</span>

        {/* TODO: Use when settings will be available */}
        {false && (
          <Icon
            iconName="settings"
            className={styles.icon}
          />
        )}
      </div>
    </div>
  )
}

AudioPlayerControls.propTypes = {
  isLive: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  togglePlaying: PropTypes.func.isRequired,
  changeVolume: PropTypes.func.isRequired,
}

export default AudioPlayerControls
