import React from 'react'
import PropTypes from 'prop-types'

import LocalizedMoment from 'weplay-components/LocalizedMoment'

const Period = ({
  startFormatKey,
  endFormatKey,
  startDateTime,
  endDateTime,
  divider,
  withYear,
}) => (
  <>
    <LocalizedMoment
      formatKey={startFormatKey}
      dateTime={startDateTime}
    />
    {divider}
    <LocalizedMoment
      formatKey={endFormatKey}
      dateTime={endDateTime}
    />
    {withYear && (
      <>
        {', '}
        <LocalizedMoment
          formatKey="year"
          dateTime={endDateTime}
        />
      </>
    )}
  </>
)

Period.propTypes = {
  startDateTime: PropTypes.string.isRequired,
  endDateTime: PropTypes.string.isRequired,
  startFormatKey: PropTypes.string,
  endFormatKey: PropTypes.string,
  divider: PropTypes.string,
  withYear: PropTypes.bool,
}

Period.defaultProps = {
  startFormatKey: 'dateFullMonthTime',
  endFormatKey: 'dateFullMonthTime',

  divider: ' - ',
  withYear: true,
}

export default Period
