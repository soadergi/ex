import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import transliterate from 'weplay-core/helpers/translit'
import { pathWithParamsByRoute, NAMES } from 'weplay-core/routes'

import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import Section from 'weplay-competitive/components/Section'
import Wrapper from 'weplay-competitive/components/Wrapper'
import container from 'weplay-competitive/pages/TournamentPage/TournamentParticipants/container'
import Participant from 'weplay-competitive/pages/TournamentPage/TournamentParticipants/Participant'
import tournamentParticipantsPropType from 'weplay-competitive/customPropTypes/tournamentParticipantsPropType'

import styles from './styles.scss'

const wrapperModification = ['content']
const TOURNAMENT_PARTICIPANT_LENGTH = 5

const TournamentParticipants = ({
  // required props
  tournamentParticipants,
  // container props
  handleClickMoreParticipants,
  isSingleTournament,
  // props from HOCs
  discipline,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <Section
      id="participantsSection"
      title={t('competitive.tournament.tournamentTeam.title')}
    >
      <Wrapper
        modifiers={wrapperModification}
        className={styles.wrapper}
      >
        {tournamentParticipants
          .slice(0, TOURNAMENT_PARTICIPANT_LENGTH)
          .map(participant => participant.isFetched && (
          <Participant
            key={participant.id}
            avatar={participant.type === 'Member' ? R.pathOr('', ['user', 'avatar'])(participant) : participant.avatar}
            name={participant.type === 'Member' ? R.pathOr('', ['user', 'nickname'])(participant) : participant.name}
            link={pathWithParamsByRoute(
              NAMES[participant.type.toUpperCase()],
              {
                memberId: participant.id,
                memberName: transliterate(R.pathOr('', ['user', 'nickname'])(participant)),
                teamId: participant.id,
                teamName: transliterate(R.pathOr('', ['name'])(participant)),
                discipline,
              },
            )}
            linkText={t(`competitive.tournament.tournamentTeam.profile.${participant.type}`)}
            isPremiumAccount={participant.type === 'Member'
              ? R.pathOr(false, ['user', 'isPremiumAccount'])(participant)
              : false}
          />
          ))}
      </Wrapper>
      {tournamentParticipants.length > TOURNAMENT_PARTICIPANT_LENGTH && (
      <Button
        priority={BUTTON_PRIORITY.SECONDARY}
        onClick={handleClickMoreParticipants}
        className={styles.button}
      >
        {t(`competitive.tournament.tournamentTeam.${
          isSingleTournament
            ? 'showMoreParticipants'
            : 'showMoreTeams'
        }`)}
      </Button>
      )}
    </Section>
  )
}

TournamentParticipants.propTypes = {
  // required props
  tournamentParticipants: PropTypes.arrayOf(tournamentParticipantsPropType).isRequired,
  // container props
  handleClickMoreParticipants: PropTypes.func.isRequired,
  isSingleTournament: PropTypes.bool.isRequired,
  // props from HOCs
  discipline: PropTypes.string.isRequired,
  // optional props
}

TournamentParticipants.defaultProps = {
  // optional props
}

export default container(TournamentParticipants)
