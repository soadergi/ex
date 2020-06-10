import i18n from 'i18n-react'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import * as R from 'ramda'
import { participantPropType } from 'customPropTypes'

import styles from './styles.scss'
import Winner from './Winner'
import container from './container'

const WinnersList = ({
  // required props
  hideWinnersListHandler,

  // props from container
  MVP,
  i18nTexts,
  tournamentTitle,
  winners,
  withMVP,

  // optional props
  labelIconName,
}) => (
  <div className={
    classNames(
      styles.winners,
      styles[tournamentTitle],
    )
}
  >
    <div className={styles.wrap}>
      <div className={styles.container}>
        <ul className={styles.list}>
          { winners.map((winnerObj) => {
            if (winnerObj.label) {
              return (
                <li
                  key={winnerObj.label}
                  className={styles.item}
                >
                  <Winner
                    iconName={winnerObj.iconName || 'bronzeCup'}
                    labelIconName={labelIconName}
                    iconClassName={styles.icon}
                    winnerLabel={styles.label}
                    label={winnerObj.label}
                    winner={winnerObj}
                    tournamentTitle={tournamentTitle}
                  />
                </li>
              )
            }
            const winnerPairs = R.toPairs(winnerObj)
            const winner = R.path([0, 1])(winnerPairs)
            const place = R.path([0, 0])(winnerPairs)
            // TODO @Artem think about better realization of this part
            return (
              winner.prize && (
                <li
                  key={winner.prize}
                  className={styles.item}
                >
                  <Winner
                    iconName={place === '2' ? 'silverCup' : 'cup-bronze-without-number'}
                    iconClassName={styles.icon}
                    winnerLabel={styles.label}
                    label={i18n.translate(i18nTexts.prizePool.place, { place })}
                    winner={winner}
                    tournamentTitle={tournamentTitle}
                  />
                </li>
              )
            )
          })}

          {withMVP && (
            <li className={styles.item}>
              <Winner
                iconName="jewels"
                iconClassName={styles.icon}
                winnerLabel={styles.winnerLabel}
                label={i18nTexts.winterMadness.heroSection.winner.winnerLabelMvp}
                winner={MVP}
                tournamentTitle={tournamentTitle}
              />
            </li>
          )}
        </ul>
      </div>

      <button
        className={classNames(
          styles.button,
          styles.isCollapsed,
        )}
        type="button"
        onClick={hideWinnersListHandler}
      >
        {i18nTexts.winterMadness.heroSection.winner.toggleButtonTitle.false}
      </button>
    </div>
  </div>
)

WinnersList.propTypes = {
  // required props

  // props from container
  winners: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  MVP: participantPropType.isRequired,
  hideWinnersListHandler: PropTypes.func.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  tournamentTitle: PropTypes.string,
  withMVP: PropTypes.bool.isRequired,

  // optional props
  labelIconName: PropTypes.string,
}

WinnersList.defaultProps = {
  // optional props
  tournamentTitle: '',
  labelIconName: '',
}

export default container(WinnersList)
