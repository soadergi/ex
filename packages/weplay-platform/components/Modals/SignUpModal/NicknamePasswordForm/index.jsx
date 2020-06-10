import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'formik'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import FieldWrapper from 'weplay-components/FieldWrapper'
import PasswordInput from 'weplay-components/PasswordInput'
import LegacyButton from 'weplay-components/LegacyButton'
import FormAutocompleteDisabler from 'weplay-components/FormAutocompleteDisabler'
import NicknameInputComponent from 'weplay-components/NicknameInput'

import container from './container'
import styles from './styles.scss'

const modifiers = ['blockWide']
const NicknamePasswordForm = ({
  touched,
  errors,
  isButtonEnabled,
  setFieldTouched,
  setFieldValue,
  setFieldError,
  setSubmitting,
  logFormAnalytics,
  logAnalyticsWithLabel,
}) => {
  const t = useTranslation()
  return (
    <div>
      <Form>
        <FormAutocompleteDisabler triggerName="nickname" />
        <NicknameInputComponent
          placeholder={t('mediaCore.registration.nicknamePlaceholder')}
          label={t('mediaCore.registration.nicknameLabel')}
          isTouched={touched.nickname}
          errors={errors.nickname}
          setFieldTouched={setFieldTouched}
          setFieldValue={setFieldValue}
          setFieldError={setFieldError}
          setSubmitting={setSubmitting}
          shouldValidateNickname
          logFormAnalytics={logFormAnalytics}
          logAnalyticsWithLabel={logAnalyticsWithLabel}
        />
        <FieldWrapper
          label={t('mediaCore.registration.passwordLabel')}
          isTouched={touched.password}
          errors={errors.password}
        >
          <PasswordInput
            placeholder={t('mediaCore.registration.passwordPlaceholder')}
            isTouched={touched.password}
            errors={errors.password}
            name="password"
            id="password"
            setFieldTouched={setFieldTouched}
            logFormAnalytics={logFormAnalytics}
          />
        </FieldWrapper>
        <div className={styles.signUpControls}>
          <LegacyButton
            type="submit"
            modifiers={modifiers}
            disabled={!isButtonEnabled}
          >
            {t('mediaCore.registration.regBtnFinish')}
          </LegacyButton>
        </div>
      </Form>
    </div>
  )
}

NicknamePasswordForm.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  touched: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  isButtonEnabled: PropTypes.bool.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldError: PropTypes.func.isRequired,
  setSubmitting: PropTypes.func.isRequired,
  logAnalyticsWithLabel: PropTypes.func.isRequired,
  logFormAnalytics: PropTypes.func.isRequired,
}

export default container(NicknamePasswordForm)
