import * as R from 'ramda'
import {
  compose,
  branch,
  renderNothing,
  withStateHandlers,
  withPropsOnChange,
  withHandlers,
} from 'recompose'

const MAX_VIDEOS_COUNT = 4

const container = compose(
  branch(
    ({ videoData }) => R.isNil(videoData) || R.isEmpty(videoData),
    renderNothing,
  ),

  withStateHandlers({
    activeTabIndex: 0,
    isFirstVideoViewed: false,
  }, {
    setActiveTabIndex: () => activeTabIndex => ({
      activeTabIndex,
    }),
    setFirstVideoViewStatus: () => isFirstVideoViewed => ({
      isFirstVideoViewed,
    }),
  }),

  withPropsOnChange([
    'videoData',
  ], ({
    videoData,
  }) => ({
    videos: R.pipe(
      R.propOr([], 'videos'),
      R.slice(0, MAX_VIDEOS_COUNT),
    )(videoData),
    viewMoreLink: R.propOr('', 'linkUrl', videoData),
  })),

  withPropsOnChange([
    'videos',
    'isFirstVideoViewed',
    'activeTabIndex',
  ], ({
    videos,
    isFirstVideoViewed,
    activeTabIndex,
  }) => ({
    activeVideoTitle: videos[activeTabIndex].title,
    activeVideoUrl: `${videos[activeTabIndex].url}${isFirstVideoViewed ? '?autoplay=1' : ''}`,
  })),

  withHandlers({
    handleSetActiveTabIndex: props => (index) => {
      props.setFirstVideoViewStatus(true)
      props.setActiveTabIndex(index)
      props.handleScrollToVideo()
    },
  }),
)

export default container
