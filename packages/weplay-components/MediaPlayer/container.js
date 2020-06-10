import queryString from 'query-string'
import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  compose,
  withProps,
  withHandlers,
  withStateHandlers,
  withPropsOnChange,
} from 'recompose'
import { createStructuredSelector } from 'reselect'

import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import withScrollInfo from 'weplay-core/HOCs/withScrollInfo'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import withStreams from 'weplay-core/HOCs/withStreams'
import { getHostNameFromUrl } from 'weplay-core/helpers/getHostNameFromUrl'

const getHostrNameFromUrl = (url) => {
  const hostName = getHostNameFromUrl(url)
  return `${hostName.charAt(0).toUpperCase()}${hostName.slice(1)}`
}

const switchToWorstQuality = (videoPlayer) => {
  if (!videoPlayer.player.player.player) {
    return
  }
  const qualities = videoPlayer.player.player.player?.getQualities() ?? []
  const currentQuality = videoPlayer.player.player.player?.getQuality()
  const worstQuality = qualities[qualities.length - 1]
  if (currentQuality !== worstQuality.group) {
    videoPlayer.player.player.player.setQuality(worstQuality.group)
  }
}
const container = compose(
  withScrollInfo(['scrollTop']),
  withRouteInfo,
  withStreams,
  connect(createStructuredSelector({
    isMobileWidth: isMobileWidthSelector,
    globalScope: globalScopeSelector,
  }), {
  }),
  withAnalytics,
  withStateHandlers({
    isStickyPlayerClosed: false,
    videoPlayer: {},
  }, {
    closeVideoHandler: () => () => ({
      isStickyPlayerClosed: true,
      isInView: false,
    }),
  }),

  withPropsOnChange([
    'history',
    'streams',
    'isTournamentInProgress',
  ], ({
    history,
    streams,
    isTournamentInProgress,
  }) => {
    const isAutoplay = queryString.parse(history.location.search).auto_play !== 'false'

    return ({
      isLive: (isTournamentInProgress && !R.isEmpty(streams)) || isAutoplay,
    })
  }),

  withProps(({
    url,
  }) => {
    const videosSrc = R.is(Array, url) ? url : [url]

    return ({
      videosSrc,
      videosCount: videosSrc.length,
    })
  }),

  withStateHandlers(
    ({ initialIndex = 0 }) => ({
      videosIndex: initialIndex,
    }),
    {
      playNext: ({ videosIndex }, { videosCount }) => () => ({
        videosIndex: videosIndex === videosCount - 1 ? 0 : videosIndex + 1,
      }),
    },
  ),

  withPropsOnChange([
    'videosSrc',
    'videosIndex',
  ], ({
    videosSrc,
    videosIndex,
  }) => {
    const [, channelName] = videosSrc[videosIndex].split('https://www.twitch.tv/')
    return ({
      videosChatSrc: `https://www.twitch.tv/embed/${channelName}/chat`,
    })
  }),

  withHandlers(() => {
    let videoPlayerWrapper
    let videoPlayer
    return {
      videoPlayerWrapperRef: () => (wrapper) => { videoPlayerWrapper = wrapper },
      videoPlayerRef: () => (player) => { videoPlayer = player },

      getIsPlayerInView: props => () => { // TODO rewrite with withPropsOnChange
        if (!videoPlayerWrapper) {
          return props.isPlayerActive
        }
        if (!videoPlayer) {
          return false
        }
        const iframeNode = videoPlayerWrapper.querySelector('iframe')
        if (iframeNode) {
          iframeNode.setAttribute('title', 'Media player')
        }
        const { y, height } = videoPlayerWrapper && videoPlayerWrapper.getBoundingClientRect()
        return videoPlayer.player.isPlaying && !props.isStickyPlayerClosed && ((height + y) < 0)
      },

      handlePause: props => () => {
        // TODO: hotfix, looks like onPause is triggered when player rendered initially
        if (videoPlayer?.getCurrentTime()) {
          props.logAnalytics({
            eventCategory: props.isAudioStream ? 'Audio' : 'Video',
            eventAction: 'pause',
            eventLabel: getHostrNameFromUrl(props.url),
          })
        }
      },

      handlePlay: props => () => {
        props.logAnalytics({
          eventCategory: props.isAudioStream ? 'Audio' : 'Video',
          eventAction: 'start',
          eventLabel: getHostrNameFromUrl(props.url),
        })
        if (props.isAudioStream && videoPlayer) {
          switchToWorstQuality(videoPlayer)
        }
      },
    }
  }),
)

export default container
