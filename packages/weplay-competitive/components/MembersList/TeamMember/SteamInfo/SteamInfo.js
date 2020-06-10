import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { currentUserSteamIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import { AT__TOURNAMENTS_LINK_TO_STEAM } from 'weplay-competitive/analytics/amplitude'
import ConnectSteam from 'weplay-competitive/components/Modals/ConnectSteam/ConnectSteam'
import useConnectSteamModal from 'weplay-competitive/hooks/useConnectSteamModal'

import styles from '../styles.scss'

const SteamInfo = ({
  steamId,
  isOwner,
}) => {
  const t = useTranslation()
  const currentUserSteamId = useSelector(currentUserSteamIdSelector)
  const {
    isShownConnectSteam,
    toggleConnectSteamModal,
    isSteamConnected,
  } = useConnectSteamModal()

  const showSteam = steamId || (isOwner && currentUserSteamId)
  const showAddSteamBtn = isOwner && !isSteamConnected
  const showSteamNotConnected = !isOwner && !steamId
  return (
    <>
      {showAddSteamBtn
        ? (
          <Button
            className={styles.wide}
            color={BUTTON_COLOR.CTA}
            icon="steam"
            onClick={toggleConnectSteamModal}
          >
            {t('competitive.tournament.modals.connectGameAndSteam.connectSteam')}
          </Button>
        )
        : <p className={styles.label}>{t('competitive.team.teamList.steam')}</p>}
      {showSteam && (
        <Link
          isExternal
          to={`https://steamcommunity.com/profiles/${isOwner ? currentUserSteamId : steamId}`}
          className={styles.steamId}
          {...getAnalyticsAttributes({
            'amplitude-action': AT__TOURNAMENTS_LINK_TO_STEAM,
            'amplitude-source': 'User Profile',
          })}
        >
          <Icon
            className={styles.icon}
            iconName="steam"
          />
        </Link>
      )}
      {showSteamNotConnected && (
        <p className={classNames(styles.status, 'u-color-error')}>
          {t('competitive.team.teamList.steamNotConnected')}
        </p>
      )}
      {isShownConnectSteam && (
        <ConnectSteam
          isShown={isShownConnectSteam}
          closeHandler={toggleConnectSteamModal}
          finalActionName="playMatchmaking"
          finalAction={toggleConnectSteamModal}
        />
      )}
    </>
  )
}

SteamInfo.propTypes = {
  steamId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  isOwner: PropTypes.bool.isRequired,
}

export default SteamInfo
