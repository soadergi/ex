import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_SIZE, BUTTON_PRIORITY } from 'weplay-components/Button'
import ModalBase from 'weplay-components/ModalBase'
import Icon from 'weplay-components/Icon'

import MMTimer from 'weplay-competitive/components/MM/MMTimer'
import useTimer from 'weplay-competitive/hooks/useTimer'
import useMMQueue from 'weplay-competitive/hooks/MM/useMMQueue'

import styles from './styles.scss'

const MMModifier = ['MMModal', 'md']

const ONE_HOUR_IN_SECONDS = 3600

const MMSearch = ({
  // required props
  isShown,
  // optional props
}) => {
  const t = useTranslation()
  const { MMQueue, handleDeleteQueue } = useMMQueue()
  const {
    hours,
    minutes,
    seconds,
    isActiveTimer,
    secondsTotal,
  } = useTimer(MMQueue?.addTime ?? '')

  useEffect(() => {
    if (secondsTotal > ONE_HOUR_IN_SECONDS) {
      handleDeleteQueue()
    }
  }, [secondsTotal, handleDeleteQueue])

  return (
    <ModalBase
      isShown={isShown}
      modifiers={MMModifier}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>
          {t('competitive.matchmaking.searchMatchTitle')}
        </h1>
        {isActiveTimer && (
          <MMTimer
            isActiveTimer={isActiveTimer}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            size="md"
          />
        )}
        {!isActiveTimer && (
        <Icon
          className={styles.icon}
          iconName="loading"
          size="large"
        />
        )}
        <div className={styles.footer}>
          <Button
            size={BUTTON_SIZE.LG}
            priority={BUTTON_PRIORITY.SECONDARY}
            onClick={handleDeleteQueue}
          >
            {t('competitive.matchmaking.stopSearchButton')}
          </Button>
        </div>
        <img
          className={styles.hero}
          src="https://static-prod.weplay.tv/2020-02-17/7638cd9f9beca1d8ed1051caa4f95b6f.2C3035-B3BABD-829FBA.png" /* eslint-disable-line max-len */
          alt=""
        />
      </div>
    </ModalBase>
  )
}

MMSearch.propTypes = {
  // required props
  isShown: PropTypes.bool.isRequired,
  // optional props
}

MMSearch.defaultProps = {
  // optional props
}

export default MMSearch
