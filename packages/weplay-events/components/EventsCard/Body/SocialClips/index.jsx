import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import classNames from 'classnames'
import Label from 'weplay-components/Label'
import eventCardPropType from 'weplay-events/customPropTypes/eventCardPropType'

import Info from './Info'
import styles from './styles.scss'
import container from './container'

const SocialClips = ({
  // required props
  i18nTexts,
  event,
  isQualification,

  // container props
  toggleExpanded,
  isMobileWidth,
  isExpanded,
  eventLabels,

  // optional props
}) => (
  <>
    {!isMobileWidth && eventLabels.map(label => (
      <Label
        className={styles.label}
        key={label}
        color="white"
      >
        {label}
      </Label>
    ))}

    <div className={classNames(
      styles.block,
      { [styles.isExpanded]: isExpanded },
    )}
    >

      {!isQualification && (
        <div className={styles.wrapRow}>
          {event.youtubeLink && (
            <div className={styles.wrapVideoColumn}>
              <Link
                className={styles.link}
                to={event.youtubeLink}
              >
                <div className={styles.wrapIcon}>
                  <Icon
                    size="small"
                    iconName="tv"
                    className={styles.icon}
                  />
                </div>
                <span className={styles.buttonText}>
                  {i18nTexts.events.eventsRootPage.futureEventsBlock.body.youtubeButton}
                </span>
              </Link>
            </div>
          )}

          {event.youtubeLink && event.twitchLink && (
            <hr className={styles.grayLine} />
          )}

          {event.twitchLink && (
            <div className={styles.wrapVideoColumn}>
              <Link
                className={styles.link}
                to={event.twitchLink}
              >
                <span className={styles.buttonText}>
                  {i18nTexts.events.eventsRootPage.futureEventsBlock.body.twitchButton}
                </span>
              </Link>
            </div>
          )}
        </div>
      )}

      {!isMobileWidth && event.tournamentInfo && (
        <div className={styles.wrapRow}>
          <button
            className={styles.button}
            type="button"
            onClick={toggleExpanded}
          >
            <div className={styles.wrapIcon}>
              <Icon
                size="small"
                iconName="info"
                className={styles.icon}
              />
            </div>
            <div className={styles.wrapVideoColumn}>
              <span className={styles.buttonText}>
                {i18nTexts.events.eventsRootPage.futureEventsBlock.body.info}
              </span>
              <Icon
                size="small"
                iconName="arrow-down-second"
                className={classNames(
                  styles.icon,
                  styles.iconArrow,
                  'u-ml-1',
                )}
              />
            </div>
          </button>
        </div>
      )}

      {(isExpanded || isMobileWidth) && (
        <Info
          info={event.tournamentInfo}
        />
      )}

      {event.location && (
        <div className={styles.wrapRow}>
          <div className={styles.wrapIcon}>
            <Icon
              size="small"
              iconName="map"
              className={styles.icon}
            />
          </div>
          <Link
            className={styles.link}
            to={event.location.link}
          >
            {event.location.title}
          </Link>
          <Icon
            size="small"
            iconName="location"
            className={classNames(
              styles.icon,
              'u-ml-1',
            )}
          />
        </div>
      )}
    </div>
  </>
)

SocialClips.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  isMobileWidth: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  event: eventCardPropType.isRequired,
  isQualification: PropTypes.bool.isRequired,

  // container props
  eventLabels: PropTypes.arrayOf(PropTypes.string).isRequired,

  // optional props
}

SocialClips.defaultProps = {
  // optional props
}

export default container(SocialClips)
