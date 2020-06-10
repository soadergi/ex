import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from 'weplay-components/Icon'

import eventCardPropType from 'weplay-events/customPropTypes/eventCardPropType'

import SocialClips from './SocialClips'
import ButtonsBlock from './ButtonsBlock'
import CalendarDateBlock from './CalendarDateBlock'
import container from './container'
import styles from './styles.scss'

const Body = ({
  // required props
  event,
  isTournamentActive,
  isQualification,

  // container props
  toggleExpanded,
  isExpanded,
  isMobileWidth,
  toggleButtonText,
  // optional props
}) => (
  <div
    className={classNames(
      styles.block,
      { [styles.isExpanded]: isExpanded },
    )}
  >
    <ButtonsBlock
      event={event}
      isQualification={isQualification}
    />
    <CalendarDateBlock
      dateFrom={event.dateFrom}
      dateTo={event.dateTo}
      isTournamentActive={isTournamentActive}
      isQualification={isQualification}
      event={event}
    />

    {isQualification && (
      <p className={styles.description}>
        {event.qualificationDescription}
      </p>
    )}

    {(!isQualification && isMobileWidth) && (
      <div className={classNames(
        styles.wrapButton,
        { [styles.notBordered]: isExpanded },
      )}
      >
        <button
          className={styles.button}
          type="button"
          onClick={toggleExpanded}
        >
          <span className={styles.text}>
            {toggleButtonText}
          </span>
          <Icon
            size="small"
            iconName="arrow-down-second"
            className={classNames(
              styles.icon,
              'u-ml-1',
            )}
          />
        </button>
      </div>
    )}

    {((!isMobileWidth && !isQualification) || isExpanded) && (
      <SocialClips
        event={event}
        isQualification={isQualification}
      />
    )}
  </div>
)

Body.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  toggleExpanded: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  event: eventCardPropType.isRequired,
  // container props
  isMobileWidth: PropTypes.bool.isRequired,
  toggleButtonText: PropTypes.string.isRequired,
  // optional props
  isTournamentActive: PropTypes.bool,
  isQualification: PropTypes.bool,
}

Body.defaultProps = {
  // optional props
  isQualification: false,
  isTournamentActive: false,
}

export default container(Body)
