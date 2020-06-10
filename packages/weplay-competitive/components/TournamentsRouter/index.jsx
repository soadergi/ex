import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import disciplinePropType from 'weplay-competitive/customPropTypes/disciplinePropType'

import TournamentGame from './TournamentGame'
import container from './container'
import styles from './styles.scss'

const TournamentsRouter = ({
  // required props

  // container props
  tournamentDisciplines,
  // optional props
  // params from HOCs
  discipline,
}) => (
  <nav
    className={classNames(
      styles.block,
    )}
  >
    {tournamentDisciplines.map(tournamentDiscipline => (
      <TournamentGame
        key={tournamentDiscipline.name}
        tournamentDiscipline={tournamentDiscipline}
        discipline={discipline}
      />
    ))}
  </nav>
)

TournamentsRouter.propTypes = {
  // required props
  // container props
  tournamentDisciplines: PropTypes.arrayOf(disciplinePropType).isRequired,
  // optional props
  // params from HOCs
  discipline: PropTypes.string.isRequired,
}

TournamentsRouter.defaultProps = {
  // optional props
}

export default container(TournamentsRouter)
