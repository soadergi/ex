import {
  compose,
  lifecycle,
  withProps,
  withHandlers,
} from 'recompose'
import * as R from 'ramda'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { camelizeKeys, localizeWith } from 'weplay-core/reduxs/helpers'
import {
  getHomepageResourceIds,
  homepageResourceIdsSelector,
  isHomepageFetchedSelector,
  homepageSliderSelector,
  homepageTournamentsSelector,
  homepageNewsBlockSelector,
  homepageYoutubeSelector,
  homepageVideoSocialLinksSelector,
  homepageSocialPostsSelector,
  homepageSocialLinksSelector, homepageSubscriptionSelector,
} from 'weplay-core/reduxs/homepage/reducer'
import {
  isSubscriptionBlockAlreadyFetchedSelector,
  isSubscriptionBlockLoadingSelector,
} from 'weplay-core/reduxs/subscriptionBlocks/reducer'
import { createSubscriptionByLocationSelector } from 'weplay-core/reduxs/subscriptions/reducer'
import { globalScopeSelector, originSelector } from 'weplay-core/reduxs/common/selectors'
import { currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { readHomepage } from 'weplay-core/reduxs/homepage/actions'
import { readNews } from 'weplay-core/reduxs/news/actions'
import { readSpecialTag } from 'weplay-core/reduxs/specialTags/actions'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { getSubscriptionBlock } from 'weplay-core/reduxs/subscriptionBlocks/actions'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import bgImage from './img/product-bg.svg'

const subscriptionPageName = 'general'
const mapPropsToLocation = () => ({
  page: subscriptionPageName,
  id: 0,
})

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    origin: originSelector,
    globalScope: globalScopeSelector,
    currentLanguage: currentLanguageSelector,
    isHomepageFetched: isHomepageFetchedSelector,
    homepageResourceIds: homepageResourceIdsSelector,
    homepageSlider: homepageSliderSelector,
    homepageTournaments: homepageTournamentsSelector,
    homepageYoutube: homepageYoutubeSelector,
    homepageVideoSocialLinks: homepageVideoSocialLinksSelector,
    homepageNewsBlock: homepageNewsBlockSelector,
    homepageSocialPosts: homepageSocialPostsSelector,
    homepageSocialLinks: homepageSocialLinksSelector,
    homepageSubscription: homepageSubscriptionSelector,
    isSubscriptionBlockAlreadyFetched: isSubscriptionBlockAlreadyFetchedSelector(mapPropsToLocation),
    isSubscriptionBlockLoading: isSubscriptionBlockLoadingSelector,
    subscriptionBlock: createSubscriptionByLocationSelector(mapPropsToLocation),
  }), {
    // actionCreators
    readHomepage: readHomepage.request,
    readNews: readNews.request,
    readSpecialTag: readSpecialTag.request,
    getSubscriptionBlock: getSubscriptionBlock.request,
  }),
  withPageViewAnalytics(),

  withProps(() => ({
    sectionBackground: { backgroundImage: `url('${bgImage}')` },
    ogImage: 'https://static-prod.weplay.tv/2019-06-26/cebbfde0939816829386b129c41dcfc4.jpeg',
  })),

  // TODO: @Andrew, use general helper or HOC for scroll to elements
  withHandlers(({ globalScope }) => {
    let videoAnchor
    return {
      videoAnchorRef: () => (ref) => { videoAnchor = ref },
      handleScrollToVideo: () => () => {
        if (videoAnchor) {
          globalScope.scrollTo({
            top: videoAnchor.offsetTop,
            behavior: 'smooth',
          })
        }
      },
    }
  }),

  withHandlers({
    getResourcesData: ({
      currentLanguage,
      readNews, // eslint-disable-line no-shadow
      readSpecialTag, // eslint-disable-line no-shadow
    }) => (resources) => {
      if (R.not(R.isEmpty(resources.newsIds))) {
        readNews({
          language: currentLanguage,
          targetIds: resources.newsIds.join(','),
          limit: 20,
        })
      }
      if (R.not(R.isNil(resources.specialTagId))) {
        readSpecialTag({
          specialTagId: resources.specialTagId,
        })
      }
    },
    handleSubscriptionBlock: ({
      currentLanguage,
      isSubscriptionBlockAlreadyFetched,
      isSubscriptionBlockLoading,
      getSubscriptionBlock, // eslint-disable-line no-shadow,
    }) => () => {
      if (!isSubscriptionBlockAlreadyFetched && !isSubscriptionBlockLoading) {
        getSubscriptionBlock({
          params: {
            language: currentLanguage,
            isActive: 1,
            locationPage: subscriptionPageName,
            locationId: 0,
          },
        })
      }
    },
  }),

  lifecycle({
    componentDidMount() {
      this.props.readHomepage()
        .then(camelizeKeys)
        .then(localizeWith(this.props.currentLanguage))
        .then(getHomepageResourceIds)
        .then(this.props.getResourcesData)
      this.props.handleSubscriptionBlock()
    },

    componentDidUpdate(prevProps) {
      if (prevProps.currentLanguage !== this.props.currentLanguage) {
        this.props.getResourcesData(this.props.homepageResourceIds)
        this.props.handleSubscriptionBlock()
      }
    },
  }),
)

export default container
