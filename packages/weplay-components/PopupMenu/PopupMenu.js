import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const PopupMenu = ({
  // required props
  items,
  isOpen,
  // container props
  // optional props
  handleClick,
  footer,
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.isOpen]: isOpen,
      },
    )}
  >
    <ul className={styles.list}>
      {items.map(item => (
        <li
          className={styles.item}
          key={item.text}
        >
          <Link
            className={styles.link}
            to={item.url}
            onClick={handleClick}
            isExternal={item.isExternal}
            target={item.isExternal ? '_blank' : ''}
          >
            {item.text}
          </Link>
        </li>
      ))}
    </ul>

    {footer}
  </div>

)

PopupMenu.propTypes = {
  // required props
  isOpen: PropTypes.bool.isRequired,
  // container props
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleClick: PropTypes.func,
  // optional props
  footer: PropTypes.node,
}

PopupMenu.defaultProps = {
  // optional props
  handleClick: R.always,
  footer: null,
}

export default container(PopupMenu)
