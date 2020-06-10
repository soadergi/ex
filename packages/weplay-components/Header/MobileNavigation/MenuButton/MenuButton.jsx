import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './MenuButton.scss'

const MenuButton = ({
  // required props
  onClick,
  isMenuOpened,
  // container props
  // optional props
}) => (
  <button
    type="button"
    aria-label="burger menu"
    onClick={onClick}
    className={styles.block}
  >
    <div className={classNames(
      styles.burger,
      {
        [styles.isMenuOpened]: isMenuOpened,
      },
    )}
    >
      <span className={styles.inner} />
    </div>
  </button>
)

MenuButton.propTypes = {
  // required props
  onClick: PropTypes.func.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
  // container props
  // optional props
}

MenuButton.defaultProps = {
  // optional props
}

export default React.memo(MenuButton)
