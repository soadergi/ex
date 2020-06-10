import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'

import Avatar from 'weplay-components/Avatar'

import styles from './styles.scss'

const TournamentWinner = ({
  winner,
  prize,
  isMVP,
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <Avatar
        className={styles.image}
        size="96"
        avatar={winner.logoUrl}
        alt="winner-logo"
      />

      <div className={styles.wrapContent}>
        <span className={styles.headerText}>
          {t(`events.eventHeroSection.tournamentWinner.${isMVP ? 'mvpText' : 'headerText'}`)}
        </span>

        {isMVP && <span>{winner.nickname}</span>}

        <span className={styles.nickname}>
          {winner.name}
          {isMVP && ` ${winner.surname}`}
        </span>

        {!isMVP && <span className={styles.prize}>{`$${formatPrizeWithDigit(prize)}`}</span>}

        {isMVP && <span>{winner.teamName}</span>}
      </div>
    </div>
  )
}

TournamentWinner.propTypes = {
  winner: PropTypes.shape({
    logoUrl: PropTypes.string,
    name: PropTypes.string,
    nickname: PropTypes.string,
    surname: PropTypes.string,
    teamName: PropTypes.string,
  }).isRequired,
  prize: PropTypes.number,

  // optional Props
  isMVP: PropTypes.bool,
}

TournamentWinner.defaultProps = {
  isMVP: false,
  prize: null,
}

export default TournamentWinner
