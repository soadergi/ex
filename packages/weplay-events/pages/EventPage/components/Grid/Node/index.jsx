import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

const Node = ({
  children, pos, className, width, height,
}) => (
  <div
    className={classNames(styles.root, className)}
    style={{
      top: `${pos[1]}px`,
      left: `${pos[0]}px`,
      ...width && { width: `${width}px` },
      ...height && { height: `${height}px` },
    }}
  >
    {children}
  </div>
)

Node.propTypes = {
  children: PropTypes.node,
  pos: PropTypes.arrayOf(PropTypes.number),
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
}

Node.defaultProps = {
  children: null,
  pos: [0, 0],
  width: null,
  height: null,
  className: '',
}

export default memo(Node)
