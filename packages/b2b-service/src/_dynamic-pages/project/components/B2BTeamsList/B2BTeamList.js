import React from 'react'
import classNames from 'classnames'

import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'
import TeamCard from 'weplay-events/pages/EventPage/components/TeamsList/TeamCard'
import { useTeamsList } from 'weplay-events/pages/EventPage/components/TeamsList/container'

import styles from './styles.scss'

const B2BTeamsList = () => {
  const tournamentId = useCurrentTournamentId()
  const allTeams = useTeamsList(tournamentId)

  return (
    <div className={classNames(styles.grid)}>
      {allTeams.map(team => (
        <div
          key={team.id}
          className={styles.gridItem}
        >
          <TeamCard team={team} />
        </div>
      ))}
    </div>
  )
}

export default B2BTeamsList
