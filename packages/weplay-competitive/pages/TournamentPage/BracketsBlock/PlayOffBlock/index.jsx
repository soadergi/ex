import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import TMPlayOff from 'weplay-competitive/components/TMPlayOff'

import styles from './styles.scss'

const PlayOffBlock = ({
  // required props
  isTournamentFinished,
  handleHeaderPosition,
  getRoundStatus,
  // container props
  tournamentNodes,
  // optional props
  isCollapsed,

}) => !R.isEmpty(tournamentNodes) && (
  <div className={styles.grid}>
    <TMPlayOff
      rounds={tournamentNodes}
      isTournamentFinished={isTournamentFinished}
      isCollapsed={isCollapsed}
      handleHeaderPosition={handleHeaderPosition}
      getRoundStatus={getRoundStatus}
    />
  </div>
)

PlayOffBlock.propTypes = {
  // required props

  // container props
  isTournamentFinished: PropTypes.bool.isRequired,
  tournamentNodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  getRoundStatus: PropTypes.func.isRequired,
  // optional props
  isCollapsed: PropTypes.bool,
  handleHeaderPosition: PropTypes.func.isRequired,
}

PlayOffBlock.defaultProps = {
  // optional props
  isCollapsed: false,
}

export default PlayOffBlock
