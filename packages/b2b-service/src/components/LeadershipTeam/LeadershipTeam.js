import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import B2BSection from 'components/B2BSection/B2BSection'
import TeamMember from 'components/TeamMember/TeamMember'

import { mapMembers } from 'helpers/mapMembers'

import { TEAM_LIST } from './leadershipTeamList'
import classes from './LeadershipTeam.scss'

const LeadershipTeam = ({ routeInfo }) => {
  const t = useTranslation()
  const members = mapMembers(TEAM_LIST)
  const isTeamPage = routeInfo.lokaliseKey === 'teamPage'
  return (
    <B2BSection
      title={t('teamPage.leadershipTeam.title')}
      titleSize="h3"
    >
      <div className={classes.block}>
        {members.map(member => (
          <TeamMember
            member={member}
            cardSize="team"
            key={member.slug}
            isSeeMoreButtonVisible={isTeamPage}
          />
        ))}
      </div>
    </B2BSection>
  )
}

export default React.memo(withRouteInfo(LeadershipTeam))
