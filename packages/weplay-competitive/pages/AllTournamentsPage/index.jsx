import React from 'react'
import PropTypes from 'prop-types'
import paginationPropType from 'weplay-core/customPropTypes/paginationPropType'
import PageHelmet from 'weplay-components/PageHelmet'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import Section from 'weplay-competitive/components/Section'
import TournamentsListing from 'weplay-competitive/components/TournamentsListing'
import PaginationFooter from 'weplay-competitive/components/PaginationFooter'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import container from './container'
import styles from './styles.scss'

const AllTournamentsPage = ({
  fetchedRecords,
  pagination,
  fetchByFiltersAndPagination,
  itemName,
  seoParams,
  t,
}) => (
  <div className={styles.page}>
    <PageHelmet
      seoParams={seoParams}
    />
    <Section
      title={t(
        'competitive.tournaments.allTournaments.title',
        { discipline: seoParams.discipline },
      )}
      subtitle=""
      isTitleH1
    >
      <>
        <div
          className="u-mb-4"
          data-qa-id={dataQaIds.pages[NAMES.TOURNAMENT].container}
        >
          <TournamentsListing
            tournaments={fetchedRecords}
            emptyStateText={t('competitive.member.emptyText.noTournamentsByFilter')}
          />
        </div>
        <PaginationFooter
          itemName={itemName}
          pagination={pagination}
          onPaginationChange={fetchByFiltersAndPagination}
        />
      </>
    </Section>
  </div>
)

AllTournamentsPage.propTypes = {
  t: PropTypes.func.isRequired,
  fetchByFiltersAndPagination: PropTypes.func.isRequired,
  pagination: paginationPropType.isRequired,
  fetchedRecords: PropTypes.arrayOf(tournamentPropType).isRequired,
  itemName: PropTypes.string.isRequired,
  seoParams: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
}

export default container(AllTournamentsPage)
