import React from 'react'
import PropTypes from 'prop-types'
import teamPropType from 'weplay-events/customPropTypes/teamPropType'
import Participant from 'weplay-events/components/Participant'
import classNames from 'classnames'

import container from './container'
import styles from './styles.scss'
import TeamMembers from './TeamMembers'
import TeamMembersPreviewsList from './TeamMembersPreviewsList'
import TeamCardToggle from './TeamCardToggle'

const participantModifiers = ['inverted']

const TeamCard = ({
  // required props
  team,
  isExpanded,
  toggleExpanded,
  isCaptainWithRole,

  // props from container
  isTeamCardToggleVisible,
  isTeamCardToggleVisibleInParticipant,
  sortedTeamPlayers,

  // optional props
  tournamentTitle,
}) => (
  <div className={classNames(
    styles.block,
    { [styles.isExpanded]: isExpanded },
  )}
  >
    <div
      className={styles.header}
      data-event-position={team.nickname}
    >
      <Participant
        nickname={team.nickname}
        pictureUrl={team.picture}
        isInvited={team.inviteStatus}
        modifiers={participantModifiers}
        tournamentTitle={tournamentTitle}
      >
        {isTeamCardToggleVisibleInParticipant && (
          <TeamCardToggle
            handleClick={toggleExpanded}
            isExpanded={isExpanded}
          />
        )}
      </Participant>

      <div className={styles.info}>
        <TeamMembersPreviewsList
          sortedPlayers={sortedTeamPlayers}
          isHidden={isExpanded}
        />

        {isTeamCardToggleVisible && (
          <TeamCardToggle
            handleClick={toggleExpanded}
            isExpanded={isExpanded}
          />
        )}
      </div>
    </div>

    {isExpanded && (
      <div className={styles.body}>
        <TeamMembers
          sortedPlayers={sortedTeamPlayers}
          isCaptainWithRole={isCaptainWithRole}
        />
      </div>
    )}
  </div>
)

TeamCard.propTypes = {
  // required props
  team: teamPropType.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  isCaptainWithRole: PropTypes.bool.isRequired,

  // container props
  isTeamCardToggleVisible: PropTypes.bool,
  isTeamCardToggleVisibleInParticipant: PropTypes.bool,
  isExpanded: PropTypes.bool,
  sortedTeamPlayers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // optional props
  tournamentTitle: PropTypes.string,
}

TeamCard.defaultProps = {
  isExpanded: false,
  isTeamCardToggleVisible: false,
  isTeamCardToggleVisibleInParticipant: false,
  tournamentTitle: '',
}

export default container(TeamCard)
