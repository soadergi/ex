import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import styles from './styles.scss'

const Table = ({
  content,
  // optional props
  isAdaptive,
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.adaptive]: isAdaptive,
      },
    )}
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

Table.propTypes = {
  content: PropTypes.string.isRequired,
  // optional props
  isAdaptive: PropTypes.bool,
}

Table.defaultProps = {
  // optional props
  isAdaptive: false,
}

export default React.memo(Table)
