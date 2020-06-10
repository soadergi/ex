import React, { useEffect, useMemo, useState } from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import useEnvLabel from 'weplay-core/hooks/useEnvLabel'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import { STRIPE_KEY, STRIPE_SCRIPT } from './config/stripe'
import CheckoutForm from './CheckoutForm'

const DonateStripe = ({
  stripe,
  donateBtnText,
}) => {
  const { locale } = useLocale()
  const envLabel = useEnvLabel()
  const apiKey = useMemo(() => STRIPE_KEY[envLabel], [envLabel])
  const globalScope = useSelector(globalScopeSelector)
  const [isStripeLoaded, setIsStripeLoaded] = useState(false)
  const isStripeExist = useMemo(
    () => Boolean(globalScope.document.getElementById('stripev3')),
    [globalScope],
  )

  useEffect(() => {
    setIsStripeLoaded(isStripeExist)
    if (!isStripeExist) {
      const script = globalScope.document.createElement('script')
      script.src = STRIPE_SCRIPT
      script.id = 'stripev3'
      globalScope.document.body.appendChild(script)
      script.onload = () => setIsStripeLoaded(true)
    }
  }, [globalScope, isStripeExist])

  if (!isStripeLoaded) {
    return null
  }

  return (
    <StripeProvider
      apiKey={apiKey}
      locale={locale}
    >
      <Elements>
        <CheckoutForm
          stripe={stripe}
          donateBtnText={donateBtnText}
        />
      </Elements>
    </StripeProvider>
  )
}

DonateStripe.propTypes = {
  stripe: PropTypes.shape({
    redirectToCheckout: PropTypes.func.isRequired,
  }),
  donateBtnText: PropTypes.string.isRequired,
}

DonateStripe.defaultProps = {
  stripe: null,
}

export default DonateStripe
