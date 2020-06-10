import {
  compose,
  lifecycle,
  withHandlers,
  withPropsOnChange,
  branch,
  renderNothing,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { getArticles } from 'weplay-core/reduxs/_legacy/articles/actions'
import { articlesFirstNSelector } from 'weplay-core/reduxs/_legacy/articles/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import { newsSectionSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    currentLanguage: currentLanguageSelector,
    i18nTexts: i18nTextsSelector,
    first3Articles: articlesFirstNSelector(3),
    first4Articles: articlesFirstNSelector(4),
    newsSection: newsSectionSelector,
  }), {
    // actionCreators
    getArticles,
  }),

  withPropsOnChange([
    'newsSection',
    'customSourceType',
    'customSourceId',
  ], ({
    newsSection,
    customSourceType,
    customSourceId,
  }) => ({
    sourceType: customSourceType || newsSection.sourceType,
    sourceId: customSourceId || newsSection.sourceId,
  })),

  branch(
    ({ sourceType, sourceId }) => !sourceType || !sourceId,
    renderNothing,
  ),

  withHandlers({
    fetchArticles: props => () => (
      props.getArticles({
        params: {
          language: props.currentLanguage,
          [props.sourceType]: props.sourceId,
          limit: 6,
          offset: 0,
          sort: '-published',
        },
      })
    ),
  }),

  lifecycle({
    componentDidMount() {
      this.props.fetchArticles()
    },
    componentDidUpdate(prevProps) {
      if (prevProps.currentLanguage !== this.props.currentLanguage
      || prevProps.sourceId !== this.props.sourceId
      || prevProps.sourceType !== this.props.sourceType
      ) {
        this.props.fetchArticles()
      }
    },
  }),
)

export default container
