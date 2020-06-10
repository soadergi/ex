import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import styles from './GridTile.scss'

const GridTile = ({
  children,
  direction,
}) => (
  <div className={classNames(
    styles.block,
    styles[direction],
  )}
  >
    {children}
  </div>

)

GridTile.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
}

GridTile.defaultProps = {
  // optional props
  direction: '',
}

export default React.memo(GridTile)
