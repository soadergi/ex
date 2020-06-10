import React from 'react'
import PropTypes from 'prop-types'

import { NODE_HEIGHT, NODE_WIDTH } from '../logic/tree/constants'

const RELATION_X_OFFSET = 16

const generatePath = (a, b, mirrored) => {
  let x1
  let x2
  let offset

  if (mirrored) {
    x1 = a[0] + NODE_WIDTH
    x2 = b[0]
    offset = -RELATION_X_OFFSET
  } else {
    x1 = a[0]
    x2 = b[0] + NODE_WIDTH
    offset = RELATION_X_OFFSET
  }

  const y1 = a[1] + NODE_HEIGHT / 2
  const y2 = b[1] + NODE_HEIGHT / 2

  return `
    M ${x1} ${y1}
    L ${x1 + (x2 - x1) + offset} ${y1}
    L ${x1 + (x2 - x1) + offset} ${y2}
    L ${x2} ${y2}
  `
}

const Connection = ({ parentPos, childPos, mirrored }) => (
  <path
    d={generatePath(childPos, parentPos, mirrored)}
    stroke="#e1e6f0"
    strokeWidth={1}
    fill="none"
    shapeRendering="crispEdges"
  />
)

Connection.propTypes = {
  parentPos: PropTypes.arrayOf(PropTypes.number).isRequired,
  childPos: PropTypes.arrayOf(PropTypes.number).isRequired,
  mirrored: PropTypes.bool,
}

Connection.defaultProps = {
  mirrored: false,
}

export default Connection
