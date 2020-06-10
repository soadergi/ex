import {
  compose,
  withHandlers,
} from 'recompose'
import { startCase } from 'weplay-core/helpers/cases'
import { connect } from 'react-redux'
import {
  currentLanguagePrefixSelector, i18nTextsSelector,
  currentLanguageSelector,
} from 'weplay-core/reduxs/language/reducer'
import { createStructuredSelector } from 'reselect'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    currentLanguagePrefix: currentLanguagePrefixSelector,
  }), {
    // actionCreators
  }),
  withHandlers({
    handleClick: props => () => {
      props.logAnalyticsWithAction(startCase(props.item.label))
      props.toggleSidebar()
    },
  }),
)

export default container
