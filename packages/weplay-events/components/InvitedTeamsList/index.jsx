import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'

import SectionHeader from 'weplay-components/SectionHeader'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import container from './container'
import styles from './styles.scss'
import TeamCard from './TeamCard'

const InvitedTeamsList = ({
  // required props
  routeInfo,

  // props from container
  isCardExpanded,
  allTeams,

  // optional props
  tournamentTitle,
  isCaptainWithRole,
}) => {
  const t = useTranslation()

  if (!allTeams[0]?.length) {
    return null
  }

  return (
    <ContentContainer>
      {allTeams.map((teams, index) => (
        <Fragment key={teams[0].uuid}>
          <SectionHeader title={t(`tournamentStages.${routeInfo.title}.invitedTeams.${index}`)} />

          <div
            className={classNames(
              styles.grid,
              { [styles.paddingBottom]: (index + 1) < allTeams.length },
              styles[routeInfo.title],
            )}
          >
            {teams.map((team, teamIndex) => (
              <div
                key={team.uuid}
                className={styles.gridItem}
              >
                <TeamCard
                  team={team}
                  tournamentTitle={tournamentTitle}
                  isInitiallyExpanded={
                    isCardExpanded({
                      index,
                      isFirstTeam: teamIndex === 0,
                      isTbd: team.isTbd,
                    })
                  }
                  isCaptainWithRole={isCaptainWithRole}
                />
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </ContentContainer>
  )
}

InvitedTeamsList.propTypes = {
  // required props

  // props from container
  routeInfo: routeInfoPropType.isRequired,
  isCardExpanded: PropTypes.func.isRequired,
  allTeams: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.shape({})),
  ).isRequired,

  // optional props
  tournamentTitle: PropTypes.string,
  isCaptainWithRole: PropTypes.bool,
}

InvitedTeamsList.defaultProps = {
  // optional props
  tournamentTitle: '',
  isCaptainWithRole: false,
}

export default container(InvitedTeamsList)
