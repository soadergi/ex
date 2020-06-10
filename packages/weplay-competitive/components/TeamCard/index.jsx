import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { WIDTH_SM } from 'weplay-core/reduxs/_legacy/layout/consts'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import UserAvatar from 'weplay-components/UserAvatar'
import BackgroundImg from 'weplay-components/BackgroundImg'
import teamPropType from 'weplay-competitive/customPropTypes/teamPropType'
import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'
import InviteMembersModal from 'weplay-competitive/components/Modals/InviteMembersModal'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import { AT__TEAM_DETAILS } from 'weplay-competitive/analytics/amplitude'

import container from './container'
import placeholder from './img/placeholder.svg'
import styles from './styles.scss'

const SMALL_SIZE = 250
const MEDIUM_SIZE = 350
const widths = [SMALL_SIZE, MEDIUM_SIZE, WIDTH_SM]
const TeamCard = ({
  // required props
  team,
  isOwner,
  // props from container
  isShownInviteMembersModal,
  hideInviteMembers,
  showInviteMembers,
  teamSize,
  totalTeamMembers,
  members,
  isCaptain,
  captainMemberId,
  handleClickTeamCard,
  gameModeTitle,
  discipline,
  // optional props

}) => {
  const t = useTranslation()
  return (
    <>
      {
        team.isFetched && (
          <div className={styles.block}>
            <BackgroundImg
              src={
                team.backgroundAvatar
                || DISCIPLINES[discipline].backgrounds.teamCardPlaceholder
              }
              widths={widths}
              sizes="(max-width: 640px) 100vw, 350px"
            />
            <div className={styles.header}>
              <UserAvatar
                avatar={team.avatar}
                className={styles.avatar}
                size="64"
                isPlaceholderDark
              />
              <p className={styles.title}>
                {team.name}
              </p>
              <p className={styles.subTitle}>
                {gameModeTitle}
              </p>
              {isOwner && isCaptain && (
                <button
                  type="button"
                  className={styles.addUserButton}
                  onClick={showInviteMembers}
                >
                  <Icon
                    iconName="add-member"
                    className={styles.addUserButtonIcon}
                  />
                </button>
              )}
            </div>

            <div className={styles.team}>
              <>
                <ul className={styles.members}>
                  {members.map(member => (
                    <li
                      className={styles.membersItem}
                      key={R.path(['id'], member)}
                    >
                      <Link
                        to={pathWithParamsByRoute(
                          NAMES.MEMBER,
                          {
                            memberId: R.path(['id'], member),
                            memberName: transliterate(R.pathOr('', ['user', 'nickname'], member)),
                            discipline,
                          },
                        )}
                      >
                        {captainMemberId === member.id && (
                          <span
                            className={classNames(
                              styles.icon,
                              {
                                [styles.isPremium]: R.pathOr(false, ['user', 'isPremiumAccount'], member),
                              },
                            )}
                          >
                            c
                          </span>
                        )}
                        <UserAvatar
                          avatar={R.path(['user', 'avatar'], member) || placeholder}
                          className={styles.memberAvatar}
                          size="40"
                          isPlaceholderDark
                          isPremiumAccount={R.pathOr(false, ['user', 'isPremiumAccount'], member)}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <span className={styles.counter}>
                  {totalTeamMembers > teamSize
                    ? ` + ${totalTeamMembers - teamSize}`
                    : totalTeamMembers }
                  {' '}
                  {t('competitive.member.teamCard.members')}
                </span>
                <Link
                  to={pathWithParamsByRoute(
                    NAMES.TEAM,
                    {
                      teamId: team.id,
                      teamName: transliterate(team.name),
                      discipline,
                    },
                  )}
                  onClick={handleClickTeamCard}
                  {...getAnalyticsAttributes({
                    'amplitude-action': AT__TEAM_DETAILS,
                    'amplitude-discipline': discipline,
                    'amplitude-source': LOOKUP,
                  })}
                  className={styles.link}
                >
                  {/* because child in Link is required (opacity: 0) */}
                  {'team link'}
                </Link>
              </>
            </div>
          </div>
        )
}

      {isShownInviteMembersModal && (
        <InviteMembersModal
          isShown={isShownInviteMembersModal}
          onCloseModal={hideInviteMembers}
          teamId={team.id}
          teamName={team.name}
        />
      )}
    </>
  )
}

TeamCard.propTypes = {
  // required props
  team: teamPropType.isRequired,
  isOwner: PropTypes.bool.isRequired,
  // props from container
  isShownInviteMembersModal: PropTypes.bool.isRequired,
  hideInviteMembers: PropTypes.func.isRequired,
  showInviteMembers: PropTypes.func.isRequired,
  gameModeTitle: PropTypes.string.isRequired,
  teamSize: PropTypes.number.isRequired,
  totalTeamMembers: PropTypes.number.isRequired,
  members: PropTypes.arrayOf(memberPropType).isRequired,
  isCaptain: PropTypes.bool.isRequired,
  captainMemberId: PropTypes.number.isRequired,
  handleClickTeamCard: PropTypes.func.isRequired,
  discipline: PropTypes.string.isRequired,
  // optional props
}

TeamCard.defaultProps = {
  // optional props
}

export default container(TeamCard)
