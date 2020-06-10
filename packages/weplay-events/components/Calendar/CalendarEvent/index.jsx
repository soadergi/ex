import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'

import DownloadTicketButton from 'weplay-events/components/DownloadTicketButton'

import styles from './styles.scss'

const CalendarEvent = ({
  event,
  buyTicketLink,
  isEventWithTicket,
  isLastColumn,
}) => {
  const t = useTranslation()

  return (
    <div
      className={classNames(
        styles.block,
        styles[event.status],
      )}
    >
      <div className={styles.date}>{t(event.date)}</div>
      <div className={styles.monthYear}>{t(event.monthYear)}</div>
      <div className={classNames(
        styles.progressLine,
        { [styles.isLastColumn]: isLastColumn },
      )}
      />
      <div className={styles.contentTitle}>{t(event.contentTitle)}</div>
      <div className={styles.description}>{t(event.description)}</div>

      {buyTicketLink && (
        <Link
          to={buyTicketLink}
          isExternal
          className={styles.link}
        >
          {t('events.calendar.button')}
        </Link>
      )}

      {isEventWithTicket && (
        <DownloadTicketButton iconName="arrow-link" />
      )}
    </div>
  )
}

CalendarEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.string,
    monthYear: PropTypes.string,
    contentTitle: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,

  // optional props
  isEventWithTicket: PropTypes.bool,
  isLastColumn: PropTypes.bool,
  buyTicketLink: PropTypes.string,
}

CalendarEvent.defaultProps = {
  isEventWithTicket: false,
  isLastColumn: false,
  buyTicketLink: '',
}

export default CalendarEvent
