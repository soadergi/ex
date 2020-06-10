import React from 'react'
import PropTypes from 'prop-types'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import classNames from 'classnames'

import styles from '../UserItem/styles.scss'

const dateFormatKey = 'dateMonth'

const CheckInTime = ({
  tournamentDates,
}) => tournamentDates.map(date => (
  <p
    key={date}
    className={classNames(
      styles.text,
      'currentUserActivations',
    )}
  >
    <LocalizedMoment
      dateTime={date}
      formatKey={dateFormatKey}
    />
  </p>
))

CheckInTime.propTypes = {
  tournamentDates: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
}

export default CheckInTime
