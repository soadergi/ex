import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getActiveTournamentLiveStreamSelector } from 'weplay-core/reduxs/activeTournament/selectors'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import MediaPlayer from 'weplay-components/MediaPlayer'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY, BUTTON_SIZE } from 'weplay-components/Button'
import Image from 'weplay-components/Image'

import { IMAGES } from '../config'

import styles from './styles.scss'

const articlePlayer = ['articlePlayer']

const EndGameModal = ({
  isLoggedIn,
  restartGame,
}) => {
  const { liveStreamUrl } = useSelector(getActiveTournamentLiveStreamSelector)
  const isLiveStream = Boolean(liveStreamUrl)

  const t = useTranslation()
  const tournamentsLink = pathWithParamsByRoute(NAMES.TOURNAMENTS, { discipline: 'dota2' })

  const modalText = t(`mediaCore.game2048.popup.gameOver.${isLoggedIn ? 'registeredText' : 'unRegisteredText'}`)

  return (
    <div className={styles.content}>
      <div className={styles.infoWrap}>
        <p className={styles.title}>
          {t('mediaCore.game2048.popup.gameOver.title')}
        </p>
        <p className={styles.text}>
          {modalText}
        </p>
        <div className={styles.buttonWrapper}>
          <Button
            priority={BUTTON_PRIORITY.LINK}
            onClick={restartGame}
            className={styles.restart}
          >
            {t('mediaCore.game2048.popup.button.tryAgain')}
          </Button>
        </div>
      </div>

      {isLiveStream ? (
        <>
          <p className={styles.text}>{t('mediaCore.game2048.popup.gameOver.stream')}</p>
          <MediaPlayer
            url={liveStreamUrl}
            modifiers={articlePlayer}
            isAutoplay
            isStaticPosition
          />
        </>
      ) : (
        <div className={styles.imageWrap}>
          <p className={styles.text}>{t('mediaCore.game2048.popup.gameOver.tournaments')}</p>
          <Button
            size={BUTTON_SIZE.SM}
            color={BUTTON_COLOR.CTA}
            href={tournamentsLink}
            target="_blank"
          >
            {t('mediaCore.game2048.banner.tournamentsList.button')}
          </Button>
          <Image
            src={IMAGES.TOURNAMENTS}
            className={styles.background}
          />
        </div>
      )}
    </div>
  )
}

EndGameModal.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  restartGame: PropTypes.func.isRequired,
}

export default EndGameModal
