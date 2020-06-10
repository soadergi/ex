import React from 'react'
import PropTypes from 'prop-types'

import BetProviderLogo from '../../../../BetProviderLogo'
import BetProviderPlayerCoefficient from '../../../../BetProviderPlayerCoefficient'

import styles from './styles.scss'
import container from './container'

const BetProviderLinks = ({
  // required props

  // optional props
  gameUrl,
  coefficientForA,
  coefficientForB,
  modifiers,
}) => (
  <div className={styles.links}>
    <div className={styles.linksItem}>
      {coefficientForA && (
        <BetProviderPlayerCoefficient
          coefficient={coefficientForA}
          className={styles.rate}
          gameUrl={gameUrl}
          modifiers={modifiers}
        />
      )}
    </div>

    <div className={styles.linksItem}>
      <BetProviderLogo
        className={styles.logo}
      />
    </div>

    <div className={styles.linksItem}>
      {coefficientForB && (
        <BetProviderPlayerCoefficient
          coefficient={coefficientForB}
          className={styles.rate}
          gameUrl={gameUrl}
          modifiers={modifiers}
        />
      )}
    </div>
  </div>
)

BetProviderLinks.propTypes = {
  // required props

  // optional props
  gameUrl: PropTypes.string,
  coefficientForA: PropTypes.number,
  coefficientForB: PropTypes.number,
  modifiers: PropTypes.arrayOf(PropTypes.string),
}

BetProviderLinks.defaultProps = {
  coefficientForA: null,
  coefficientForB: null,
  gameUrl: '',
  modifiers: [],
}

export default container(BetProviderLinks)
