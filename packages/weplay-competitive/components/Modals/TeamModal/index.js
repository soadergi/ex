import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ModalBase from 'weplay-components/ModalBase'

import Section from 'weplay-competitive/components/Section'
import teamPropType from 'weplay-competitive/customPropTypes/teamPropType'
import TeamModalForm from 'weplay-competitive/components/Modals/TeamModal/TeamModalForm'
import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'

import styles from './styles.scss'

const sectionModification = ['small']

const TeamModal = ({
  // required props
  isShown,
  onCloseTeamModal,
  team,

  // container props
  onSuccess,

  // optional props
  freeTeamsGameModes,
}) => {
  const t = useTranslation()
  return (
    <ModalBase
      handleClose={onCloseTeamModal}
      isShown={isShown}
    >
      <div className={styles.content}>
        <Section
          modifiers={sectionModification}
          title={t(`competitive.member.teamCard.${
            team.id
              ? 'updateTeam'
              : 'createTeam'
          }`)}
        >
          {isShown && (
            <TeamModalForm
              onAbort={onCloseTeamModal}
              onSuccess={onSuccess}
              team={team}
              freeTeamsGameModes={freeTeamsGameModes}
            />
          )}
        </Section>
      </div>
    </ModalBase>
  )
}

TeamModal.propTypes = {
  // required props
  isShown: PropTypes.bool.isRequired,
  onCloseTeamModal: PropTypes.func.isRequired,

  // container props
  onSuccess: PropTypes.func.isRequired,
  // optional props
  team: teamPropType,
  freeTeamsGameModes: PropTypes.arrayOf(gameModePropType),
}

TeamModal.defaultProps = {
  // optional props
  team: {
    id: NaN,
    type: 'Team',
    isFetched: false,
  },
  freeTeamsGameModes: null,
}

export default TeamModal
