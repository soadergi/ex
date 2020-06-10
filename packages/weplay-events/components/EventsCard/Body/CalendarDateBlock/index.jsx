import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import eventCardPropType from 'weplay-events/customPropTypes/eventCardPropType'
import GoogleCalendarButton from 'weplay-events/components/GoogleCalendarButton'

import styles from './styles.scss'
import container from './container'

const CalendarDateBlock = ({
  // required props
  dateTo,
  dateFrom,
  event,

  // container props
  i18nTexts,
  isTournamentActive,
  isQualification,

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.date}>
      <Icon
        size="small"
        iconName="calendar"
        className={classNames(
          styles.icon,
          'u-mr-1',
        )}
      />
      <span className={styles.text}>

        <LocalizedMoment
          dateTime={dateFrom}
          formatKey="dateMonth"
        />
         -
        <LocalizedMoment
          dateTime={dateTo}
          formatKey="dateMonthYear"
        />
      </span>
    </div>
    <div className="wrapLinks">

      {isTournamentActive && (
        isQualification ? (
          <Link
            to={event.regulationLink}
            className={styles.addToCalendarLink}
          >
            <span
              className={classNames(
                styles.text,
                styles.textLink,
                styles.textRegulation,
              )}
            >
              {i18nTexts.events.eventsRootPage.futureEventsBlock.body.rulesLink}
            </span>
          </Link>
        ) : (
          <GoogleCalendarButton
            dateFrom={dateFrom}
            dateTo={dateTo}
            descriptionText={event.tournamentTitle}
          />
        )
      )}
    </div>
  </div>
)

CalendarDateBlock.propTypes = {
  // required props
  dateTo: PropTypes.string.isRequired,
  dateFrom: PropTypes.string.isRequired,
  isQualification: PropTypes.bool.isRequired,
  event: eventCardPropType.isRequired,

  // container props

  // optional props
  isTournamentActive: PropTypes.bool,
}

CalendarDateBlock.defaultProps = {
  // optional props
  isTournamentActive: false,
}

export default container(CalendarDateBlock)
