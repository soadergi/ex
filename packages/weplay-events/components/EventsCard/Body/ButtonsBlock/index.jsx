import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import ReminderButton from 'weplay-events/components/ReminderButton'
import eventCardPropType from 'weplay-events/customPropTypes/eventCardPropType'

import styles from './styles.scss'
import container from './container'

const ButtonsBlock = ({
  // required props
  event,

  // container props
  i18nTexts,
  detailsButtonText,

  // optional props
  isQualification,
}) => (
  <div className={styles.block}>
    {event.discordLink && (
      <Link
        to={event.discordLink}
        className={classNames(
          styles.discordLink,
          styles.button,
        )}
      >
        <Icon
          size="small"
          iconName="discord"
          className={classNames(
            styles.icon,
            'u-mr-1',
          )}
        />
        {i18nTexts.events.eventsRootPage.futureEventsBlock.body.takePartButton}
      </Link>
    )}

    {event.detailsLink && (
      <div
        data-tournament_title={event.tournamentTitle}
        className={styles.wrapButton}
      >
        <Link
          className={classNames(
            isQualification ? styles.discordLink : styles.detailsButton,
            styles.button,
          )}
          to={event.detailsLink}
        >
          <Icon
            size="small"
            iconName="arrow-link"
            className={classNames(
              styles.icon,
              'u-mr-1',
            )}
          />
          {detailsButtonText}
        </Link>
      </div>
    )}

    {event.subscriptionId && (
      <ReminderButton
        modalTitle={event.tournamentTitle}
        subscriptionScopeId={event.subscriptionId}
        className={styles.reminderButton}
      />
    )}

    {event.buyTicketsLink && (
      <button
        className={classNames(
          styles.buyTicketButton,
          styles.button,
        )}
        type="button"
      >
        <Icon
          size="small"
          iconName="invite"
          className={classNames(
            styles.icon,
            'u-mr-1',
          )}
        />
        {i18nTexts.events.eventsRootPage.futureEventsBlock.body.buyTicketButton}
      </button>
    )}
  </div>
)

ButtonsBlock.propTypes = {
  // required props
  event: eventCardPropType.isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  detailsButtonText: PropTypes.string.isRequired,

  // optional props
  isQualification: PropTypes.bool,
}

ButtonsBlock.defaultProps = {
  // optional props
  isQualification: false,
}

export default container(ButtonsBlock)
