import * as R from 'ramda'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import {
  compose,
  lifecycle,
  withHandlers,
  withPropsOnChange,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import getArticleImage from 'weplay-core/helpers/getArticleImage'
import { transformUrl } from 'weplay-core/helpers/transformUrl'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { createNewspapersByArticleIdSelector } from 'weplay-core/reduxs/news/reducer'
import { goTo, NAMES } from 'weplay-core/routes'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'

import withServerRender from 'weplay-components/withServerRender'

import withContentStatus from 'weplay-media/HOCs/withContentStatus'

import { getInitialData } from './actionChains'

const mapPropsToArticleId = R.pipe(
  R.path(['match', 'params', 'articleId']),
  Number,
)

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    newspapersByArticleId: createNewspapersByArticleIdSelector(mapPropsToArticleId),
    isLoggedIn: isLoggedInSelector,
  }), {
    // actionCreators
  }),
  withLocale, // props: { locale }
  withServerRender(props => getInitialData({
    history: props.history,
    articleId: props.match.params.articleId,
  })),
  withContentStatus, // props: { handleContentStatus }

  withPropsOnChange([
    'newspapersByArticleId',
    'locale',
  ], ({
    newspapersByArticleId,
    locale,
  }) => {
    const newspaper = newspapersByArticleId.find(item => item.language === locale) || {}
    return {
      newspaper,
      articleLanguages: newspapersByArticleId.map(item => item.language),
      articleTitles: newspapersByArticleId.map(item => ({ [item.language]: item.title }))
        |> R.mergeAll,
      ogImage: getArticleImage(newspaper, 'standard').url,
      relatedNewspaperIds: newspaper.related || [],
    }
  }),

  withPageViewAnalytics(({
    newspaper,
  }) => ({
    articleName: newspaper.title,
  })),

  withHandlers({
    handleCurrentUrl: ({
      newspaper,
      match: { params },
      history,
      locale,
    }) => () => {
      const newspaperUrl = transformUrl(newspaper)
      if (newspaperUrl && (newspaperUrl !== `${params[0]}-${params.articleId}`)) {
        const langPrefix = locale !== 'en' ? `/${locale}` : ''
        console.log('REDIRECT IS TAKING PLACE BE AWARE')
        history.replace(`${langPrefix}/news/${newspaperUrl}`)
      }
    },
  }),

  lifecycle({
    componentDidMount() {
      this.props.handleCurrentUrl()
      this.props.handleContentStatus(this.props.newspaper)
    },

    componentDidUpdate(prevProps) {
      const {
        articleLanguages,
        history,
        match,
        newspaper,
        getInitialData, // eslint-disable-line no-shadow
        handleContentStatus,
        handleCurrentUrl,
      } = this.props

      if (!R.isEmpty(articleLanguages) && R.isEmpty(newspaper)) {
        console.log('REDIRECT IS TAKING PLACE BE AWARE')
        goTo({
          name: NAMES.NO_LANG,
          history,
          params: {
            itemId: match.params.articleId,
            pathNamePrefix: 'news',
            tab: 'top',
          },
        })
      }
      if (newspaper?.newsId !== prevProps.newspaper?.newsId) {
        getInitialData(this.props)
        handleContentStatus(newspaper)
        handleCurrentUrl()
      }
    },
  }),
)

export default container
