import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import Image from 'weplay-components/Image'

import container from './container'
import styles from './styles.scss'

const MainWinner = ({ // eslint-disable-line
  // required props
  winner,
  label,
  // container props
  isLanWinner,

  // optional props
  labelIconName,
  tournamentTitle,
  backgroundWinnerUrl,
}) => (
  <div
    className={classNames(
      styles.winnerContainer,
      styles[tournamentTitle],
    )}
  >

    {isLanWinner && (
      <Image
        className={styles.frame}
        src={backgroundWinnerUrl}
        alt=""
      />
    )}

    <div className={styles.imageWrap}>
      <figure className={styles.figure}>
        <Image
          className={styles.picture}
          src={winner.picture}
          alt={winner.name}
        />
      </figure>
    </div>

    <div className={styles.descriptionBlock}>
      <p className={styles.label}>
        {label}

        {Boolean(winner.prize) && (
          <span className="u-text-medium">
            <span className={styles.plus}>
              -
            </span>
            {`${winner.prize}$`}
          </span>
        )}

        {labelIconName && !isLanWinner && !winner.extra && (
          <>
            <span className={styles.plus}>
              {winner.prize ? '+' : '-'}
            </span>

            {labelIconName === 'invite' // TODO: Refactor if one more name in condition
              ? (
                <Icon
                  iconName={labelIconName}
                  className={styles.icon}
                />
              ) : (
                <Icon
                  iconName={labelIconName}
                  className={styles.icon}
                />
              )}
          </>
        )}
      </p>

      <p className={styles.name}>{winner.nickname}</p>
    </div>
  </div>
)

MainWinner.propTypes = {
  // required props
  winner: PropTypes.shape({
    nickname: PropTypes.string,
    picture: PropTypes.string,
    name: PropTypes.string,
    prize: PropTypes.string,
    extra: PropTypes.shape({}),
  }).isRequired,
  label: PropTypes.string.isRequired,
  // container props
  isLanWinner: PropTypes.bool,
  // optional props
  labelIconName: PropTypes.string,
  tournamentTitle: PropTypes.string,
  backgroundWinnerUrl: PropTypes.string,
}

MainWinner.defaultProps = {
  isLanWinner: false,
  tournamentTitle: '',
  labelIconName: '',
  backgroundWinnerUrl: '',
}

export default container(MainWinner)
