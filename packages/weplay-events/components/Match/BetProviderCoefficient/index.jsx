import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'weplay-components/Link'

import styles from './styles.scss'

const BetProviderPlayerCoefficient = ({
  // required props
  gameUrl,
  coefficient,

  // props from container
  betProvider,

  // optional props
  className,
  beter,
}) => (
  <Link
    to={gameUrl}
    className={classNames(
      styles.coefficient,
      styles[betProvider],
      styles[beter],
      className,
    )}
    isExternal
  >
    {coefficient}
  </Link>
)

BetProviderPlayerCoefficient.propTypes = {
  // required props
  gameUrl: PropTypes.string.isRequired,

  // props from container
  betProvider: PropTypes.string.isRequired,

  // optional props
  className: PropTypes.string,
  coefficient: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  beter: PropTypes.string,
}

BetProviderPlayerCoefficient.defaultProps = {
  className: '',
  coefficient: null,
  beter: '',
}

export default BetProviderPlayerCoefficient
