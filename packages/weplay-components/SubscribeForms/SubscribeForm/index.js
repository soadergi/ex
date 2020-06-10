import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  ErrorMessage,
  Field,
  Form,
} from 'formik'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import Checkbox from 'weplay-components/Checkbox'
import BackgroundImg from 'weplay-components/BackgroundImg'
import Icon from 'weplay-components/Icon'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import { formNames, formClassNames } from '../consts'

import styles from './styles.scss'
import container from './container'

const mods = [
  'hasSuccess',
  'hasBackground',
  'hasOverlay',
  'media',
  'content',
  'promo',
  'vertical',
  'lightTheme',
  'shadowNone',
]

const SubscribeForm = ({
  // required props
  wrapperClass,
  // container props
  subscribeFormRef,
  subscription,
  isEmailError,
  isValid,
  checkboxModifiers,
  backgroundImage,
  textColor,
  // optional props
  Wrapper,
  modifiers,
  withBackground,
}) => (
  <Wrapper className={wrapperClass}>
    <div
      className={classNames(
        styles.block,
        setCSSModifiers(modifiers, styles),
        styles[textColor],
      )}
      ref={subscribeFormRef}
      data-qa-id={dataQaIds.components.subscriptionForm}
    >
      {withBackground && (
        <BackgroundImg src={backgroundImage} />
      )}
      <div className={styles.contentBlock}>
        <p className={styles.title}>
          {subscription.formTitle}
        </p>

        <p className={styles.description}>
          {subscription.formDescription}
        </p>
      </div>

      <Form
        className={classNames(
          styles.form,
          formClassNames.form,
        )}
      >
        <div
          className={classNames(
            styles.inputs,
            formClassNames.inputsWrap,
          )}
        >
          <div
            className={classNames(
              styles.inputGroup,
              formClassNames.inputGroup,
            )}
          >
            <Field
              className={classNames(
                styles.input,
                { [styles.hasError]: isEmailError },
              )}
              name={formNames.email}
              placeholder={subscription.emailField.placeholder}
            />

            <span className={classNames(
              styles.message,
              { [styles.hasError]: isEmailError },
            )}
            >
              <ErrorMessage
                name={formNames.email}
              />
            </span>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.checkbox}>
              <Field
                name={formNames.checkbox}
                className={formClassNames.checkbox}
                component={Checkbox}
                text={subscription.conditionText}
                modifiers={checkboxModifiers}
              />
            </div>
          </div>
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
            color={BUTTON_COLOR.CTA}
            type="submit"
            disabled={!isValid}
          >
            <span
              className={classNames(
                styles.submitText,
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
  </Wrapper>
)

SubscribeForm.propTypes = {
  // required props
  wrapperClass: PropTypes.string.isRequired,
  // container props
  subscribeFormRef: PropTypes.func.isRequired,
  subscription: PropTypes.shape({
    emailField: PropTypes.shape({
      placeholder: PropTypes.string.isRequired,
    }).isRequired,
    formTitle: PropTypes.string.isRequired,
    formDescription: PropTypes.string.isRequired,
    submitButtonText: PropTypes.string.isRequired,
    successTitle: PropTypes.string.isRequired,
    successText: PropTypes.string.isRequired,
    conditionText: PropTypes.string.isRequired,
  }).isRequired,
  isEmailError: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  backgroundImage: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  // optional props
  Wrapper: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape,
    PropTypes.func,
  ]).isRequired,
  checkboxModifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  modifiers: PropTypes.arrayOf(
    PropTypes.oneOf(mods),
  ),
  withBackground: PropTypes.bool.isRequired,
}

SubscribeForm.defaultProps = {
  // optional props
  modifiers: [],
}

export default container(SubscribeForm)
