import React, { useCallback } from 'react'
import classNames from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Section from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Image from 'weplay-components/Image'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import useConnectedTwitchAccountId from 'weplay-events/pages/EventPage/hooks/useConnectedTwitchAccountId'

import GuessWinnersStepsList from './GuessWinnersStepsList/GuessWinnersStepsList'
import { CONNECT_TWITCH_STEPS_LIST } from './mockup'
import styles from './ConnectTwitchBanner.scss'

/* eslint-disable max-len */
const backgroundUrl = 'https://static-prod.weplay.tv/2020-06-02/8f1f64819caddd9d8617e67a909418a0.0B152C-393A3D-42495C.jpeg'
const imageTwitchLargeUrl = 'https://static-prod.weplay.tv/2020-06-02/34a6f1130debe3fcfd89292922a6cca6.0D1A34-3CBBEB-C79695.png'
const imageTwitchSmallUrl = 'https://static-prod.weplay.tv/2020-06-02/dd4ab106c30e115752ab61efe9f542fc.0C1831-3CBBEB-C4A99D.png'
/* eslint-enable max-len */

const ConnectTwitchBanner = ({ setIsModalOpened }) => {
  const dispatch = useDispatch()
  const t = useTranslation()
  const isTabletWidth = useSelector(isTabletWidthSelector)
  const connectedTwitchAccountId = useConnectedTwitchAccountId()

  const handleClick = useCallback(() => {
    if (!connectedTwitchAccountId) {
      setIsModalOpened(true)
    }
  }, [connectedTwitchAccountId, setIsModalOpened, dispatch])

  return (
    <Section className={classNames(styles.section, 'u-p-0 u-pb-8')}>
      <ContentContainer>
        <div className={styles.block}>
          {!isTabletWidth && (
            <>
              <Image
                className={styles.background}
                src={backgroundUrl}
                alt=""
              />

              <Image
                className={styles.image}
                src={imageTwitchLargeUrl}
                alt=""
              />
            </>
          )}

          <div className={styles.wrap}>
            <p className={styles.title}>{t('events.guessWinnersTwitch.title')}</p>

            <p className={styles.description}>{t('events.guessWinnersTwitch.description')}</p>

            <Button
              className={styles.button}
              color={BUTTON_COLOR.TWITCH}
              onClick={handleClick}
              disabled={Boolean(connectedTwitchAccountId)}
              icon="twitch"
            >
              {t('events.guessWinnersTwitch.twitchButton.text')}
            </Button>

            {/* TODO: @Artem style this tip please */}
            {Boolean(connectedTwitchAccountId) && (
              <div className={styles.text}>
                {t('events.guessWinnersTwitch.twitchButton.hint')}
              </div>
            )}

            <GuessWinnersStepsList list={CONNECT_TWITCH_STEPS_LIST} />
          </div>
        </div>
      </ContentContainer>

      {isTabletWidth && (
        <Image
          className={styles.image}
          src={imageTwitchSmallUrl}
          alt=""
        />
      )}
    </Section>
  )
}

ConnectTwitchBanner.propTypes = {
  setIsModalOpened: PropTypes.func.isRequired,
}

export default ConnectTwitchBanner
