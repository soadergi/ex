import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { openLoginModal as openLoginModalAction } from 'weplay-core/reduxs/_legacy/modals/actions'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'
import Image from 'weplay-components/Image'

import ShareGameBlock from 'weplay-mini-games/components/ShareGameBlock/ShareGameBlock'

import styles from './Modals.scss'

const image = 'https://static-prod.weplay.tv/2020-06-09/d7631d35394aaa1e850f57aa78a715e8.040C2C-C3933B-3BB9E9.jpeg'

const StartGameModal = ({
  onStartButtonClick,
  isLoggedIn,
}) => {
  const t = useTranslation()
  const dispatch = useDispatch()

  const openLoginModal = () => dispatch(openLoginModalAction())
  const text = t(`mediaCore.gameMatchUp.modals.startGame.${isLoggedIn ? 'registeredText' : 'unregisteredText'}`)

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{t('mediaCore.gameMatchUp.modals.startGame.title')}</h4>
      <p className={styles.subtitle}>{t('mediaCore.gameMatchUp.modals.startGame.subtitle')}</p>

      <div className={styles.pairs}>
        <Image
          scr={image}
          className={styles.image}
          alt="pairs"
        />
        <Image
          scr={image}
          className={styles.image}
          alt="pairs"
        />
      </div>

      <p className={styles.text}>{text}</p>

      <div className={styles.buttons}>
        {!isLoggedIn ? (
          <>
            <Button
              color={BUTTON_COLOR.CTA}
              onClick={openLoginModal}
              className={styles.button}
            >
              {t('mediaCore.miniGames.buttons.join')}
            </Button>
            <Button
              priority={BUTTON_PRIORITY.SECONDARY}
              color={BUTTON_COLOR.WHITE}
              onClick={onStartButtonClick}
              className={styles.button}
            >
              {t('mediaCore.miniGames.buttons.skipAndPlay')}
            </Button>
          </>
        ) : (
          <Button
            color={BUTTON_COLOR.CTA}
            onClick={onStartButtonClick}
            className={styles.button}
          >
            {t('mediaCore.miniGames.buttons.play')}
          </Button>
        )}
      </div>

      <ShareGameBlock
        caption={t('mediaCore.miniGames.share')}
        shareText={t('mediaCore.gameMatchUp.shareGameBlock.shareText')}
        className={styles.shareWrap}
      />
    </div>
  )
}

StartGameModal.propTypes = {
  onStartButtonClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}

export default React.memo(StartGameModal)
