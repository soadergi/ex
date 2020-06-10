/* eslint-disable max-lines */
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { useFormatDatetime } from 'weplay-core/hooks/useFormatDatetime'
import { currentUserSteamIdSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import UserAvatar from 'weplay-components/UserAvatar'
import BackgroundImg from 'weplay-components/BackgroundImg'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import Wrapper from 'weplay-competitive/components/Wrapper'
import GameRouter from 'weplay-competitive/components/GameRouter/GameRouter'
import teamPropType from 'weplay-competitive/customPropTypes/teamPropType'
import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'
import organizerPropType from 'weplay-competitive/customPropTypes/organizerPropType'
import { TEAM_STATUSES } from 'weplay-competitive/constants/teamStatuses'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import { AT__TOURNAMENTS_LINK_TO_STEAM } from 'weplay-competitive/analytics/amplitude'
import useConnectSteamModal from 'weplay-competitive/hooks/useConnectSteamModal'

import container from './container'
import styles from './styles.scss'

export const PROFILE_MODS = {
  HIDE_DATE: 'hideDate',
  HIDE_STEAM: 'hideSteam',
}

const Profile = ({
  // required props
  handleClickEdit,
  record,
  isOwner,
  discipline,
  backgroundImage,
  toggleConnectSteamModal,
  // container props
  handleInputFile,
  hasErrorSizeOfImage,
  // optional props
  modifications,
  isGameRouter,
  isTitleH1,
  isPremiumAccount,
}) => {
  const t = useTranslation()
  const formatDatetime = useFormatDatetime()
  const {
    isSteamConnected,
  } = useConnectSteamModal()
  const currentUserSteamId = useSelector(currentUserSteamIdSelector)
  const isShowConnectSteamBtn = isOwner && !isSteamConnected && !modifications.includes(PROFILE_MODS.HIDE_STEAM)
  const userSteamId = record?.steamId || (isOwner && currentUserSteamId)
  const isShowSteamLink = !modifications.includes(PROFILE_MODS.HIDE_STEAM) && Boolean(userSteamId)
  return (
    <div className={styles.block}>
      {backgroundImage && (
        <BackgroundImg
          src={backgroundImage || ''}
        />
      )}
      <Wrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <UserAvatar
              avatar={record.logo ? record.logo : record.avatar}
              className={styles.preview}
              isPremiumAccount={isPremiumAccount}
              size="128"
            />
            <div className={styles.data}>
              {record?.status !== TEAM_STATUSES.ACTIVE && (
              <span className={classNames(
                styles.status,
                'u-color-error',
              )}
              >
                {t(`competitive.member.profile.${record.status}`)}
              </span>
              )}

              {isTitleH1
                ? <h1 className={styles.name}>{record.name}</h1>
                : <p className={styles.name}>{record.name}</p>}

              {record.tag && (
              <span>{record.tag}</span>
              )}

              {!modifications.includes(PROFILE_MODS.HIDE_DATE) && (
              <span className={styles.date}>
                {t('competitive.member.profile.since')}
                {' '}
                {formatDatetime(record.createDatetime, { formatKey: 'dateMonthYear' })}
              </span>
              )}

              {isShowSteamLink && (
                <Link
                  isExternal
                  to={`https://steamcommunity.com/profiles/${userSteamId}`}
                  className={styles.steamId}
                  {...getAnalyticsAttributes({
                    'amplitude-action': AT__TOURNAMENTS_LINK_TO_STEAM,
                    'amplitude-source': 'User Profile',
                  })}
                >
                  <Icon
                    iconName="steam"
                  />
                </Link>
              )}
              {isShowConnectSteamBtn && (
                <Button
                  color={BUTTON_COLOR.CTA}
                  icon="steam"
                  onClick={toggleConnectSteamModal}
                >
                  {t('competitive.tournament.modals.connectGameAndSteam.connectSteam')}
                </Button>
              )}
            </div>
          </div>

          {isOwner && (
          <div className={styles.right}>
            <ul className={styles.controls}>
              <li className={styles.control}>
                <span
                  onClick={handleClickEdit}
                  className={styles.controlItem}
                >
                  <Icon
                    iconName="edit"
                    className={styles.controlIcon}
                  />
                  {t('competitive.member.profile.edit')}
                </span>
              </li>
              <li className={styles.control}>
                <label
                  htmlFor="addCover"
                  className={styles.controlItem}
                >
                  <Icon
                    iconName="image"
                    className={styles.controlIcon}
                  />
                  {t('competitive.member.profile.cover')}
                  <input
                    type="file"
                    id="addCover"
                    className="u-hidden"
                    accept="image/jpeg, image/png, image/jpg"
                    onInput={handleInputFile}
                  />
                </label>
              </li>
            </ul>
            <span className={classNames(
              styles.tip,
              {
                [styles.hasError]: hasErrorSizeOfImage,
              },
            )}
            >
              {t('competitive.member.profile.recommended')}
            </span>
          </div>
          )}
        </div>
      </Wrapper>
      {isOwner && isGameRouter && (
      <GameRouter
        discipline={discipline}
      />
      )}
    </div>
  )
}

Profile.propTypes = {
  // required props
  handleClickEdit: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired,
  discipline: PropTypes.string.isRequired,
  // container props
  hasErrorSizeOfImage: PropTypes.bool.isRequired,
  handleInputFile: PropTypes.func.isRequired,
  record: PropTypes.oneOfType([
    teamPropType,
    memberPropType,
    tournamentPropType,
    organizerPropType,
  ]).isRequired,
  // optional props
  backgroundImage: PropTypes.string,
  modifications: PropTypes.arrayOf(PropTypes.oneOf(R.values(PROFILE_MODS))),
  isGameRouter: PropTypes.bool,
  toggleConnectSteamModal: PropTypes.func,
  isTitleH1: PropTypes.bool,
  isPremiumAccount: PropTypes.bool,
}

Profile.defaultProps = {
  // optional props
  backgroundImage: '',
  modifications: [],
  isGameRouter: false,
  toggleConnectSteamModal: null,
  isTitleH1: false,
  isPremiumAccount: false,
}

export default container(Profile)
