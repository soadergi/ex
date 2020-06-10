import React from 'react'
import PropTypes from 'prop-types'

import { matchPropType, roundPropType } from 'weplay-events/customPropTypes'
import Match from 'weplay-events/components/Match'
import MetaInformation from 'weplay-events/components/Match/MetaInformation'

import { NODE_HEIGHT, NODE_WIDTH } from '../logic/tree/constants'

import styles from './styles.scss'

const RootMatchNode = ({
  match, className, style, pos, round,
}) => (
  <div
    className={className}
    style={style}
  >
    <MetaInformation
      round={round}
    />
    <div
      className={styles.match}
      style={{
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        top: `${pos[1]}px`,
      }}
    >
      <Match
        matchId={match.id}
      />
    </div>
  </div>
)

RootMatchNode.propTypes = {
  match: matchPropType.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  pos: PropTypes.arrayOf(PropTypes.number).isRequired,
  round: roundPropType.isRequired,
}

RootMatchNode.defaultProps = {
  className: '',
  style: {},
}

export default React.memo(RootMatchNode)
