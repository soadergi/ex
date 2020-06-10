import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Image from 'weplay-components/Image'

import styles from './styles.scss'
import container from './container'

const Winner = ({
  i18nTexts,
  winner,
  stageTitle,
  winnerName,
}) => (
  <div
    className={styles.winner}
  >
    <p className={styles.label}>{i18nTexts.artifact.mainBanner.tournamentWinner}</p>

    <div className={styles.container}>
      <div className={classNames(
        styles.imageWrap,
        styles[stageTitle],
      )}
      >
        <figure className={styles.figure}>
          <Image
            className={styles.picture}
            src={winner.picture}
            alt={winner.name}
          />
        </figure>
      </div>
      <p className={styles.name}>{winnerName}</p>
    </div>
  </div>
)

Winner.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  stageTitle: PropTypes.string.isRequired,
  winnerName: PropTypes.string.isRequired,
  winner: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
}

export default container(Winner)
