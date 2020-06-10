import React from 'react'
import PropTypes from 'prop-types'
import {
  Form,
} from 'formik'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import FormInputGroup from 'weplay-components/FormInputGroup'
import Checkbox from 'weplay-components/Checkbox'
import ModalControls from 'weplay-components/_modal-components/ModalControls'

import styles from './styles.scss'
import container from './container'

const bordered = ['bordered']

const EmailInputForm = ({
  touched,
  errors,
  setFieldTouched,
  isButtonEnabled,
  children,
  isCheckboxChecked,
  toggleCheckbox,
  isCheckboxVisible,
}) => {
  const t = useTranslation()

  return (
    <div className="step-one">
      <Form>
        <div className={styles.input}>
          <FormInputGroup
            name="email"
            label={t('mediaCore.modals.registration.emailLabel')}
            isTouched={touched.email}
            errors={errors.email}
            labelFor="email"
            id="email"
            setFieldTouched={setFieldTouched}
            placeholder={t('mediaCore.modals.registration.emailPlaceholder')}
          />
        </div>
        {isCheckboxVisible && (
        <div className="u-text-left u-mb-3">
          <Checkbox
            modifiers={bordered}
            onChange={toggleCheckbox}
            value={isCheckboxChecked}
          >
            <span className={styles.checkboxText}>{t('mediaCore.modals.registration.registrationAgree')}</span>
          </Checkbox>
        </div>
        )}
        <ModalControls
          primaryButtonType="submit"
          primaryButtonText={t('mediaCore.modals.registration.sendEmail')}
          primaryButtonDisabled={!isButtonEnabled}
        />
      </Form>
      {children}
    </div>
  )
}

EmailInputForm.propTypes = {
  children: PropTypes.node,
  isCheckboxVisible: PropTypes.bool,
  setFieldTouched: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.arrayOf(PropTypes.string),
  }),
  touched: PropTypes.shape({
    email: PropTypes.bool,
  }),
  isButtonEnabled: PropTypes.bool.isRequired,
  isCheckboxChecked: PropTypes.bool,
  toggleCheckbox: PropTypes.func.isRequired,
}

EmailInputForm.defaultProps = {
  children: null,
  isCheckboxVisible: false,
  errors: null,
  touched: null,
  isCheckboxChecked: false,
}

export default container(EmailInputForm)
