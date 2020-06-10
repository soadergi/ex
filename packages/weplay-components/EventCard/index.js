import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import HashTags from 'weplay-components/HashTags'
import Link from 'weplay-components/Link'
import Button, { BUTTON_SIZE, BUTTON_COLOR } from 'weplay-components/Button'

import container from './container'
import styles from './styles.scss'

const EventCard = ({
  // required props
  promoEvent,
  // container props
  t,
  eventPrizeText,
  // optional props
  rootPage,
}) => {
  const title = promoEvent.localizations.title
  const eventType = promoEvent.localizations.eventType
  const buttonText = promoEvent.localizations.buttonText
  const logoUrl = promoEvent.logoUrl
  const prizePool = promoEvent.prizePool
  const tags = promoEvent.tags
  const description = promoEvent.localizations.description
  const url = promoEvent.url
  const linkProps = promoEvent.isExternalLink ? { target: '_blank' } : {}

  return (
    <div className={classNames(
      styles.block,
      { [styles.promoEvent]: rootPage },
    )}
    >
      <Link
        className={styles.link}
        to={url}
        {...linkProps}
      >
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            src={promoEvent.backgroundUrl}
            alt={title}
          />
        </div>

        {logoUrl && (
          <div className={styles.logo}>
            <img
              className="o-img-responsive"
              src={logoUrl}
              alt={title}
            />
          </div>
        )}
      </Link>

      {!eventType && (
        <p className={classNames(
          styles.label,
          { [styles.accent]: promoEvent.isSpecial },
        )}
        >
          {eventType ?? t(`root.events.${promoEvent.isLan ? 'lan' : 'online'}`)}
        </p>
      )}

      {prizePool && (
        <div className={styles.prize}>
          <p className={styles.prizeLabel}>{eventPrizeText}</p>
          <p className={styles.prizePool}>{`${prizePool}`}</p>
        </div>
      )}

      <div className={styles.content}>
        {tags && (
          <HashTags
            tags={tags}
          />
        )}

        {description && (
          <p className={styles.text}>
            {description}
          </p>
        )}

        <h2 className={styles.title}>
          <Link
            to={url}
            className={styles.titleLink}
            {...linkProps}
          >
            {title}
          </Link>
        </h2>

        {buttonText && (
          <Button
            size={BUTTON_SIZE.SM}
            color={BUTTON_COLOR.CTA}
            className={styles.button}
            href={url}
            {...linkProps}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  )
}

EventCard.propTypes = {
  // required props
  promoEvent: PropTypes.shape({
    url: PropTypes.string,
    isExternalLink: PropTypes.bool,
    backgroundUrl: PropTypes.string,
    localizations: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      eventType: PropTypes.string,
      buttonText: PropTypes.string,
    }),
    logoUrl: PropTypes.string,
    isLan: PropTypes.bool,
    prizePool: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.shape({})),
    isSpecial: PropTypes.bool,
  }).isRequired,
  // container props
  eventPrizeText: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  // optional props
  rootPage: PropTypes.bool,
}

EventCard.defaultProps = {
  // optional props
  rootPage: false,
}

export default container(EventCard)
