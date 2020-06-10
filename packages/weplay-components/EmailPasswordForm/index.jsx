import React from 'react'
import * as PropTypes from 'prop-types'
import {
  Form,
} from 'formik'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import FieldWrapper from 'weplay-components/FieldWrapper'
import FormInputGroup from 'weplay-components/FormInputGroup'
import PasswordInput from 'weplay-components/PasswordInput'
import ModalControls from 'weplay-components/_modal-components/ModalControls'

import container from './container'

const EmailPasswordForm = ({
  t,
  errors,
  touched,
  setFieldTouched,
  isButtonEnabled,
  isEmailDisabled,
  submitButtonText,
  children,
}) => (
  <>
    <div className="step-one">
      <Form>
        <FormInputGroup
          name="email"
          label={t('registration.emailLabel')}
          isTouched={touched.email}
          errors={errors.email}
          labelFor="email"
          type="email"
          setFieldTouched={setFieldTouched}
          placeholder={t('registration.emailPlaceholder')}
          disabled={isEmailDisabled}
        />
        <FieldWrapper
          label={t('registration.passwordLabel')}
          isTouched={touched.password}
          errors={errors.password}
          labelFor="confirmPass"
        >
          <PasswordInput
            name="password"
            placeholder={t('registration.passwordLogInPlaceholder')}
            errors={errors.password}
            isTouched={touched.password}
            id="password"
            setFieldTouched={setFieldTouched}
          />
        </FieldWrapper>
        {children}
        <ModalControls
          primaryButtonType="submit"
          primaryButtonText={submitButtonText}
          primaryButtonDisabled={!isButtonEnabled}
          data-qa-id={dataQaIds.modals.components.emailPasswordForm.btnSubmit}
        />
      </Form>
    </div>
  </>
)

EmailPasswordForm.propTypes = {
  t: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.array,
    password: PropTypes.array,
  }),
  touched: PropTypes.shape({
    email: PropTypes.bool,
    password: PropTypes.bool,
  }),
  setFieldTouched: PropTypes.func.isRequired,
  isButtonEnabled: PropTypes.bool.isRequired,
  isEmailDisabled: PropTypes.bool,
  submitButtonText: PropTypes.string.isRequired,
  children: PropTypes.node,
}

EmailPasswordForm.defaultProps = {
  errors: null,
  touched: null,
  isEmailDisabled: false,
  children: null,
}

export default container(EmailPasswordForm)
