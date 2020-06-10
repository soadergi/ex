import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'

const Item = ({
  // required props
  itemIndex,
  time,

  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <span className={styles.itemCount}>
      {itemIndex}
    </span>

    <span className={styles.time}>
      {`${time} CEST`}
    </span>
  </div>
)

Item.propTypes = {
  // required props
  itemIndex: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,

  // container props

  // optional props
}

Item.defaultProps = {
  // optional props
}

export default container(Item)
