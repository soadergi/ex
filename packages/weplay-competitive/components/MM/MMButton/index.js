import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import useAction from 'weplay-core/helpers/useAction'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { openLoginModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import useMoment from 'weplay-core/hooks/useMoment'
import { SUB_API_ACTIONS } from 'weplay-core/consts/subApiActions'

import Button, { BUTTON_SIZE, BUTTON_COLOR } from 'weplay-components/Button'

import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { MEMBER_STATUSES } from 'weplay-competitive/constants/memberStatuses'
import { membersActions } from 'weplay-competitive/reduxs/members'
import useConnectSteamModal from 'weplay-competitive/hooks/useConnectSteamModal'
import useMMSettings from 'weplay-competitive/hooks/MM/useMMSettings'
import { userPenaltiesSelectors } from 'weplay-competitive/reduxs/userPenalties'
import { PENALTIES_NAMES } from 'weplay-competitive/constants/penalties'
import { useCountdown } from 'weplay-competitive/hooks/useCountdown'
import useMMActiveMatch from 'weplay-competitive/hooks/MM/useMMActiveMatch'
import ConnectSteam from 'weplay-competitive/components/Modals/ConnectSteam/ConnectSteam'
import { MMMatchesActions } from 'weplay-competitive/reduxs/MMMatches'

import styles from './styles.scss'

const MMButton = () => {
  const t = useTranslation()
  const dispatch = useDispatch()
  const { moment } = useMoment()
  const { openMMSettingsModal } = useMMSettings()
  const { isActiveMMMatch, openActiveMMMatch } = useMMActiveMatch()
  const {
    isShownConnectSteam,
    toggleConnectSteamModal,
    isSteamConnected,
  } = useConnectSteamModal()

  const currentMember = useSelector(currentMemberSelector)
  const isLoggedIn = useSelector(isLoggedInSelector)
  const userPenalties = useSelector(userPenaltiesSelectors.allRecordsSelector)

  const { openLogin } = useAction({ openLogin: openLoginModal })
  const { createMember } = useAction({ createMember: membersActions.createRecord.request })

  const mmPenalty = useMemo(
    () => userPenalties.find(
      penalty => penalty.penaltyName === PENALTIES_NAMES.MM_CHECKIN_PENALTY && penalty.active,
    ),
    [userPenalties],
  )
  const endDatePenalty = isLoggedIn && mmPenalty?.endDate
  const {
    hours,
    minutes,
    seconds,
    isPassed,
  } = useCountdown(endDatePenalty)
  const hasPenalty = moment && !isPassed && moment(endDatePenalty).diff(moment()) > 0

  const isDisabled = currentMember.status === MEMBER_STATUSES.BANNED || hasPenalty

  const handleStartMM = useCallback(() => {
    if (!isLoggedIn) {
      return openLogin()
    }
    if (isLoggedIn && !currentMember) {
      return createMember()
        .then(toggleConnectSteamModal)
    }
    if (!isSteamConnected) {
      return toggleConnectSteamModal()
    }
    return openMMSettingsModal()
  },
  [
    isLoggedIn,
    openLogin,
    toggleConnectSteamModal,
    openMMSettingsModal,
    isSteamConnected,
    createMember,
    currentMember,
  ])

  useEffect(() => {
    dispatch(MMMatchesActions.queryRecords.request({
      subApiAction: SUB_API_ACTIONS.ME,
    }))
  }, [dispatch])

  return (
    <>
      <div className={styles.block}>
        {isActiveMMMatch
          ? (
            <Button
              className={styles.button}
              size={BUTTON_SIZE.MD}
              color={BUTTON_COLOR.SUCCESS}
              icon="play-icon"
              disabled={isDisabled}
              onClick={openActiveMMMatch}
            >
              {t('competitive.headerLinks.activeMatch')}
            </Button>
          )
          : (
            <Button
              className={styles.button}
              size={BUTTON_SIZE.MD}
              color={BUTTON_COLOR.CTA}
              icon="play-icon"
              disabled={isDisabled}
              onClick={handleStartMM}
            >
              {t('competitive.matchmaking.playButton')}
            </Button>
          )}
        {hasPenalty && (
        <p className={classNames(
          styles.hint,
          styles.warning,
        )}
        >
          {t('competitive.matchmaking.penaltyMessage')}
          {isPassed ? '' : `${+hours ? ` ${hours}:` : ' '}${minutes}:${seconds}`}
        </p>
        )}
        {currentMember.status === MEMBER_STATUSES.BANNED && (
        <p className={classNames(
          styles.hint,
          styles.error,
        )}
        >
          {t('competitive.matchmaking.bannedMessage')}
        </p>
        )}
      </div>
      {isShownConnectSteam && (
        <ConnectSteam
          isShown={isShownConnectSteam}
          closeHandler={toggleConnectSteamModal}
          finalActionName="playMatchmaking"
          finalAction={openMMSettingsModal}
        />
      )}
    </>
  )
}

MMButton.propTypes = {
  // required props
  // optional props
}

MMButton.defaultProps = {
  // optional props
}

export default MMButton
