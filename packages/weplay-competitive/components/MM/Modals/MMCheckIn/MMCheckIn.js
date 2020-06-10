import React from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { currentUserSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import ModalBase from 'weplay-components/ModalBase'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY, BUTTON_SIZE } from 'weplay-components/Button'

import PlayerAvatar from 'weplay-competitive/components/PlayerAvatar'
import MMTimer from 'weplay-competitive/components/MM/MMTimer'
import Status from 'weplay-competitive/components/Status'
import useMMCheckIn from 'weplay-competitive/hooks/MM/useMMCheckIn'
import useMMCheckInSocket from 'weplay-competitive/hooks/MM/sockets/useMMCheckInSocket'
import { PENALTIES_NAMES } from 'weplay-competitive/constants/penalties'
import { CRITICAL_SECONDS_VALUE } from 'weplay-competitive/constants/countDown'
import usePenalty from 'weplay-competitive/hooks/usePenalty'
import useMMActiveMatch from 'weplay-competitive/hooks/MM/useMMActiveMatch'
import useMMMatchUsers from 'weplay-competitive/hooks/MM/useMMMatchUsers'
import { useCountdown } from 'weplay-competitive/hooks/useCountdown'

import styles from './styles.scss'

const MMModifier = ['MMModal', 'sm']

const MMCheckIn = () => {
  const t = useTranslation()
  const { activeMMMatch } = useMMActiveMatch()
  const {
    minutes,
    seconds,
    isPassed,
    secondsTotal,
  } = useCountdown(activeMMMatch?.endCheckinTime ?? '')
  const {
    handleAcceptCheckIn,
    handleDeclineCheckIn,
    isActiveMMCheckInModal,
  } = useMMCheckIn(activeMMMatch)
  const {
    currentMMUser,
    opponentsMMUsers,
  } = useMMMatchUsers(activeMMMatch)
  useMMCheckInSocket()
  const { penaltyTimeText } = usePenalty(PENALTIES_NAMES.MM_CHECKIN_PENALTY)

  const currentUser = useSelector(currentUserSelector)

  const isCheckedInCurrentUser = Boolean(currentMMUser?.checkIn)

  return (
    <ModalBase
      isShown={isActiveMMCheckInModal}
      modifiers={MMModifier}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>
          {isCheckedInCurrentUser
            ? t('competitive.modals.matchmaking.waitingTitle')
            : t('competitive.modals.matchmaking.foundMatchTitle')}
        </h1>
        <MMTimer
          isActiveTimer={!isPassed}
          isWarning={secondsTotal < CRITICAL_SECONDS_VALUE}
          minutes={minutes}
          seconds={seconds}
          size="sm"
        />
        <div
          className={styles.grid}
          key="MMUsers"
        >
          <div className={styles.row}>
            <div>
              <PlayerAvatar
                key={`UserAvatar${currentUser.id}`}
                id={currentUser.id}
                className="u-mb-1"
                size="96"
              />
              <Status
                key={`Status${currentUser.id}`}
                isSuccess={isCheckedInCurrentUser}
              >
                {isCheckedInCurrentUser
                  ? t('competitive.modals.matchmaking.ready')
                  : t('competitive.modals.matchmaking.notReady')}
              </Status>
            </div>
            <div className={styles.divider}>
              VS
            </div>
            {opponentsMMUsers.map(opponentUser => (
              <div key={opponentUser.id}>
                <PlayerAvatar
                  key={`UserAvatar${opponentUser.id}`}
                  id={opponentUser.id}
                  className="u-mb-1"
                  size="96"
                />
                <Status
                  isSuccess={Boolean(opponentUser.checkIn)}
                  key={`Status${opponentUser.id}`}
                >
                  {opponentUser.checkIn
                    ? t('competitive.modals.matchmaking.ready')
                    : t('competitive.modals.matchmaking.notReady')}
                </Status>
              </div>
            ))}
          </div>

        </div>

        <div className={styles.footer}>
          {!isCheckedInCurrentUser && (
            <>
              <Button
                key="acceptButton"
                className={styles.accept}
                size={BUTTON_SIZE.LG}
                color={BUTTON_COLOR.SUCCESS}
                priority={BUTTON_PRIORITY.PRIMARY}
                onClick={handleAcceptCheckIn}
              >
                {t('competitive.modals.matchmaking.acceptMatchButton')}
              </Button>
              <Button
                key="declineButton"
                className={styles.decline}
                size={BUTTON_SIZE.LG}
                priority={BUTTON_PRIORITY.GHOST_WHITE}
                onClick={handleDeclineCheckIn}
              >
                {t('competitive.modals.matchmaking.declineButton')}
              </Button>
            </>
          )}
        </div>
        {/* TODO: @Tetiana add information about penalty */}
        <p className={styles.hint}>
          {isCheckedInCurrentUser
            ? t('competitive.modals.matchmaking.acceptHint')
            : t('competitive.modals.matchmaking.declineHint', { penalty: penaltyTimeText })}
        </p>
      </div>
    </ModalBase>
  )
}

export default MMCheckIn
