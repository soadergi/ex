import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { injectStripe } from 'react-stripe-elements'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import useAction from 'weplay-core/helpers/useAction'
import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import withAnalytics from 'weplay-core/HOCs/withAnalytics'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import { applyPremium } from 'weplay-core/reduxs/premiums/actions'

import Link from 'weplay-components/Link'
import Tip from 'weplay-components/Tip'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import { PAYMENT_TYPES } from 'weplay-competitive/constants/paymentTypes'
import { AT__PREMIUM_PAY } from 'weplay-competitive/analytics/amplitude'
import premiumCardPropType from 'weplay-competitive/customPropTypes/premiumCardPropType'

import styles from './styles.scss'

const termsLink = '/legal/premiumpolicy'

const CheckoutForm = ({
  activePremiumCard,
  // props from HOC
  stripe,
  logAmplitude,
}) => {
  const totalPrice = activePremiumCard?.usdPrice ?? 0
  const t = useTranslation()
  const currentUser = useSelector(currentUserSelector)
  const { applyPremiumRequest } = useAction({ applyPremiumRequest: applyPremium.request })
  const [errorMessage, setErrorMessage] = useState('')
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    applyPremiumRequest({
      params: {
        subscription_id: activePremiumCard.subscriptionId,
        type: PAYMENT_TYPES.STRIPE,
        email: currentUser.email,
      },
    })
      .then(response => camelizeKeys(response))
      .then(res => setSessionId(res?.data?.sessionId))
      .catch(() => setErrorMessage(t('competitive.premium.premiumModal.generalCardPaymentError')))
  }, [])

  const handlePayment = useCallback(() => {
    logAmplitude(AT__PREMIUM_PAY)
    stripe.redirectToCheckout({
      sessionId,
    })
      .then((result) => {
        if (result?.error?.message) {
          setErrorMessage(result.error.message)
        }
      })
  }, [sessionId, setErrorMessage, logAmplitude])

  return (
    <>
      <Button
        color={BUTTON_COLOR.GOLD}
        onClick={handlePayment}
        className={styles.button}
        disabled={!sessionId}
      >
        {t('competitive.premium.premiumModal.pay')}
      </Button>
      <Tip>
        {
          t('competitive.premium.modal.tip.termsWePlay', {
            terms_weplay: (
              <Link
                key="termsLink"
                to={termsLink}
              >
                {t('competitive.premium.modal.tip.termsOfService')}
              </Link>
            ),
          })
        }
      </Tip>
      <div className={styles.count}>
        <span className={styles.countText}>{t('competitive.premium.premiumModal.countTitle')}</span>
        <span className={styles.countText}>
          {`${formatPrizeWithDigit(totalPrice)}$`}
        </span>
      </div>
      <div className={styles.errors}>
        {errorMessage && (
          <Tip isError>
            {errorMessage}
          </Tip>
        )}
      </div>
    </>
  )
}

CheckoutForm.propTypes = {
  activePremiumCard: premiumCardPropType.isRequired,
  stripe: PropTypes.shape({
    redirectToCheckout: PropTypes.func.isRequired,
  }).isRequired,
  // props from HOC
  logAmplitude: PropTypes.func.isRequired,
}

export default withAnalytics(injectStripe(CheckoutForm))
