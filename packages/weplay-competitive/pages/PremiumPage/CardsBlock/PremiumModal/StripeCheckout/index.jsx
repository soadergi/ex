import React from 'react'
import PropTypes from 'prop-types'
import { Elements, StripeProvider } from 'react-stripe-elements'
import withLocale from 'weplay-singleton/LocaleProvider/withLocale'
import useStripeApiKey from 'weplay-competitive/hooks/useStripeApiKey'
import premiumCardPropType from 'weplay-competitive/customPropTypes/premiumCardPropType'

import CheckoutForm from './CheckoutForm'

const StripeCheckout = ({
  activePremiumCard,
  locale,
}) => {
  const apiKey = useStripeApiKey()

  return (
    <StripeProvider
      apiKey={apiKey}
      locale={locale}
    >
      <Elements>
        <CheckoutForm
          activePremiumCard={activePremiumCard}
        />
      </Elements>
    </StripeProvider>
  )
}

StripeCheckout.propTypes = {
  activePremiumCard: premiumCardPropType.isRequired,
  // props from HOC
  locale: PropTypes.string.isRequired,
}

export default withLocale(StripeCheckout)
