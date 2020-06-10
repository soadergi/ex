import React from 'react'
import PropTypes from 'prop-types'

import container from './container'
import styles from './styles.scss'

const PossibleNicknames = ({
  // required props
  possibleNicknames,
  onClick,
  possibleText,
  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <span className={styles.text}>
      {possibleText}
    </span>
    {possibleNicknames.map(nickname => (
      <button
        type="button"
        onClick={onClick(nickname.nickname)}
        key={nickname.nickname}
        className={styles.button}
      >
        {nickname.nickname}
      </button>
    ))}
  </div>
)

PossibleNicknames.propTypes = {
  // required props
  possibleNicknames: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onClick: PropTypes.func.isRequired,
  possibleText: PropTypes.string.isRequired,
  // container props

  // optional props
}

PossibleNicknames.defaultProps = {
  // optional props
}

export default container(PossibleNicknames)
