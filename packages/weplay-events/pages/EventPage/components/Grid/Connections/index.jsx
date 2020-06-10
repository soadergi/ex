import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// import {
//   NODE_WIDTH,
//   NODE_HEIGHT,
// } from '../logic/tree/constants'

import Connection from './Connection'
import styles from './styles.scss'

// const BORDER_RADIUS = 10
// const HALF_PIXEL = 0.5

const Connections = ({ size, nodes }) => (
  <svg
    className={styles.root}
    width={size.width}
    height={size.height}
    viewBox={`0 0 ${size.width} ${size.height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {nodes.map((node) => {
      const parent = nodes.find(n => n.id === node.parentId)

      if (parent?.hidden || node.hidden) {
        return null
      }

      return (
        <Fragment
          key={node.id}
        >
          {/* <rect */}
          {/*  x={node.pos[0] + HALF_PIXEL} */}
          {/*  y={node.pos[1] + HALF_PIXEL} */}
          {/*  width={NODE_WIDTH} */}
          {/*  height={NODE_HEIGHT} */}
          {/*  rx={BORDER_RADIUS} */}
          {/*  ry={BORDER_RADIUS} */}
          {/*  stroke="black" */}
          {/*  strokeWidth={1} */}
          {/*  fill="none" */}
          {/*  shapeRendering="crispEdges" */}
          {/* /> */}

          {!!parent && (
          <Connection
            childPos={node.pos}
            parentPos={parent.pos}
            mirrored={node.order < 0}
          />
          )}
        </Fragment>
      )
    })}
  </svg>
)

Connections.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }).isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    pos: PropTypes.arrayOf(PropTypes.number),
    parentId: PropTypes.string,
    side: PropTypes.string,
  })).isRequired,
}

export default Connections
