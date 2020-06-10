import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'

const Rules = ({
  // required props
  prizeListRules,

  // props from container

  // optional props
  tournamentTitle,
}) => (
  <ul className={classNames(
    styles.list,
    styles[tournamentTitle],
  )}
  >
    {prizeListRules.map(rule => (
      <li
        key={rule}
        className={classNames(
          styles.member,
          styles[tournamentTitle],
        )}
      >
        <span>{rule}</span>
      </li>
    ))}
  </ul>
)

Rules.propTypes = {
  // required props
  prizeListRules: PropTypes.arrayOf(PropTypes.string).isRequired,

  // props from container

  // optional props
  tournamentTitle: PropTypes.string,
}

Rules.defaultProps = {
  tournamentTitle: '',
}

export default container(Rules)
