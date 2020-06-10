import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import LocalizedMoment from 'weplay-components/LocalizedMoment'

const DividedDateTime = ({
  // required props
  dateTime,
  // container props

  // optional props
  formatDate,
  formatTime,
  divider,
}) => (
  <Fragment>
    {' '}
    <LocalizedMoment
      formatKey={formatDate}
      dateTime={dateTime}
    />
    {` ${divider} `}
    <LocalizedMoment
      formatKey={formatTime}
      dateTime={dateTime}
    />
  </Fragment>
)

DividedDateTime.propTypes = {
  // required props
  dateTime: PropTypes.string.isRequired,
  // container props
  // optional props
  formatDate: PropTypes.string,
  formatTime: PropTypes.string,
  divider: PropTypes.string,
}

DividedDateTime.defaultProps = {
  // optional props
  formatDate: 'dateMonthYear',
  formatTime: '24h',
  divider: '•',
}

export default DividedDateTime
