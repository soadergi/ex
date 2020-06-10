import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const ColumnistInfo = ({
  // required props
  className,
  // container props
  columnistLink,
  columnistName,
  columnistPosition,
  // optional props
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    <Link
      to={columnistLink}
      className={styles.link}
    >
      {columnistName}
      <span className={styles.position}>{columnistPosition}</span>
    </Link>

  </div>

)

ColumnistInfo.propTypes = {
  // required props
  // container props
  columnistLink: PropTypes.string.isRequired,
  columnistName: PropTypes.string.isRequired,
  // optional props
  columnistPosition: PropTypes.string,
  className: PropTypes.string,
}

ColumnistInfo.defaultProps = {
  // optional props
  columnistPosition: '',
  className: '',
}

export default container(ColumnistInfo)
