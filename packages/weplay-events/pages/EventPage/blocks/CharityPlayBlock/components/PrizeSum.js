import React from 'react'
import PropTypes from 'prop-types'

import { formatPrizeSumWithComaAndCurrency } from '../helpers'

const PrizeSum = ({ value, className, children }) => (
  <p className={className}>
    {`${formatPrizeSumWithComaAndCurrency(value)}`}
    {children}
  </p>
)

PrizeSum.propTypes = {
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
}

PrizeSum.defaultProps = {
  className: '',
  children: null,
}

export default React.memo(PrizeSum)
