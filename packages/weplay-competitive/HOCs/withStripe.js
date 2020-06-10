import { connect } from 'react-redux'
import { compose, lifecycle, withState } from 'recompose'
import { createStructuredSelector } from 'reselect'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import { STRIPE_SCRIPT } from 'weplay-competitive/config/stripe'

const withStripe = compose(
  connect(createStructuredSelector({
    // selectors
    globalScope: globalScopeSelector,
  }), {
    // actionCreators
  }),
  withState('isStripeLoaded', 'setIsStripeLoaded', false),
  lifecycle({
    componentDidMount() {
      const {
        setIsStripeLoaded,
        globalScope,
        isStripeLoaded,
      } = this.props
      setIsStripeLoaded(Boolean(globalScope.document.getElementById('stripev3')))
      if (!isStripeLoaded) {
        const script = globalScope.document.createElement('script')
        script.src = STRIPE_SCRIPT
        script.id = 'stripev3'
        globalScope.document.body.appendChild(script)
        script.onload = () => setIsStripeLoaded(true)
      }
    },
  }),
)

export default withStripe
