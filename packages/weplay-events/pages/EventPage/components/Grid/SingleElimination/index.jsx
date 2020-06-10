import React from 'react'
import PropTypes from 'prop-types'

import { matchPropType, groupPropType } from 'weplay-events/customPropTypes'

import SingleEliminationTree from '../SingleEliminationTree'

import useSingleElimination from './container'

const SingleElimination = ({ matches, groups }) => {
  const {
    tree,
    nodes,
    group,
    areaSize,
  } = useSingleElimination(matches, groups)

  return (
    <SingleEliminationTree
      tree={tree}
      nodes={nodes}
      areaSize={areaSize}
      group={group}
    />
  )
}

SingleElimination.propTypes = {
  matches: PropTypes.arrayOf(matchPropType).isRequired,
  groups: PropTypes.arrayOf(groupPropType).isRequired,
}

SingleElimination.defaultProps = {
}

export default React.memo(SingleElimination)
