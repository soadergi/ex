import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  lifecycle,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'
import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import { readSeoTags } from 'weplay-media/reduxs/seoTags/actions'
import { seoTagsSelector } from 'weplay-media/reduxs/seoTags/reducer'

const REGEXP_LETTER = /[a-zA-Zа-яА-ЯёЁ]/

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    tags: seoTagsSelector,
  }), {
    // actionCreators
    readSeoTags: readSeoTags.request,
  }),
  withRouteInfo,

  withPropsOnChange([
    'routeInfo',
  ], ({
    routeInfo,
  }) => ({
    breadcrumbsEntityName: R.pipe(
      R.prop('name'),
      capitalizeFirstLetter,
    )(routeInfo),
  })),

  withPropsOnChange([
    'tags',
  ], ({
    tags,
  }) => {
    const tagsByCategory = R.groupBy(R.ifElse(
      tag => REGEXP_LETTER.test(tag.name[0]),
      tag => tag.name[0].toUpperCase(),
      R.always('0-9'),
    ))(tags)
    return {
      categories: R.keys(tagsByCategory),
      tagsByCategory,
    }
  }),

  lifecycle({
    componentDidMount() {
      this.props.readSeoTags(this.props.currentLanguage)
    },

    componentDidUpdate(prevProps) {
      if (prevProps.currentLanguage !== this.props.currentLanguage) {
        this.props.readSeoTags(this.props.currentLanguage)
      }
    },
  }),
)

export default container
