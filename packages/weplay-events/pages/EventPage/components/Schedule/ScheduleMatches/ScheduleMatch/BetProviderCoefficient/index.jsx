import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Link from 'weplay-components/Link'

import styles from './styles.scss'

const BetProviderPlayerCoefficient = ({
  gameUrl,
  coefficient,
  betProvider,
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
  gameUrl: PropTypes.string.isRequired,
  betProvider: PropTypes.string.isRequired,
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
