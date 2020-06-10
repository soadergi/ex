import React, { useMemo } from 'react'
import classNames from 'classnames'

import teamPropType from 'weplay-events/customPropTypes/teamPropType'
import Participant from 'weplay-events/components/Participant'

import { useTeamCard } from './container'
import styles from './styles.scss'
import TeamMembers from './TeamMembers'
import TeamCardToggle from './TeamCardToggle'

const participantModifiers = [
  'isDisableBorder',
  'isDisableBorderRadius',
  'isDisableOverflow',
]

const regionNames = {
  europe: 'Europe',
  china: 'China',
  southeastasia: 'South East Asia',
  cis: 'CIS',
  southamerica: 'South America',
  northamerica: 'North America',
}

const TeamCard = ({ team }) => {
  const {
    toggleExpanded,
    isExpanded,
  } = useTeamCard()

  const participant = useMemo(() => (
    team.tba ? {
      name: '',
      logoUrl: '',
      isInvited: false,
    } : {
      name: team.name,
      logoUrl: team.logoUrl,
      isInvited: team.isInvited,
    }
  ), [team])

  return (
    <div className={classNames(
      styles.block,
      { [styles.isExpanded]: isExpanded },
    )}
    >
      <div className={styles.header}>
        <Participant
          nickname={participant.name}
          pictureUrl={participant.logoUrl}
          modifiers={participantModifiers}
          hasNameWithStar={participant.isInvited}
        >
          {team.region && (
            <div className={styles.teamRegion}>{regionNames[team.region]}</div>
          )}
        </Participant>

        {!team.isTbd && !team.tba && (
          <div className={styles.info}>
            <TeamCardToggle
              handleClick={toggleExpanded}
              isExpanded={isExpanded}
            />
          </div>
        )}
      </div>

      {isExpanded && (
        <div className={styles.body}>
          <TeamMembers
            players={team.players}
            teamRegion={team.region}
          />
        </div>
      )}
    </div>
  )
}

TeamCard.propTypes = {
  team: teamPropType.isRequired,
}

export default TeamCard
