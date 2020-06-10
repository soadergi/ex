import * as R from 'ramda'
import {
  compose,
  lifecycle,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { createNewspapersByArticleIdSelector } from 'weplay-core/reduxs/news/reducer'
import { readSpecialTags } from 'weplay-core/reduxs/specialTags/actions'
import { goTo, NAMES } from 'weplay-core/routes'
import { getSections } from 'weplay-core/reduxs/sections/actions'
import {
  latestIdsSelector,
  popularIdsSelector,
  topIdsSelector,
} from 'weplay-core/reduxs/sections/reducer'

const mapPropsToArticleId = props => Number(props.match?.params?.itemId)

const container = compose(
  withRouter,
  withLocale, // props: { locale, t }
  connect(createStructuredSelector({
    newspapersByArticleId: createNewspapersByArticleIdSelector(mapPropsToArticleId),
    popularIds: popularIdsSelector,
    topIds: topIdsSelector,
    latestIds: latestIdsSelector,
  }), {
    getSections: getSections.request,
    readSpecialTags: readSpecialTags.request,
  }),

  withPropsOnChange([
    'match',
    'newspapersByArticleId',
  ], ({
    match,
    newspapersByArticleId,
  }) => {
    const defaultNewspaper = R.head(newspapersByArticleId)
    return {
      activeTab: match.params?.tab || 'top',
      articleAnotherLanguage: defaultNewspaper.language || '',
      articleTitleAnotherLanguage: defaultNewspaper.title || '',
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.getSections({ language: this.props.locale })
    },

    componentDidUpdate(prevProps) {
      const {
        history,
        match,
        locale,
      } = this.props

      if (prevProps.locale !== locale) {
        goTo({
          name: NAMES.ARTICLE_SHOW,
          history,
          params: {
            articleId: match.params.itemId,
          },
        })
      }
    },
  }),
)

export default container
