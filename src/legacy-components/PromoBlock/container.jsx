import {
  compose,
  withProps,
  withPropsOnChange,
  lifecycle,
} from 'recompose'
import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { getArticles } from 'weplay-core/reduxs/_legacy/articles/actions'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { createIsUserSubscribedSelector } from 'weplay-core/reduxs/subscriptions/reducer'
import { articlesFirstNSelector } from 'weplay-core/reduxs/_legacy/articles/reducer'
import { getPromoConfig } from 'weplay-core/reduxs/promoCodes/actions'
import { promoConfigSelector } from 'weplay-core/reduxs/promoCodes/reducer'
import withArticles from 'weplay-core/HOCs/withArticles'

const container = compose(
  withProps({
    activityStatus: 'activity_finished', // TODO get this value from backoffice when it`s ready
    newsTagId: 78,
  }),
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    isUserSubscribed: createIsUserSubscribedSelector(R.prop('scope')),
    first3Articles: articlesFirstNSelector(3),
    promoConfig: promoConfigSelector,
  }), {
    getArticles,
    getPromoConfig: getPromoConfig.request,
  }),
  withProps(props => ({
    videos: [
      {
        id: 0,
        videoUrl: 'https://www.youtube.com/watch?v=16FEpKvTdmQ',
      },
      {
        id: 1,
        videoUrl: 'https://www.youtube.com/watch?v=8EnOfJWb0gw',
      },
      {
        id: 2,
        videoUrl: 'https://www.youtube.com/watch?v=qFJT8RVPqgc',
      },
    ],

    requestArticlesParams: {
      tag: props.newsTagId,
      limit: 6,
      offset: 0,
      sort: '-published',
    },
  })),

  withPropsOnChange(
    [
      'i18nTexts',
      'isUserSubscribed',
      'activityStatus',
    ], ({
      i18nTexts,
      isUserSubscribed,
      activityStatus,
    }) => ({
      formTitle: i18nTexts.promoBlock[isUserSubscribed ? 'hasSubscribedTitle' : 'titleSubscribeFinished'],
      formText: i18nTexts.promoBlock[isUserSubscribed ? 'hasSubscribedText' : 'subtitleSubscribeFinished'],
      showArticles: activityStatus === 'activity_not_started' || activityStatus === 'activity_on_hold',
      showVideos: activityStatus === 'activity_finished',
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.getPromoConfig()
    },
  }),
  withArticles,
)

export default container
