import {
  compose,
  withStateHandlers,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { currentLanguagePrefixSelector } from 'weplay-core/reduxs/language/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'
import { setGlobalCSSVar } from 'weplay-core/helpers/setGlobalCSSVar'

const COOKIE_POLICY_HEIGHT_CSS_VAR = 'wp-cookie-policy-height'

const container = compose(
  withRouteInfo,
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
    currentLanguagePrefix: currentLanguagePrefixSelector,

  }), {
    // actionCreators
  }),
  withStateHandlers(({
    globalScope,
  }) => ({
    // crazy naming alertPolicyVisibility is null if nobody seen it, and 'false' else, which is true
    isPopupVisible: !globalScope.localStorage.getItem('alertPolicyVisibility'),
  }), {
    closeCookiesPolicyPopup: (state, props) => () => {
      props.globalScope.localStorage.setItem('alertPolicyVisibility', true)
      return ({ isPopupVisible: false })
    },
  }),
  withPropsOnChange([
    'currentLanguagePrefix',
  ], ({
    currentLanguagePrefix,
  }) => ({
    cookiePolicyLink: `${currentLanguagePrefix}/legal/terms-of-service`,
  })),
  withHandlers({
    onResize: ({ globalScope }) => (width, height) => {
      setGlobalCSSVar({
        globalScope,
        varName: COOKIE_POLICY_HEIGHT_CSS_VAR,
        varValue: `${height}px`,
      })
    },
  }),
)

export default container
