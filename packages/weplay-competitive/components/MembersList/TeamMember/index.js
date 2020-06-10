import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { pathWithParamsByRoute, NAMES } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import UserAvatar from 'weplay-components/UserAvatar'
import Link from 'weplay-components/Link'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import teamMemberPropType from 'weplay-competitive/customPropTypes/teamMemberPropType'
import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'
import RolesDropdown from 'weplay-competitive/components/MembersList/TeamMember/RolesDropdown'
import SteamInfo from 'weplay-competitive/components/MembersList/TeamMember/SteamInfo/SteamInfo'
import { AT__USER_DETAILS } from 'weplay-competitive/analytics/amplitude'
import { TEAM_MEMBER_STATUSES } from 'weplay-competitive/constants/teamMemberStatuses'

import styles from './styles.scss'
import container from './container'

const userAvatarResponsive = {
  sm: '40',
}

const TeamMember = ({
  // required props
  teamMember,
  handlerRemoveBtn,
  coreTeamMembersCount,
  showLeaveTeamMemberModal,
  isCaptain,
  // props from container
  discipline,
  isOwner,
  member,
  setTeamMemberStatus,
  // optional props
  captainMode,
  gameModeSize,
}) => {
  const t = useTranslation()
  return (
    <div
      className={classNames(
        styles.member,
      )}
    >
      <Link
        className={classNames(
          styles.user,
          styles.item,
        )}
        to={pathWithParamsByRoute(
          NAMES.MEMBER,
          {
            memberId: member.id,
            memberName: transliterate(member?.user?.nickname ?? ''),
            discipline,
          },
        )}
        {...getAnalyticsAttributes({
          'amplitude-action': AT__USER_DETAILS,
          'amplitude-discipline': discipline,
          'amplitude-source': LOOKUP,
        })}
      >
        {member.isFetched && (
          <UserAvatar
            avatar={member?.user?.avatar ?? ''}
            className={styles.preview}
            size="64"
            responsive={userAvatarResponsive}
            isPremiumAccount={member?.user?.isPremiumAccount ?? false}
          />
        )}
        <span className={styles.name}>
          {member?.user?.nickname ?? ''}
          {member?.status === TEAM_MEMBER_STATUSES.BANNED && (
            <span className={styles.banned}>
              {t('competitive.tournaments.statuses.BANNED')}
            </span>
          )}
        </span>
      </Link>
      {captainMode && isCaptain ? (
        <>
          <div className={classNames(
            styles.item,
            styles.isStatus,
          )}
          >
            <SteamInfo
              steamId={member?.user?.steamId ?? ''}
              isOwner={isOwner}
            />
          </div>
          <div className={styles.item}>
            <RolesDropdown
              teamMember={teamMember}
              setTeamMemberStatus={setTeamMemberStatus}
              coreTeamMembersCount={coreTeamMembersCount}
              gameModeSize={gameModeSize}
            />
          </div>
          <div className={styles.item}>
            <Button
              className={styles.wide}
              color={BUTTON_COLOR.GRAY}
              priority={BUTTON_PRIORITY.SECONDARY}
              onClick={handlerRemoveBtn}
            >
              {isOwner ? t('competitive.team.teamList.leave') : t('competitive.team.teamList.remove')}
            </Button>
          </div>
        </>
      )
        : (
          <>
            <div className={classNames(
              styles.item,
              styles.isStatus,
            )}
            >
              <SteamInfo
                steamId={member?.user?.steamId ?? ''}
                isOwner={isOwner}
              />
            </div>

            <div className={classNames(
              styles.item,
              styles.role,
            )}
            >
              <p className={styles.label}>{t('competitive.team.teamList.status')}</p>
              <p className={styles.status}>{t(`competitive.roles.${teamMember.role}`)}</p>
            </div>
          </>
        )}
      {isOwner && !isCaptain && (
        <div className={styles.item}>
          <Button
            color={BUTTON_COLOR.GRAY}
            priority={BUTTON_PRIORITY.SECONDARY}
            onClick={showLeaveTeamMemberModal}
          >
            {t('competitive.team.teamList.leave')}
          </Button>
        </div>
      )}
      {!isOwner && !isCaptain && (
      <div className={styles.item} />
      )}
    </div>
  )
}

TeamMember.propTypes = {
  // required props
  isCaptain: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  isSteamConnected: PropTypes.bool.isRequired,
  member: PropTypes.oneOfType([memberPropType, teamMemberPropType]).isRequired,
  teamMember: teamMemberPropType.isRequired,
  showLeaveTeamMemberModal: PropTypes.func.isRequired,

  // props from container
  handlerRemoveBtn: PropTypes.func.isRequired,
  setTeamMemberStatus: PropTypes.func.isRequired,
  coreTeamMembersCount: PropTypes.number.isRequired,
  discipline: PropTypes.string.isRequired,

  // optional props
  captainMode: PropTypes.bool,
  gameModeSize: PropTypes.number,
}

TeamMember.defaultProps = {
  // optional props
  captainMode: false,
  gameModeSize: NaN,
}

export default container(TeamMember)
