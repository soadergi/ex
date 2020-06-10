import React from 'react'
import PropTypes from 'prop-types'
import tournamentDatePropTypes from 'weplay-core/customPropTypes/timeIntervalPropType'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'
import container from './container'

const EventDuration = ({
  // required props
  tournamentDates,
  dateFormat,

  // container props
  hasCalendarIcon,

  // optional props
  divider,
}) => (
  <>
    {hasCalendarIcon && (
      <Icon
        className={styles.icon}
        iconName="calendar"
        size="small"
      />
    )}

    {tournamentDates.start || tournamentDates.end
      ? (
        <>
          {tournamentDates.start
            ? (
              <p className={styles.text}>
                <LocalizedMoment
                  dateTime={tournamentDates.start}
                  formatKey={dateFormat.start}
                />
              </p>
            )
            : 'TBA'}

          {divider}

          {tournamentDates.end
            ? (
              <p className={styles.text}>
                <LocalizedMoment
                  dateTime={tournamentDates.end}
                  formatKey={dateFormat.end}
                />
              </p>
            )
            : 'TBA'}
        </>
      )
      : 'TBA'}
  </>
)

EventDuration.propTypes = {
  // required props
  tournamentDates: tournamentDatePropTypes.isRequired,

  // container props
  dateFormat: tournamentDatePropTypes.isRequired,

  // optional props
  hasCalendarIcon: PropTypes.bool,
  divider: PropTypes.string,
}

EventDuration.defaultProps = {
  // optional props
  hasCalendarIcon: false,
  divider: '',
}

export default container(EventDuration)
