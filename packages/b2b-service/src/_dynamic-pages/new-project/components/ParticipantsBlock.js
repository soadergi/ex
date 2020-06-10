import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import TeamCard from 'weplay-events/pages/EventPage/components/TeamsList/TeamCard'
import { TBD_TEAM } from 'weplay-events/constants/tbdTeam'

import B2BSection from 'components/B2BSection/B2BSection'

import styles from '../../project/components/B2BTeamsList/styles.scss'

const ParticipantsBlock = ({ teams, participantsAmount }) => {
  const t = useTranslation()

  const tbdTeamsAmount = participantsAmount - teams.length

  const tbdTeams = new Array(tbdTeamsAmount)
    .fill(TBD_TEAM)
    .map((tbdTeam, index) => ({
      ...tbdTeam,
      id: index,
    }))

  const allTeams = [...teams, ...tbdTeams]

  return (
    <B2BSection title={t('projectPage.teamList.title')}>
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
    </B2BSection>
  )
}

export default React.memo(ParticipantsBlock)
