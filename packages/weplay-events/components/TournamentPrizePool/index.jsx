import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'

import container from './container'

const TournamentPrizePool = ({
  prizeSum,
}) => (
  <Fragment>
    { `$${formatPrizeWithDigit(prizeSum)}` }
  </Fragment>
)

TournamentPrizePool.propTypes = {
  prizeSum: PropTypes.string.isRequired,
}

export default container(TournamentPrizePool)
