import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import NotificationLabel from 'weplay-components/NotificationLabel'

import Participant from './Participant'
import container from './container'
import styles from './styles.scss'

const MatchesBlock = ({
  // required props

  // container props
  i18nTexts,
  // optional props
  isSetReminder,
  isGrandFinal,
}) => (
  <div
    className={styles.matchesWrap}
  >
    <div className={styles.matches}>
      <div className={styles.header}>
        <div className={styles.wrapStatus}>
          <p className={styles.text}>
            26.09 16:00
          </p>
        </div>
        <p className={styles.mainText}>
          Semifinal (B03)
        </p>
        <button
          type="button"
          className={styles.buttonIcn}
        >
          <Icon
            size="small"
            iconName="graph"
            className={classNames(
              styles.iconDiagram,
              styles.iconBlue,
            )}
          />
        </button>
      </div>
      <div className={styles.content}>
        <Participant />
        <Participant
          isLose
        />
      </div>
      <div className={styles.wrapButton}>
        <button
          type="button"
          className={classNames(
            styles.button,
            styles.highligths,
          )}
        >
          <Icon
            size="small"
            iconName="play"
            className={styles.icon}
          />
          <p className={styles.text}>
            {i18nTexts.events.eventsRootPage.matchesPreviewBlock.pastMatch.button}
          </p>
        </button>
      </div>
    </div>

    <div className={styles.matches}>
      <div className={styles.header}>
        <div className={styles.wrapStatus}>
          <NotificationLabel
            isActive
            className={styles.notification}
          />
          <p className={styles.text}>
            {i18nTexts.events.eventsRootPage.matchesPreviewBlock.presentMatch.status}
          </p>
        </div>
        <p className={styles.mainText}>
          Semifinal (B03)
        </p>
        <button
          type="button"
          className={styles.buttonIcn}
        >
          <Icon
            size="small"
            iconName="graph"
            className={classNames(
              styles.iconDiagram,
              styles.iconBlue,
            )}
          />
        </button>
      </div>
      <div className={styles.content}>
        <Participant
          betProvider="pariMatch"
          isLose
        />
        <Participant
          betProvider="onexBet"
        />
      </div>
      <div className={styles.wrapButton}>
        <button
          type="button"
          className={classNames(
            styles.button,
            styles.watch,
          )}
        >
          <Icon
            size="small"
            iconName="play"
            className={styles.icon}
          />
          <p className={styles.text}>
            {i18nTexts.events.eventsRootPage.matchesPreviewBlock.presentMatch.button}
          </p>
        </button>
      </div>
    </div>

    <div
      className={classNames(
        styles.matches,
        {
          [styles.isGrandFinal]: isGrandFinal,
        },
      )}
    >
      {isGrandFinal && (
        <Icon
          size="large"
          iconName="cup"
          className={styles.iconCup}
        />
      )}
      <div className={styles.header}>
        <div className={styles.wrapStatus}>
          <p className={styles.text}>
            26.09 16:00
          </p>
        </div>
        <p className={styles.mainText}>
          Grand final (B03) • LAN
        </p>
        <div className={styles.wrapIcons}>
          {isSetReminder && (
            <Icon
              size="small"
              iconName="notification-contained"
              className={styles.iconBlue}
            />
          )}
          <button
            type="button"
            className={styles.disabled}
          >
            <Icon
              size="small"
              iconName="graph"
              className={classNames(
                styles.iconDiagram,
                styles.disabled,
              )}
            />
          </button>
        </div>
      </div>
      <div className={styles.content}>
        <Participant
          betProvider="esBet"
        />
        <Participant
          betProvider="lootBet"
        />
      </div>
      <div className={styles.wrapButton}>
        {isSetReminder ? (
          <button
            type="button"
            className={classNames(
              styles.button,
              styles.reminder,
            )}
          >
            <Icon
              size="small"
              iconName="notification-contained"
              className={styles.icon}
            />
            <p className={styles.text}>
              {i18nTexts.events.eventsRootPage.matchesPreviewBlock.futureMatch.button}
            </p>
          </button>
        ) : (
          <button
            type="button"
            className={classNames(
              styles.button,
              styles.buy,
            )}
          >
            <Icon
              size="small"
              iconName="invite"
              className={styles.icon}
            />
            <p className={styles.text}>
              {i18nTexts.events.eventsRootPage.matchesPreviewBlock.futureMatch.buyButton}
            </p>
          </button>
        )}
      </div>
    </div>
  </div>

)

MatchesBlock.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  // container props

  // optional props
  isSetReminder: PropTypes.bool,
  isGrandFinal: PropTypes.bool,
}

MatchesBlock.defaultProps = {
  // optional props
  isSetReminder: false,
  isGrandFinal: false,
}

export default container(MatchesBlock)
