import {
  compose,
  branch,
  renderNothing,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { zendeskLinks } from 'weplay-core/config'
import { i18nTextsSelector, currentLanguageSelector } from 'weplay-core/reduxs/language/reducer'
import { isUserHasPositiveBalanceSelector } from 'weplay-core/reduxs/wallets/reducer'


const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    currentLanguage: currentLanguageSelector,
    isUserHasPositiveBalance: isUserHasPositiveBalanceSelector,
  }), {
    // actionCreators
  }),

  branch(
    ({ isUserHasPositiveBalance }) => !isUserHasPositiveBalance,
    renderNothing,
  ),

  withPropsOnChange([
    'i18nTexts',
    'currentLanguage',
  ], ({
    i18nTexts,
    currentLanguage,
  }) => ({
    message: i18nTexts.wpBanner.message,
    buttonText: i18nTexts.wpBanner.buttonText,
    link: zendeskLinks.whatIsWp[currentLanguage],
  })),
)

export default container
