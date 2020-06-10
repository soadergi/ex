import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './styles.scss'
import container from './container'
import MainWinner from './MainWinner'

const MainWinners = ({
  // required props
  winner,
  label,
  showWinnersListHandler,
  isWinnersListCollapsed,

  // props from container
  i18nTexts,
  isLanWinner,

  // optional props
  tournamentTitle,
  labelIconName,
  backgroundWinnerUrl,
}) => (
  <div
    className={classNames(
      styles.winner,
      styles[tournamentTitle],
    )}
  >
    <div className={styles.wrap}>
      {winner.map
        ? winner.map(mainWinner => (
          <MainWinner
            key={mainWinner.uuid || mainWinner.id}
            winner={mainWinner}
            label={mainWinner.label}
            labelIconName={labelIconName}
            tournamentTitle={tournamentTitle}
            isLanWinner={isLanWinner}
          />
        ))
        : (
          <MainWinner
            winner={winner}
            label={label}
            labelIconName={labelIconName}
            tournamentTitle={tournamentTitle}
            isLanWinner={isLanWinner}
            backgroundWinnerUrl={backgroundWinnerUrl}
          />
        )}

      {isWinnersListCollapsed && (
        <div className={styles.buttonContainer}>
          <button
            className={classNames(
              styles.showButton,
              styles[tournamentTitle],
            )}
            type="button"
            onClick={showWinnersListHandler}
          >
            {i18nTexts.winterMadness.heroSection.winner.toggleButtonTitle.true}
          </button>
        </div>
      )}
    </div>
  </div>
)

MainWinners.propTypes = {
  // required props
  winner: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]).isRequired,
  label: PropTypes.string.isRequired,
  showWinnersListHandler: PropTypes.func.isRequired,
  isWinnersListCollapsed: PropTypes.bool.isRequired,

  // props from container
  i18nTexts: PropTypes.shape({}).isRequired,
  isLanWinner: PropTypes.bool,

  // optional props
  tournamentTitle: PropTypes.string,
  labelIconName: PropTypes.string,
  backgroundWinnerUrl: PropTypes.string,
}

MainWinners.defaultProps = {
  tournamentTitle: '',
  labelIconName: '',
  backgroundWinnerUrl: '',
  isLanWinner: false,
}

export default container(MainWinners)
