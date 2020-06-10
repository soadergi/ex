import React from 'react'
// import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

export const ExampleComponentMarkup = ({
  // required props

  // container props

  // optional props
}) => (
  <div
    className={classNames(
      styles.example, // TODO: !important - please, don't forget to remove/rename this `className`
    )}
  >

    ONLY COPY AND PASTE MOTHERFUCKER!
  </div>
)

ExampleComponentMarkup.propTypes = {
  // required props

  // container props

  // optional props
}

ExampleComponentMarkup.defaultProps = {
  // optional props
}

export default React.memo(ExampleComponentMarkup)
