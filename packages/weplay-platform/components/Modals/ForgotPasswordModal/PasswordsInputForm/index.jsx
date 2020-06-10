import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'formik'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import FieldWrapper from 'weplay-components/FieldWrapper'
import PasswordInput from 'weplay-components/PasswordInput'
import ModalControls from 'weplay-components/_modal-components/ModalControls'

import container from './container'

const modifiers = ['blockWide']
const PasswordsInputForm = ({
  authErrorMessage,
  touched,
  errors,
  setFieldTouched,
  isButtonEnabled,
}) => {
  const t = useTranslation()
  return (
    <>
      {authErrorMessage === 'Code expired'
          && <p className="o-text-error">{t('mediaCore.serverErrors.codeExpired')}</p>}
      <Form>
        <div className="u-mb-1">
          <FieldWrapper
            label={t('mediaCore.modals.cabinet.password')}
            isTouched={touched.password}
            errors={errors.password}
          >
            <PasswordInput
              name="password"
              placeholder={t('mediaCore.modals.cabinet.passwordPlaceholder')}
              errors={errors.password}
              isTouched={touched.password}
              setFieldTouched={setFieldTouched}
            />
          </FieldWrapper>
          <FieldWrapper
            label={t('mediaCore.modals.cabinet.confirmation')}
            isTouched={touched.confirmPassword}
            errors={errors.confirmPassword}
            labelFor="confirmPassword"
          >
            <PasswordInput
              name="confirmPassword"
              placeholder={t('mediaCore.modals.cabinet.confirmationNew')}
              errors={errors.confirmPassword}
              isTouched={touched.confirmPassword}
              id="confirmPass"
              setFieldTouched={setFieldTouched}
            />
          </FieldWrapper>
        </div>
        <ModalControls
          primaryButtonType="submit"
          primaryButtonDisabled={!isButtonEnabled}
          primaryButtonModifiers={modifiers}
          primaryButtonText={t('mediaCore.modals.registration.deal')}
        />
      </Form>
    </>
  )
}

PasswordsInputForm.propTypes = {
  authErrorMessage: PropTypes.string,
  touched: PropTypes.shape({
    password: PropTypes.bool,
    confirmPassword: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
    password: PropTypes.arrayOf(PropTypes.string),
    confirmPassword: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  isButtonEnabled: PropTypes.bool.isRequired,
}

PasswordsInputForm.defaultProps = {
  authErrorMessage: null,
}

export default container(PasswordsInputForm)
