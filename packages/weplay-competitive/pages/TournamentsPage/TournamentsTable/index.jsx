import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import paginationPropType from 'weplay-core/customPropTypes/paginationPropType'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import TournamentsListing from 'weplay-competitive/components/TournamentsListing'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import filtersPropType from 'weplay-competitive/customPropTypes/filtersPropType'
import PaginationFooter from 'weplay-competitive/components/PaginationFooter'
import CountIndicator from 'weplay-competitive/components/CountIndicator'
import Filters from 'weplay-competitive/pages/TournamentsPage/TournamentsTable/Filters'
import tournamentsTabPropType from 'weplay-competitive/customPropTypes/tournamentsTabPropType'

import container from './container'
import styles from './styles.scss'

const TournamentsTable = ({
  // required props

  // props from container
  handlePaginationChange,
  pagination,
  filterConfigs,
  filters,
  fetchedRecords: paginatedFilteredTournaments,
  itemName,
  tabs,
  handleTabClick,
  activeTab,
  t,
  // optional props
}) => (
  <div
    className={classNames(
    )}
  >
    <InlineTabs
      hasSeparator
    >
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          tab={tab.title}
          handleClick={() => handleTabClick(tab)}
          activeTab={tab.id === activeTab.id}
        />
      ))}
    </InlineTabs>

    <Filters
      filters={filters}
      filterConfigs={filterConfigs}
    />
    <CountIndicator
      className={styles.indicator}
    >
      {
        t(
          'competitive.tournaments.tournamentsTable.subtitle.numberOfTournamnets',
          { number: pagination.total },
        )
      }
    </CountIndicator>
    <>
      <div className="u-mb-4">
        <TournamentsListing
          tournaments={paginatedFilteredTournaments}
          emptyStateText={t('competitive.member.emptyText.noTournamentsByFilter')}
        />
      </div>
      <PaginationFooter
        itemName={itemName}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        hideLimit
      />
    </>
  </div>
)

TournamentsTable.propTypes = {
  // required props

  // props from container
  activeTab: tournamentsTabPropType.isRequired,
  tabs: PropTypes.arrayOf(
    tournamentsTabPropType,
  ).isRequired,
  t: PropTypes.func.isRequired,
  pagination: paginationPropType.isRequired,
  filterConfigs: PropTypes.arrayOf(PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
    fieldType: PropTypes.oneOf(['select', 'number', 'text']).isRequired,
  })).isRequired,
  filters: filtersPropType.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
  fetchedRecords: PropTypes.arrayOf(tournamentPropType).isRequired,
  itemName: PropTypes.string.isRequired,

  // optional props
}

TournamentsTable.defaultProps = {
  // optional props
}

export default container(TournamentsTable)
