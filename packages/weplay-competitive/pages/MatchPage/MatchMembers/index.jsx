import tournamentMemberPropType from 'weplay-competitive/customPropTypes/tournamentMemberPropType'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TournamentMember from 'weplay-competitive/pages/MatchPage/MatchMembers/TournamentMember'

import container from './container'
import styles from './styles'

const MatchMembers = ({
  // required props

  // container props
  matchId,
  tournamentMembers,

  // optional props
  className,
}) => tournamentMembers.length > 1 && (
  <div className={classNames(
    styles.wrapper,
    className,
  )}
  >
    {tournamentMembers.map(tournamentMember => tournamentMember.isFetched && (
      <TournamentMember
        key={tournamentMember.id}
        matchId={matchId}
        tournamentMember={tournamentMember}
        className={styles.item}
      />
    ))}
  </div>
)
MatchMembers.propTypes = {
  // required props

  // container props
  matchId: PropTypes.number.isRequired,
  tournamentMembers: PropTypes.arrayOf(tournamentMemberPropType).isRequired,
  // optional props
  className: PropTypes.string,
}

MatchMembers.defaultProps = {
  // optional props
  className: '',
}

export default container(MatchMembers)
