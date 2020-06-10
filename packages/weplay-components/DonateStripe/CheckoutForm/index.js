import * as Yup from 'yup'
import React, { useMemo, useState, useCallback } from 'react'
import { Field, Form, Formik } from 'formik'
import { injectStripe } from 'react-stripe-elements'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { nicknameMaxLength, nicknameMinLength } from 'weplay-core/consts/formsRestrictions'
import { $isEmpty } from 'weplay-core/$utils/$isEmpty'
import { camelizeKeys } from 'weplay-core/reduxs/helpers'
import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { axios } from 'weplay-core/services/axios'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { LOCAL_STORAGE_KEYS, DONATE_SUCCESS_VALUE } from 'weplay-core/consts/localStorageKeys'

import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import FieldComponent from 'weplay-components/Field/Field'
import Tip from 'weplay-components/Tip'
import TwitchDonateModal from 'weplay-components/TwitchDonateModal/TwitchDonateModal'

import styles from './styles.scss'

const ONE_DOLLAR_IN_COINS = 100

const howToLinks = {
  en: '/news/wesave-charity-play-faq-20897',
  ru: '/news/wesave-charity-play-chasto-zadavaemye-voprosy-20897',
}

const CheckoutForm = ({
  stripe,
  donateBtnText,
}) => {
  const t = useTranslation()
  const { locale } = useLocale()
  const globalScope = useSelector(globalScopeSelector)
  const currentUser = useSelector(currentUserSelector)
  const [errorMessage, setErrorMessage] = useState('')
  const [isTwitchDonateModalOpen, setIsTwitchDonateModalOpen] = useState(false)

  const howToLink = useMemo(
    () => howToLinks[locale],
    [locale, howToLinks],
  )

  const updateStorage = useCallback(
    (key, name) => globalScope.localStorage.setItem(key, name),
    [globalScope],
  )

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(nicknameMinLength, t('cabinet.nicknameTooShort', { min: nicknameMinLength }))
      .max(nicknameMaxLength, t('cabinet.nicknameTooLong', { max: nicknameMaxLength }))
      .required(t('clientErrors.required')),
    amount: Yup.number()
      .min(1, t('charity.donateStripe.error.minAmount'))
      .max(1000, t('charity.donateStripe.error.maxAmount'))
      .required(t('clientErrors.required')),
  })
  const initialValues = useMemo(() => ({
    name: currentUser?.nickname ?? '',
    amount: '',
  }), [currentUser])
  const handleSubmit = (values) => {
    axios.post('/wallet-service/v1/charity-transactions', {
      amount: values.amount * ONE_DOLLAR_IN_COINS, // Value in coins
      nickname: values.name,
    })
      .then(response => camelizeKeys(response))
      .then((res) => {
        updateStorage(LOCAL_STORAGE_KEYS.CHARITY_NICKNAME, values.name)
        updateStorage(LOCAL_STORAGE_KEYS.DONATE_SUCCESS, DONATE_SUCCESS_VALUE)
        stripe.redirectToCheckout({
          sessionId: res?.data?.sessionId,
        })
          .then((result) => {
            if (result?.error?.message) {
              setErrorMessage(result.error.message)
            }
          })
      })
      .catch(error => console.log('Error from post v1/charity-transactions', error))
  }

  if (!stripe) {
    return null
  }

  return (
    <div className={styles.block}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={values => handleSubmit(values)}
      >
        {({ errors, dirty }) => (
          <Form>
            <div>
              <Field
                type="text"
                name="name"
                placeholder={t('charity.donateStripe.placeholder.name')}
                label=""
                component={FieldComponent}
              />
              <div className={styles.field}>
                <div className={styles.inputSumm}>
                  <Field
                    type="number"
                    name="amount"
                    placeholder={t('charity.donateStripe.placeholder.amount')}
                    label=""
                    component={FieldComponent}
                  />
                </div>
                <Link
                  to={howToLink}
                  className={styles.tipLink}
                >
                  {t('charity.donateStripe.linkText')}
                </Link>
              </div>

            </div>
            <Button
              className={styles.button}
              type="submit"
              color={BUTTON_COLOR.DANGER}
              disabled={!$isEmpty(errors) || !dirty}
            >
              {donateBtnText}
            </Button>
            <div className={styles.errors}>
              {errorMessage && (
              <Tip isError>
                {errorMessage}
              </Tip>
              )}
            </div>

            <p className={styles.or}>{t('voting.condition.middle')}</p>

            <Button
              className={classNames(
                styles.button,
                styles.twitchButton,
              )}
              color={BUTTON_COLOR.TWITCH}
              onClick={() => setIsTwitchDonateModalOpen(true)}
            >
              <Icon
                size="small"
                iconName="twitch"
                className={styles.icon}
              />
              {t('events.eventPage.blocks.charityPlayBlock.twitchLink')}
            </Button>
          </Form>
        )}
      </Formik>

      {isTwitchDonateModalOpen && (
        <TwitchDonateModal
          handleClose={() => setIsTwitchDonateModalOpen(false)}
        />
      )}
    </div>
  )
}

CheckoutForm.propTypes = {
  stripe: PropTypes.shape({
    redirectToCheckout: PropTypes.func.isRequired,
  }).isRequired,
  donateBtnText: PropTypes.string.isRequired,
}

export default injectStripe(CheckoutForm)
