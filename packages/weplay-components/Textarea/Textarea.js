import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import classes from './Textarea.scss'

export const TextareaMarkup = ({
  // required props

  // container props
  className,

  // optional props
  ...props
}) => (
  <textarea
    className={classNames(className, classes.textarea)}
    {...props}
  />
)

TextareaMarkup.propTypes = {
  // required props

  // container props

  // optional props
  className: PropTypes.string,
}

TextareaMarkup.defaultProps = {
  // optional props
  className: '',
}

export default React.memo(TextareaMarkup)
