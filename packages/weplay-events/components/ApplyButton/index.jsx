import React from 'react'
import PropTypes from 'prop-types'

import container from './container'

const ApplyButton = ({
  // required props
  handleApply,
  isApplied,
  ButtonComponent,
  SuccessComponent,

  // container props

  // optional props
}) => (isApplied
  ? <SuccessComponent />
  : <ButtonComponent onClick={handleApply} />)

ApplyButton.propTypes = {
  // required props
  ButtonComponent: PropTypes.func.isRequired,
  SuccessComponent: PropTypes.func.isRequired,
  handleApply: PropTypes.func.isRequired,
  // container props
  isApplied: PropTypes.bool.isRequired,

  // optional props
}

ApplyButton.defaultProps = {
  // optional props
}

export default container(ApplyButton)
