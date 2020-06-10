import React from 'react'
import PropTypes from 'prop-types'
import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'

import Schedule from './Schedule'
import container from './container'
import styles from './styles.scss'

const SheduleSection = ({
  i18nTexts,
  routeInfo,
  tournamentGroupNames,
  tournamentGroupGamesByDate,
}) => (
  <div>
    { /* TODO: @html add localization */ }
    <h2 className={styles.title}>{i18nTexts[routeInfo.title].scheduleTitle}</h2>

    <div className={styles.columns}>
      {tournamentGroupNames.map((name, index) => (
        <Schedule
          divisionIndex={index}
          key={name}
          name={name}
          games={tournamentGroupGamesByDate[index]}
        />
      ))}
    </div>
  </div>

)

SheduleSection.propTypes = {
  // required props

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  routeInfo: routeInfoPropType.isRequired,
  tournamentGroupNames: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  tournamentGroupGamesByDate: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  ).isRequired,

  // optional props
}

SheduleSection.defaultProps = {
  // optional props
}

export default container(SheduleSection)
