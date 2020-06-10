import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

const TableRow = ({
  // required props
  children,
  // container props

  // optional props
  isDefault,
  className,
}) => (
  <tr
    className={classNames(
      styles.block,
      className,
      {
        [styles.isDefault]: isDefault,
      },
    )}
  >
    {children}
  </tr>
)

TableRow.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props

  // optional props
  isDefault: PropTypes.bool,
  className: PropTypes.string,
}

TableRow.defaultProps = {
  // optional props
  isDefault: false,
  className: '',
}

export default TableRow
