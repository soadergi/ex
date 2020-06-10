import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import { mods } from '../mods'

import container from './container'
import styles from './styles.scss'

const OrderedList = ({
  // required props
  list,

  // container props

  // optional props
  modifiers,
}) => (
  <ol className={
    classNames(
      styles.block,
      setCSSModifiers(modifiers, styles),
    )}
  >
    {list.map(item => (
      <li
        key={item}
        className={styles.item}
      >
        <span className={styles.text}>{item}</span>
      </li>
    ))}
  </ol>
)

OrderedList.propTypes = {
  // required props
  list: PropTypes.arrayOf(PropTypes.string).isRequired,

  // container props

  // optional props
  modifiers: PropTypes.arrayOf(
    PropTypes.oneOf(
      mods.map(mod => mod),
    ),
  ),
}

OrderedList.defaultProps = {
  modifiers: [],
}

export default container(OrderedList)
