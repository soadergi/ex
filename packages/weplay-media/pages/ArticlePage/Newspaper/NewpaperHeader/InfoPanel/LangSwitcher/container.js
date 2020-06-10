import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  branch,
  renderNothing,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import withI18n from 'weplay-core/HOCs/withI18n'

const container = compose(
  withI18n,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
  }), {
  }),

  withPropsOnChange([
    'articleLanguages',
    'locale',
  ], ({
    articleLanguages,
    locale,
  }) => ({
    translates: R.filter(
      R.pipe(
        R.equals(locale),
        R.not,
      ),
      articleLanguages,
    ),
  })),

  branch(
    ({ translates }) => R.isEmpty(translates),
    renderNothing,
  ),
)

export default container
