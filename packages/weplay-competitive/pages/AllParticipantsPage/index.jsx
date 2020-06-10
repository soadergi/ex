import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import paginationPropType from 'weplay-core/customPropTypes/paginationPropType'
import transliterate from 'weplay-core/helpers/translit'
import PageHelmet from 'weplay-components/PageHelmet'
import PaginationFooter from 'weplay-competitive/components/PaginationFooter'
import CountIndicator from 'weplay-competitive/components/CountIndicator'
import Section from 'weplay-competitive/components/Section'
import tournamentParticipantsPropType from 'weplay-competitive/customPropTypes/tournamentParticipantsPropType'
import Participant from 'weplay-competitive/pages/TournamentPage/TournamentParticipants/Participant'

import container from './container'
import styles from './styles.scss'

const AllParticipantsPage = ({
  t,
  fetchedRecords,
  pagination,
  fetchByFiltersAndPagination,
  itemName,
  seoParams,
  // props from HOCs
  discipline,
}) => (
  <Section
    title={t('competitive.allParticipants.title')}
    isTitleH1
  >
    <PageHelmet
      seoParams={seoParams}
    />
    <CountIndicator
      className={styles.counter}
    >
      {pagination.total}
      {' '}
      {t('competitive.allParticipants.participants')}
    </CountIndicator>
    <div
      className={styles.grid}
      data-event-amplitude-source="All Participants"
      data-qa-id={dataQaIds.pages[NAMES.TOURNAMENT_PARTICIPANTS].container}
    >
      {fetchedRecords.map(participant => participant.isFetched && (
      <Participant
        key={participant.id}
        avatar={participant.type === 'Member'
          ? R.pathOr('', ['user', 'avatar'])(participant)
          : participant.avatar}
        name={participant.type === 'Member'
          ? R.pathOr('', ['user', 'nickname'])(participant)
          : participant.name}
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
    </div>
    <PaginationFooter
      itemName={itemName}
      pagination={pagination}
      onPaginationChange={fetchByFiltersAndPagination}
    />
  </Section>
)

AllParticipantsPage.propTypes = {
  t: PropTypes.func.isRequired,
  fetchByFiltersAndPagination: PropTypes.func.isRequired,
  pagination: paginationPropType.isRequired,
  fetchedRecords: PropTypes.arrayOf(tournamentParticipantsPropType).isRequired,
  itemName: PropTypes.string.isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  // props from HOCs
  discipline: PropTypes.string.isRequired,
}

export default container(AllParticipantsPage)
