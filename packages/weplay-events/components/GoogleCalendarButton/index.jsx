import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

export const GoogleCalendarButton = ({
  // required props

  // container props
  i18nTexts,
  calendarLink,

  // optional props
}) => (
  <a
    href={calendarLink}
    className={styles.addToCalendarLink}
    target="_blank"
    rel="noreferrer noopener"
  >
    <Icon
      size="small"
      iconName="calendar-add"
      className="u-mr-1"
    />

    <span className={styles.text}>
      {i18nTexts.events.addToCalendarLink}
    </span>
  </a>
)

GoogleCalendarButton.propTypes = {
  // required props

  // container props
  calendarLink: PropTypes.string.isRequired,

  // optional props
}

GoogleCalendarButton.defaultProps = {
  // optional props
}

export default container(GoogleCalendarButton)
