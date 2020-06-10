import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { matchPropType, groupPropType } from 'weplay-events/customPropTypes'

import MatchNode from '../MatchNode'
import Connections from '../Connections'
import Bracket from '../Bracket'

import { useSingleEliminationTree } from './container'
import styles from './styles.scss'

const SingleEliminationTree = ({
  tree,
  nodes,
  group,
  areaSize,
  className,
}) => {
  const { rounds } = useSingleEliminationTree(tree, group)

  return (
    <div
      className={classNames(styles.root, className)}
      style={{
        width: `${areaSize.width}px`,
        height: `${areaSize.height}px`,
      }}
    >
      <Connections
        nodes={nodes}
        size={areaSize}
      />

      <Bracket rounds={rounds} />

      {nodes.map(match => (
        <MatchNode
          key={match.id}
          match={match}
        />
      ))}
    </div>
  )
}

SingleEliminationTree.propTypes = {
  areaSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  nodes: PropTypes.arrayOf(matchPropType).isRequired,
  tree: PropTypes.shape({}).isRequired,
  group: groupPropType.isRequired,
  className: PropTypes.string,
}

SingleEliminationTree.defaultProps = {
  className: '',
}

export default React.memo(SingleEliminationTree)
