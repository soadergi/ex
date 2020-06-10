import {
  compose,
  lifecycle,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { getSubscriptionScopes } from 'weplay-core/reduxs/subscriptions/actions'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import {
  // createEventRootPageGalleryImagesSelector,
  createEventRootPageNewsSourceListSelector,
  createEventsRootPageArchiveEventsSelector,
  // createEventsRootPageFutureEventsSelector,
  createEventsRootPageTalentsSelector,
} from 'weplay-events/reduxs/rootpage/selectors'

import backgroundUrl from './img/Talents_bg.png'
import { readHomePageAndNews } from './actionChains'
import { ROOT_PAGE_ID } from './constants'

const getRootPageId = () => ROOT_PAGE_ID

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    talents: createEventsRootPageTalentsSelector(ROOT_PAGE_ID),
    currentLanguage: currentLanguageSelector,
    eventRootPageNewsSourceList: createEventRootPageNewsSourceListSelector(getRootPageId),
    eventsRootPageArchiveEvents: createEventsRootPageArchiveEventsSelector(getRootPageId),
    // eventsRootPageFutureEvents: createEventsRootPageFutureEventsSelector(getRootPageId),
    // eventRootPageGalleryImages: createEventRootPageGalleryImagesSelector(() => ROOT_PAGE_ID),
  }), {
    // actionCreators
    readHomePageAndNews,
    getSubscriptions: getSubscriptionScopes.request,
    backgroundImg: backgroundUrl,
  }),

  withPropsOnChange([
    'routeInfo',
  ], ({
    routeInfo,
  }) => ({
    hreflangUrl: `/${routeInfo.project}/${routeInfo.path}`,
  })),

  withHandlers({
    fetchData: ({
      readHomePageAndNews, // eslint-disable-line no-shadow
      getSubscriptions,
      currentLanguage,
    }) => () => {
      readHomePageAndNews()

      getSubscriptions({
        params: {
          language: currentLanguage,
          limit: 200,
        },
      }).catch(error => console.warn(error))
    },
  }),

  withPageViewAnalytics(),

  lifecycle({
    componentDidMount() {
      this.props.fetchData()
    },

    componentDidUpdate(prevProps) {
      if (prevProps.currentLanguage !== this.props.currentLanguage) {
        this.props.fetchData()
      }
    },
  }),
)

export default container
