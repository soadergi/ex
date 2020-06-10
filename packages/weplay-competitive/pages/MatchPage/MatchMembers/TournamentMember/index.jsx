import React from 'react'
import PropTypes from 'prop-types'
import tournamentMemberPropType from 'weplay-competitive/customPropTypes/tournamentMemberPropType'
import classNames from 'classnames'
import Member from 'weplay-competitive/pages/MatchPage/MatchMembers/TournamentMember/Member'

import container from './container'
import styles from './styles.scss'

const TournamentMember = ({
  // required props

  // container props
  isActive,
  tournamentMember,

  // optional props
  className,
}) => (
  <div
    className={classNames(
      styles.item,
      className,
    )}
    data-event-amplitude-source="Lobby"
  >
    <Member
      isActive={isActive}
      memberId={tournamentMember.relationships.member.id}
      tournamentMemberRole={tournamentMember.role}
    />
  </div>
)

TournamentMember.propTypes = {
  // required props

  // container props
  isActive: PropTypes.bool.isRequired,
  tournamentMember: tournamentMemberPropType.isRequired,

  // optional props
  className: PropTypes.string,
}

TournamentMember.defaultProps = {
  // optional props
  className: '',
}

export default container(TournamentMember)
