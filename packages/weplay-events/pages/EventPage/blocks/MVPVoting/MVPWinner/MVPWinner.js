import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Image from 'weplay-components/Image'
import Skeleton from 'weplay-components/Skeleton'

import styles from './MVPWinner.scss'

const imageUrl = 'https://static-prod.weplay.tv/2020-05-28/51f887371fa00c48b9b8d424c8b5266e.3CBCEC-3CBCE4-40BCEC.png'

const MVPWinner = ({
  className,
  winner,
  title,
  prize,
}) => {
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false)
  const setAvatarLoaded = useCallback(() => setIsAvatarLoaded(true), [])

  const [isTeamLogoLoaded, setIsTeamLogoLoaded] = useState(false)
  const setTeamLogoLoaded = useCallback(() => setIsTeamLogoLoaded(true), [])

  return (
    <div className={classNames(
      styles.mvpWinner,
      styles.block,
      className,
    )}
    >
      <Image
        className={classNames(
          styles.mvpLogo,
          { [styles.isHidden]: !isAvatarLoaded },
        )}
        src={winner?.logoUrl || imageUrl}
        alt="mvp-avatar"
        onLoad={setAvatarLoaded}
      />

      {!isAvatarLoaded && (
        <Skeleton height="300px" />
      )}

      <div>
        <p className={styles.title}>{title}</p>

        <p className={styles.prizePool}>{prize}</p>
      </div>

      {winner && (
        <div>
          {winner.nickname && <p className={styles.name}>{winner.nickname}</p>}

          {(winner.name || winner.surname) && (
            <p className={styles.fullName}>
              {`${winner.name} ${winner.surname}`}
            </p>
          )}

          {winner.teamLogoUrl && (
            <Image
              className={classNames(
                styles.teamLogo,
                { [styles.isHidden]: !isTeamLogoLoaded },
              )}
              src={winner.teamLogoUrl}
              alt="team-logo"
              onLoad={setTeamLogoLoaded}
            />
          )}

          {winner.teamLogoUrl && !isTeamLogoLoaded && (
            <Skeleton
              circle
              width="24px"
              height="24px"
            />
          )}

          {winner.teamName && <span className={styles.teamName}>{winner.teamName}</span>}
        </div>
      )}
    </div>
  )
}

MVPWinner.propTypes = {
  winner: PropTypes.shape({
    nickname: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    logoUrl: PropTypes.string,
    teamLogoUrl: PropTypes.string,
    teamName: PropTypes.string,
  }),
  title: PropTypes.string,
  prize: PropTypes.string,
  className: PropTypes.string,
}

MVPWinner.defaultProps = {
  winner: {},
  title: '',
  prize: '',
  className: '',
}

export default MVPWinner
