import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import Icon from '../Icon'

import styles from './styles.scss'
import container from './container'

export const mods = [
  'white',
  'bordered',
  'textMedium',
  'subscribeForm',
  'colorBlack',
  'colorGrey',
  'noMargin',
]

export const Checkbox = ({
  // required props
  // container props
  // optional props
  className,
  modifiers,
  children,
  text,
  value,
  /* this FIELD object need for the Formik if we want to use Custom input component
  (https://jaredpalmer.com/formik/docs/api/field) */
  field,
  handleChange,
  ...restProps
}) => (
  <label
    className={classNames(
      styles.block,
      className,
      setCSSModifiers(modifiers, styles),
    )}
  >
    <input
      type="checkbox"
      className={styles.input}
      checked={value}
      onChange={handleChange}
      {...field}
      {...restProps}
    />
    <span className={styles.wrapper}>
      <Icon
        className={styles.icon}
        iconName="check"
      />
    </span>
    {text
      ? <span className={styles.text}>{text}</span>
      : children}
  </label>
)

Checkbox.propTypes = {
  // required props
  // container props
  // optional props
  className: PropTypes.string,
  modifiers: PropTypes.arrayOf(
    PropTypes.oneOf(mods),
  ),
  children: PropTypes.node,
  text: PropTypes.string,
  value: PropTypes.bool,
  field: PropTypes.shape({}),
  handleChange: PropTypes.func,
}

Checkbox.defaultProps = {
  // optional props
  className: '',
  modifiers: [],
  children: null,
  text: '',
  value: null,
  field: {},
  handleChange: R.always,
}

export default container(Checkbox)
