import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getActiveTournamentLiveStreamSelector } from 'weplay-core/reduxs/activeTournament/selectors'

import MediaPlayer from 'weplay-components/MediaPlayer'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY, BUTTON_SIZE } from 'weplay-components/Button'
import Image from 'weplay-components/Image'

import { useMatchUpLinks } from 'weplay-mini-games/pages/GameMatchUpPage/useMatchUpLinks'

import styles from './Modals.scss'

const articlePlayer = ['articlePlayer']
const image = 'https://static-prod.weplay.tv/2020-06-05/4c948e0a6a905b53106e6e253ed4bb66.3C2014-DA805F-9C8C7E.png'

const EndGameModal = ({
  duration,
  onStartButtonClick,
}) => {
  const { liveStreamUrl } = useSelector(getActiveTournamentLiveStreamSelector)
  const isLiveStream = Boolean(liveStreamUrl)

  const t = useTranslation()
  const { tournamentsLink } = useMatchUpLinks()

  return (
    <div className={styles.container}>
      <>
        <h4 className={styles.title}>{t('mediaCore.gameMatchUp.modals.endGame.title')}</h4>

        <p className={styles.caption}>{t('mediaCore.gameMatchUp.modals.endGame.duration')}</p>
        <p className={styles.duration}>{duration}</p>

        <p className={styles.text}>{t('mediaCore.gameMatchUp.modals.endGame.nextGameText')}</p>
        <div className={styles.buttons}>
          <Button
            priority={BUTTON_PRIORITY.SECONDARY}
            onClick={onStartButtonClick}
          >
            {t('mediaCore.miniGames.buttons.tryAgain')}
          </Button>
        </div>
      </>

      {isLiveStream ? (
        <>
          <p className={styles.subtitle}>{t('mediaCore.gameMatchUp.modals.endGame.stream')}</p>
          <MediaPlayer
            url={liveStreamUrl}
            modifiers={articlePlayer}
            isAutoplay
            isStaticPosition
            className="u-mb-sm-5 u-mb-3"
          />
        </>
      ) : (
        <div className={styles.imageWrap}>
          <p className={styles.subtitle}>{t('mediaCore.gameMatchUp.modals.endGame.tournaments')}</p>
          <Button
            size={BUTTON_SIZE.SM}
            color={BUTTON_COLOR.CTA}
            href={tournamentsLink}
            target="_blank"
          >
            {t('mediaCore.miniGames.buttons.tournaments')}
          </Button>
          <Image
            src={image}
            className={styles.bye}
          />
        </div>
      )}
    </div>
  )
}

EndGameModal.propTypes = {
  duration: PropTypes.string.isRequired,
  onStartButtonClick: PropTypes.func.isRequired,
}

export default React.memo(EndGameModal)
