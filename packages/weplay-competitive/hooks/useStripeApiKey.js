import useEnvLabel from 'weplay-core/hooks/useEnvLabel'

import { STRIPE_KEY } from 'weplay-competitive/config/stripe'

const useStripeApiKey = () => {
  const envLabel = useEnvLabel()
  return STRIPE_KEY[envLabel]
}

export default useStripeApiKey
