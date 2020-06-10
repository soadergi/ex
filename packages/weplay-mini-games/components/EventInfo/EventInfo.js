import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { capitalizeFirstLetter } from 'weplay-core/helpers/capitalizeFirstLetter'

import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'

import styles from './EventInfo.scss'

const EventInfo = ({
  eventLink,
  eventText,
  botLinks,
  botNewsText,
  pageName,
  color,
  eventIconName,
}) => {
  const hasBotLinks = Boolean(botLinks.length)

  return (
    <div className={classNames(
      styles.block,
      styles[color],
    )}
    >
      <Link
        to={eventLink}
        className={styles.link}
        target="_blank"
      >
        {eventIconName && (
          <Icon
            iconName={eventIconName}
            className={styles.eventIcon}
          />
        )}
        {eventText}
      </Link>

      {hasBotLinks && (
        <div className={styles.latestNews}>
          {botLinks.map(botLink => (
            <Link
              className={styles.icon}
              to={botLink.url}
              {...getAnalyticsAttributes({
                category: 'Social',
                action: `Join ${capitalizeFirstLetter(botLink.name)} channel`,
                position: pageName,
              })}
            >
              <Icon iconName={botLink.iconName} />
            </Link>
          ))}
          <span>{botNewsText}</span>
        </div>
      )}
    </div>
  )
}

EventInfo.propTypes = {
  eventLink: PropTypes.string.isRequired,
  eventText: PropTypes.string.isRequired,
  botLinks: PropTypes.arrayOf(PropTypes.shape({})),
  botNewsText: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  color: PropTypes.string,
  eventIconName: PropTypes.string,
}

EventInfo.defaultProps = {
  color: '',
  eventIconName: '',
  botLinks: [],
}

export default React.memo(EventInfo)
