import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'

import container from './container'

const GroupTournamentPrizePool = ({
  groupStageSum,
}) => (
  <Fragment>
    { `$${formatPrizeWithDigit(groupStageSum)}` }
  </Fragment>
)

GroupTournamentPrizePool.propTypes = {
  groupStageSum: PropTypes.number.isRequired,
}

export default container(GroupTournamentPrizePool)
