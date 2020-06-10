import React from 'react'
import PropTypes from 'prop-types'

import { GRID_TYPES } from '../constants'

import Connection from './Connection'
import styles from './bracketConnections.scss'

const BracketConnections = ({
  areaSize, rootPos, lowerRootPos, upperRootPos, gridType,
}) => (
  <svg
    className={styles.root}
    width={areaSize.width}
    height={areaSize.height}
    viewBox={`0 0 ${areaSize.width} ${areaSize.height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <Connection
      childPos={upperRootPos}
      parentPos={rootPos}
      mirrored={gridType === GRID_TYPES.DOUBLE_ELIMINATION}
    />
    <Connection
      childPos={lowerRootPos}
      parentPos={rootPos}
      mirrored={gridType === GRID_TYPES.BUTTERFLY || gridType === GRID_TYPES.DOUBLE_ELIMINATION}
    />
  </svg>
)

BracketConnections.propTypes = {
  areaSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  gridType: PropTypes.string,
  rootPos: PropTypes.arrayOf(PropTypes.number).isRequired,
  lowerRootPos: PropTypes.arrayOf(PropTypes.number).isRequired,
  upperRootPos: PropTypes.arrayOf(PropTypes.number).isRequired,
}

BracketConnections.defaultProps = {
  gridType: '',
}

export default BracketConnections
