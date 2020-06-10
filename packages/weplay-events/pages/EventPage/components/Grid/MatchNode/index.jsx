import React from 'react'
import { matchPropType } from 'weplay-events/customPropTypes'
import Match from 'weplay-events/components/Match'

import { NODE_WIDTH, NODE_HEIGHT } from '../logic/tree/constants'
import Node from '../Node'

import styles from './styles.scss'

const MatchNode = ({
  match,
}) => {
  if (match.hidden) {
    return null
  }

  return (
    <Node
      className={styles.root}
      style={{
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
      }}
      pos={match.pos}
    >

      <Match
        matchId={match.id}
      />

    </Node>
  )
}

MatchNode.propTypes = {
  match: matchPropType.isRequired,
}

MatchNode.defaultProps = {
}

export default MatchNode
