import {
  compose,
} from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { currentLanguageSelector, i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
    globalScope: globalScopeSelector,
    currentLanguage: currentLanguageSelector,
  })),
)

export default container
