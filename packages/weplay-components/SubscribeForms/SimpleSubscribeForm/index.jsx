import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  ErrorMessage,
  Field,
  Form,
} from 'formik'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import Checkbox from 'weplay-components/Checkbox'
import Icon from 'weplay-components/Icon'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import { formNames, formClassNames } from '../consts'

import styles from './styles.scss'
import container from './container'

const mods = ['light']

const SimpleSubscribeForm = ({
  // required props
  // container props
  i18nTexts,
  subscribeFormRef,
  subscription,
  isEmailError,
  isValid,
  checkboxModifiers,
  modifiers,
  // optional props
}) => (
  <div
    className={styles.block}
    ref={subscribeFormRef}
  >
    <Form
      className={classNames(
        styles.form,
        setCSSModifiers(modifiers, styles),
        formClassNames.form,
      )}
    >
      <div
        className={classNames(
          styles.inputs,
          formClassNames.inputsWrap,
        )}
      >
        <div className={formClassNames.inputGroup}>
          <label
            htmlFor={formNames.email}
            className={styles.label}
          >
            {i18nTexts.root.subscriptionFormLabel}
          </label>

          <Field
            className={classNames(
              styles.input,
              { [styles.hasError]: isEmailError },
            )}
            name={formNames.email}
            id={formNames.email}
            placeholder={subscription.emailField.placeholder}
          />

          <span className={classNames(
            styles.message,
            { [styles.hasError]: isEmailError },
          )}
          >
            <ErrorMessage name={formNames.email} />
          </span>
        </div>
        <Field
          name={formNames.checkbox}
          component={Checkbox}
          className={formClassNames.checkbox}
          text={i18nTexts.subscribe.checkboxLabel}
          modifiers={checkboxModifiers}
        />
      </div>
      <div
        className={classNames(
          styles.submitBlock,
          formClassNames.blockSubmit,
        )}
      >
        <Button
          className={classNames(
            styles.submitBtn,
            formClassNames.submitBtn,
          )}
          type="submit"
          disabled={!isValid}
          color={BUTTON_COLOR.CTA}
        >
          <span
            className={classNames(
              styles.submitButtonText,
              formClassNames.submitText,
            )}
          >
            {subscription.submitButtonText}
          </span>

          <Icon
            className={classNames(
              styles.submitButtonIcon,
              formClassNames.submitIcon,
            )}
            iconName="check"
          />
        </Button>

        <div
          className={classNames(
            styles.successBlock,
            formClassNames.blockSuccess,
          )}
        >
          <p
            className={classNames(
              styles.successTitle,
              formClassNames.successTitle,
            )}
          >
            {subscription.successTitle}
          </p>
          <p
            className={classNames(
              styles.successDescription,
              formClassNames.successText,
            )}
          >
            {subscription.successText}
          </p>
        </div>
      </div>
    </Form>
  </div>
)

SimpleSubscribeForm.propTypes = {
  // required props
  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  subscription: PropTypes.shape({
    emailField: PropTypes.shape({
      placeholder: PropTypes.string,
    }),
    submitButtonText: PropTypes.string,
    successTitle: PropTypes.string,
    successText: PropTypes.string,
  }).isRequired,
  subscribeFormRef: PropTypes.func.isRequired,
  isEmailError: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  // optional props
  checkboxModifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  // optional props
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)),
}

SimpleSubscribeForm.defaultProps = {
  // optional props
  modifiers: [],
}

export default container(SimpleSubscribeForm)
