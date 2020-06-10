import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'

import { STAGE_STATUS } from '../../../consts'

import container from './container'
import styles from './styles.scss'

const TournamentRegistration = ({
  i18nTexts,
  isUserRegisteredForTournament,
  tournamentRegistration,
  currentStage,
  isTournamentInProgress,
  handleRegisterForTournament,

  trackDiscordLinkClick,
}) => {
  if (R.isEmpty(tournamentRegistration)) {
    return null
  }

  return (
    <div className={styles.registrationBlock}>
      <>
        {tournamentRegistration && !isUserRegisteredForTournament && (
          <button
            type="button"
            className={styles.button}
            onClick={handleRegisterForTournament}
          >
            <span>
              {isTournamentInProgress
                ? i18nTexts.artifact.mainBanner.stages[currentStage.id].tournamentRegistration.inProgress.button
                : i18nTexts.artifact.mainBanner.stages[currentStage.id].tournamentRegistration.scheduled.button}
            </span>
          </button>
        )}

        {isUserRegisteredForTournament && (
          <>
            <div className={styles.success}>
              <div className={styles.successIcon}>
                <Icon
                  iconName="check"
                  className={styles.icon}
                />
              </div>

              <p className={styles.successText}>{i18nTexts.artifact.mainBanner.confirmationText}</p>
            </div>

            <a
              href="https://discord.gg/WdsQEAq"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.discordLink}
              onClick={trackDiscordLinkClick}
            >
              <Icon
                iconName="discord"
                className={styles.discordIcon}
              />

              <span>{i18nTexts.EVENTS.discordLink}</span>
            </a>
          </>
        )}
      </>
    </div>
  )
}

TournamentRegistration.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  isUserRegisteredForTournament: PropTypes.bool.isRequired,
  handleRegisterForTournament: PropTypes.func.isRequired,
  trackDiscordLinkClick: PropTypes.func.isRequired,

  // optional props
  tournamentRegistration: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    title: {
      en: PropTypes.string,
      ru: PropTypes.string,
    },
  }),
  currentStage: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
  }),
  isTournamentInProgress: PropTypes.bool,
}

TournamentRegistration.defaultProps = {
  currentStage: {
    id: '1',
    status: STAGE_STATUS.SCHEDULED,
    title: '',
  },
  tournamentRegistration: {
    id: '2',
    status: STAGE_STATUS.SCHEDULED,
    title: {
      en: '',
      ru: '',
    },
  },
  isTournamentInProgress: false,
}

export default container(TournamentRegistration)
