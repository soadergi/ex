import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import List from './List'
import container from './container'
import styles from './styles.scss'

const Schedule = ({
  // required props
  divisionIndex,
  name,
  games,
  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.divisions}>
      <span className={styles.title}>{name}</span>
    </div>

    <div className={styles.listWrap}>
      {games.map(game => (
        <List
          key={R.keys(game)[0]}
          divisionIndex={divisionIndex}
          game={game}
        />
      ))}
    </div>
  </div>

)

Schedule.propTypes = {
  // required props
  divisionIndex: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  games: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,

  // container props

  // optional props
}

Schedule.defaultProps = {
  // optional props
}

export default container(Schedule)
