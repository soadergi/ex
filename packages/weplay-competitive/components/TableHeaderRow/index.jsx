import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'

const TableHeaderRow = ({
  // required props

  // container props

  // optional props
  children,
  isDefault,
  className,
}) => (
  <thead>
    <tr className={classNames(
      styles.block,
      className,
      {
        [styles.isDefault]: isDefault,
      },
    )}
    >
      {children}
    </tr>
  </thead>
)

TableHeaderRow.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props

  // optional props
  isDefault: PropTypes.bool,
  className: PropTypes.string,
}

TableHeaderRow.defaultProps = {
  // optional props
  isDefault: false,
  className: '',
}

export default TableHeaderRow
