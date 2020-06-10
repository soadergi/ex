import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { useHistory } from 'weplay-singleton/RouterProvider/useHistory'
import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { goTo, NAMES } from 'weplay-core/routes'

import TeamCard from 'weplay-competitive/components/TeamCard'
import EmptyTeamCard from 'weplay-competitive/components/EmptyTeamCard'
import TeamModal from 'weplay-competitive/components/Modals/TeamModal'
import Section from 'weplay-competitive/components/Section'
import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'
import { GA__CREATE_TEAM } from 'weplay-competitive/analytics'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

import styles from './TeamSection.scss'

const sectionModification = ['small']

const TeamSection = ({
  freeGameModeIDs,
  showSoonLabel,
  memberTeamIds,
  isOwner,
  freeTeamsGameModes,
}) => {
  const params = useParams()
  const [isShownCreateTeamModal, setIsShownCreateTeamModal] = useState(false)

  const t = useTranslation()
  const history = useHistory()
  const { discipline } = useDiscipline()

  const goToTeamPage = useCallback(id => goTo({
    name: NAMES.TEAM,
    history,
    params: {
      ...params,
      teamId: id,
    },
  }), [history, params])

  const createTeamLinkText = freeGameModeIDs?.length && isOwner
    ? t('competitive.member.teamCard.create')
    : ''

  return (
    <Section
      modifiers={sectionModification}
      title={t('competitive.member.overview.team')}
      linkText={createTeamLinkText}
      linkIcon="plus"
      linkHandler={() => setIsShownCreateTeamModal(true)}
      showSoonLabelText={showSoonLabel ? t('competitive.member.profile.soon') : ''}
      className={styles.teams}
      data-event-action={GA__CREATE_TEAM.eventAction}
      data-event-category={GA__CREATE_TEAM.eventCategory}
    >
      <div
        className={styles.teamsWrapper}
        data-event-amplitude-source="User profile"
        data-qa-id={dataQaIds.pages[NAMES.MEMBER].container}
      >
        {memberTeamIds.length
          ? memberTeamIds.map(teamId => (
            <TeamCard
              teamId={teamId}
              key={teamId}
              isOwner={isOwner}
              discipline={discipline}
            />
          ))
          : (
            <EmptyTeamCard />
          )}
        <TeamModal
          isShown={isShownCreateTeamModal}
          onCloseTeamModal={() => setIsShownCreateTeamModal(false)}
          onSuccess={goToTeamPage}
          freeTeamsGameModes={freeTeamsGameModes}
        />
      </div>
    </Section>
  )
}

TeamSection.propTypes = {
  isOwner: PropTypes.bool.isRequired,
  showSoonLabel: PropTypes.bool.isRequired,
  memberTeamIds: PropTypes.arrayOf(PropTypes.number),
  // optional
  freeTeamsGameModes: PropTypes.arrayOf(gameModePropType),
  freeGameModeIDs: PropTypes.arrayOf(PropTypes.number),
}

TeamSection.defaultProps = {
  // optional props
  memberTeamIds: [],
  freeTeamsGameModes: null,
  freeGameModeIDs: [],
}

export default TeamSection
