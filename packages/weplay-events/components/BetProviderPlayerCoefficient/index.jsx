import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import styles from './styles.scss'
import container from './container'

const BetProviderPlayerCoefficient = ({
  // required props
  gameUrl,
  coefficient,
  logWinterMadnessSponsorAction,

  // props from container
  betProvider,

  // optional props
  className,
  modifiers,
}) => (
  <a
    href={gameUrl}
    target="_blank"
    rel="noreferrer noopener"
    className={classNames(
      styles.coefficient,
      styles[betProvider],
      className,
      setCSSModifiers(modifiers, styles),
    )}
    onClick={logWinterMadnessSponsorAction}
  >
    {coefficient}
  </a>
)

BetProviderPlayerCoefficient.propTypes = {
  // required props
  gameUrl: PropTypes.string.isRequired,
  logWinterMadnessSponsorAction: PropTypes.func.isRequired,

  // props from container
  betProvider: PropTypes.string.isRequired,

  // optional props
  className: PropTypes.string,
  coefficient: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  modifiers: PropTypes.arrayOf(PropTypes.string),
}

BetProviderPlayerCoefficient.defaultProps = {
  className: '',
  coefficient: null,
  modifiers: [],
}

export default container(BetProviderPlayerCoefficient)
