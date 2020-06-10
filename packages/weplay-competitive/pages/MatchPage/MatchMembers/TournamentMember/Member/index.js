import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import {
  NAMES,
  pathWithParamsByRoute,
} from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'

import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'
import MatchParticipant from 'weplay-competitive/components/MatchParticipant'
import { TOURNAMENT_MEMBER_ROLES } from 'weplay-competitive/constants/tournamentMemberRoles'
import container from 'weplay-competitive/pages/MatchPage/MatchMembers/TournamentMember/Member/container'

const Member = ({
  // required props
  isActive,
  tournamentMemberRole,

  // container props
  member,

  // props from HOCs
  discipline,

  // optional props
}) => {
  const t = useTranslation()
  return member.isFetched && (
    <MatchParticipant
      avatar={member?.user?.avatar ?? ''}
      name={member?.user?.nickname ?? ''}
      subtitle={t(`competitive.roles.${tournamentMemberRole}`)}
      status={isActive ? 'ready' : 'notReady'}
      steamId={member?.user?.steamId ?? ''}
      link={pathWithParamsByRoute(
        NAMES[member.type.toUpperCase()],
        {
          memberId: member.id,
          memberName: transliterate(member?.user?.nickname ?? ''),
          teamId: member.id,
          teamName: transliterate(member.name || ''),
          discipline,
        },
      )}
      isPremiumAccount={member?.user?.isPremiumAccount ?? false}
    />
  )
}

Member.propTypes = {
  // required props
  isActive: PropTypes.bool.isRequired,
  tournamentMemberRole: PropTypes.oneOf(R.values(TOURNAMENT_MEMBER_ROLES)).isRequired,

  // container props
  member: memberPropType.isRequired,

  // props from HOCs
  discipline: PropTypes.string.isRequired,

  // optional props
}

Member.defaultProps = {
  // optional props
}

export default container(Member)
