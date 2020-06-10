import React from 'react'
import PropTypes from 'prop-types'
import TournamentCard from 'weplay-competitive/components/TournamentsListing/TournamentCard'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'

import styles from './styles.scss'

const modifiers = 'featured'

const FeaturedTournaments = ({
  // required props
  featuredTournaments,
  // props from container
  // optional props
}) => (
  <table className={styles.block}>
    <tbody className={styles.grid}>
      {featuredTournaments.map(featuredTournament => (
        <TournamentCard
          key={featuredTournament.id}
          modifiers={modifiers}
          tournament={featuredTournament}
        />
      ))}
    </tbody>
  </table>
)

FeaturedTournaments.propTypes = {
  // required props
  featuredTournaments: PropTypes.arrayOf(tournamentPropType).isRequired,
  // props from container
  // optional props
}

FeaturedTournaments.defaultProps = {
  // optional props
}

export default FeaturedTournaments
