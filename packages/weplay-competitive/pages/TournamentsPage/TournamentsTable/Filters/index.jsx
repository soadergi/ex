import React from 'react'
import PropTypes from 'prop-types'
import filtersPropType from 'weplay-competitive/customPropTypes/filtersPropType'
import container from 'weplay-competitive/pages/TournamentsPage/TournamentsTable/Filters/container'
import Filter from 'weplay-competitive/pages/TournamentsPage/TournamentsTable/Filters/Filter'

import styles from './styles.scss'

const Filters = ({
  // required props
  filterConfigs,
  filters,

  // container props
  sendAmplitudeEvent,

  // optional props
}) => (
  <div className={styles.grid}>
    {filterConfigs.map(filterConfig => filterConfig.isAvailable && (
      <Filter
        key={filterConfig.fieldName}
        fieldName={filterConfig.fieldName}
        value={filters[filterConfig.fieldLabel]}
        filterConfig={filterConfig}
        isDisabled={filterConfig.isDisabled}
        sendAmplitudeEvent={sendAmplitudeEvent}
      />
    ))}
  </div>
)

Filters.propTypes = {
  // required props
  filterConfigs: PropTypes.arrayOf(PropTypes.shape({
    fieldName: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    fieldType: PropTypes.oneOf(['select', 'number', 'text']).isRequired,
  })).isRequired,
  filters: filtersPropType.isRequired,

  // container props
  sendAmplitudeEvent: PropTypes.func.isRequired,

  // optional props
}

Filters.defaultProps = {
  // optional props
}

export default container(Filters)
