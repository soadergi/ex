import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import B2BSection from 'components/B2BSection/B2BSection'
import TeamMember from 'components/TeamMember/TeamMember'

import { mapMembers } from 'helpers/mapMembers'

import { LEADERS_LIST } from './leadersList'
import classes from './Leaders.scss'

const Leaders = ({ children, routeInfo }) => {
  const t = useTranslation()
  const leaders = mapMembers(LEADERS_LIST)
  const isTeamPage = routeInfo.lokaliseKey === 'teamPage'
  return (
    <B2BSection
      title={t(`${routeInfo.lokaliseKey}.leaders.title`)}
      titleSize={isTeamPage && 'h3'}
    >
      <div className={classes.block}>
        {leaders.map(leader => (
          <TeamMember
            member={leader}
            key={leader.slug}
            isSeeMoreButtonVisible={isTeamPage}
          />
        ))}
      </div>
      {children}
    </B2BSection>
  )
}

export default React.memo(withRouteInfo(Leaders))
