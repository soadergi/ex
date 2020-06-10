import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactPlayerWrapper from 'weplay-components/ReactPlayerWrapper/loadable'
import Icon from 'weplay-components/Icon'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import styles from './styles.scss'
import container from './container'

const mods = [
  'articlePlayer',
  'negativeOffsetTop',
]

const MediaPlayer = ({
  // required props

  isMobileWidth,
  closeVideoHandler,
  videoPlayerRef,
  videoPlayerWrapperRef,
  withChat,
  getIsPlayerInView,
  videosIndex,
  playNext,
  videosSrc,
  handlePlay,
  handlePause,
  // container props
  // optional props
  className,
  isStaticPosition,
  videosChatSrc,
  modifiers,
  isAudio,
  isAutoplay,
  blockRef,
  volume,
}) => {
  const isInView = getIsPlayerInView()
  return (
    <div
      className={classNames(
        styles.block,
        className,
        setCSSModifiers(modifiers, styles),
        {
          [styles.withChat]: withChat,
          [styles.audio]: isAudio,
        },
      )}
      ref={videoPlayerWrapperRef}
    >
      <div className={styles.container}>
        <div className={styles.frame}>
          <div
            ref={blockRef}
            className={classNames(
              styles.wrapper,
              { [styles.isSticky]: !isMobileWidth && isInView && !isStaticPosition },
            )}
          >
            <div className={styles.controls}>
              <button
                type="button"
                className={styles.controlsButton}
                onClick={closeVideoHandler}
              >
                <Icon
                  iconName="close"
                  className={styles.icon}
                />
              </button>
            </div>
            <ReactPlayerWrapper
              url={videosSrc[videosIndex]}
              onPause={handlePause}
              onPlay={handlePlay}
              width="100%"
              height="100%"
              onEnded={playNext}
              controls
              innerRef={videoPlayerRef}
              playing={isAutoplay}
              volume={volume}
            />
          </div>
        </div>
      </div>
      {withChat && (
        <div className={styles.chat}>
          <iframe
            className={styles.iframe}
            title="twitch-chat"
            src={videosChatSrc}
            frameBorder="0"
            scrolling="no"
          />
        </div>
      )}
    </div>
  )
}

MediaPlayer.propTypes = {
  // required props
  closeVideoHandler: PropTypes.func.isRequired,
  videoPlayerRef: PropTypes.func.isRequired,
  videoPlayerWrapperRef: PropTypes.func.isRequired,
  getIsPlayerInView: PropTypes.func.isRequired,
  isMobileWidth: PropTypes.bool.isRequired,
  videosSrc: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  videosIndex: PropTypes.number.isRequired,
  playNext: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
  handlePlay: PropTypes.func.isRequired,

  // container props
  // optional props
  className: PropTypes.string,
  withChat: PropTypes.bool,
  isAudio: PropTypes.bool,
  isStaticPosition: PropTypes.bool,
  videosChatSrc: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)),
  isAutoplay: PropTypes.bool,
  blockRef: PropTypes.shape({}),
  volume: PropTypes.number,
}

MediaPlayer.defaultProps = {
  className: '',
  isStaticPosition: false,
  videosChatSrc: '',
  modifiers: [],
  withChat: false,
  isAudio: false,
  isAutoplay: false,
  blockRef: {},
  volume: null,
}

export default container(MediaPlayer)
