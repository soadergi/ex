/* eslint-disable max-lines */
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import CopyLink from 'weplay-components/CopyLink/loadable'
import DividedDateTime from 'weplay-components/DividedDateTime'
import NotificationLabel from 'weplay-components/NotificationLabel'
import ConfirmModal from 'weplay-components/Modals/ConfirmModal'
import Tip from 'weplay-components/Tip'
import Link from 'weplay-components/Link'
import AlertModal from 'weplay-components/Modals/AlertModal'

import teamPropType from 'weplay-competitive/customPropTypes/teamPropType'
import gamePropType from 'weplay-competitive/customPropTypes/gamePropType'
import memberPropType from 'weplay-competitive/customPropTypes/memberPropType'
import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'
import InviteMembersModal from 'weplay-competitive/components/Modals/InviteMembersModal'
import PickStandInMembersModal from 'weplay-competitive/components/Modals/PickStandInMembersModal'
import { ACCESS_TYPES } from 'weplay-competitive/constants/accessTypes'
import { TOURNAMENT_STATUSES } from 'weplay-competitive/constants/tournamentStatuses'
import { TOURNAMENT_RULE_LINKS } from 'weplay-competitive/constants/tournamentRuleLinks'
import ConnectSteam from 'weplay-competitive/components/Modals/ConnectSteam/ConnectSteam'

import styles from './styles.scss'
import Winner from './Winner'
import container from './container'
import EmptySlots from './EmptySlots'
import JoinTournament from './JoinTournament'
import TournamentGame from './TournamentGame'
import ScrollSpyAnchors from './ScrollSpyAnchors'

const scrollSpyLinks = [
  {
    to: '#id1',
    isActive: true,
  },
  {
    to: '#id2',
    isActive: false,
  },
]

const ShortTournamentInfo = ({
  // required props
  currentTournament,
  gameMode,
  tournamentGame,
  scrollSpySections,
  isFetchedTournamentInfo,
  // props from container
  locale,
  handlerJoinTournament,
  disableJoinBtn,
  tipType,
  goToMemberProfile,
  previewImage,
  isCurrentMemberInTournament,
  currentTeamId,
  standInMembers,
  onJoinTournamentWithStandIn,
  winner,
  currentTeamName,
  isShownConnectGameAndSteamModal,
  hideConnectGameAndSteamModal,
  inviteLink,
  accessIcon,
  isSmallLaptopTournamentWidth,
  isDynamicPrize,
  hasTip,
  // Modals
  activeAlertModalType,
  hideAlertModal,
  activeConfirmModalType,
  hideConfirmModal,
  handleConfirm,
  activeInviteMembersModal,
  hideInviteMembersModal,
  activePickStandInMembersModal,
  hidePickStandInMembersModal,
  handlerFinishAndJoinTournament,
  isRejectedByDeleteCount,
  confirmModalModifiers,
  // props from HOCs
  discipline,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <>
      <div className={styles.stickyWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <div className={styles.content}>
              <div className={styles.item}>
                {tournamentGame.isFetched && (
                <TournamentGame
                  tournamentGame={tournamentGame}
                  gameMode={gameMode}
                />
                )}
              </div>
              <div className={styles.item}>
                <span className={classNames(
                  styles.header,
                  styles.smallText,
                )}
                >
                  <NotificationLabel
                    className={styles.label}
                    color={classNames(
                      {
                        isSuccess: currentTournament.status === TOURNAMENT_STATUSES.ONGOING,
                        isWarning: currentTournament.status === TOURNAMENT_STATUSES.UPCOMING,
                        isDisabled: currentTournament.status === TOURNAMENT_STATUSES.ENDED,
                        '': currentTournament.status === TOURNAMENT_STATUSES.CANCELED,
                      },
                    )}
                  />
                  {t(`competitive.tournaments.statuses.${currentTournament.status}`)}
                </span>
                <div className="u-mt-1 u-pl-2">
                  <Tip>
                    <DividedDateTime dateTime={currentTournament.startDatetime} />
                  </Tip>
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.item}>
                {winner.isFetched ? (
                  <Winner
                    winner={winner}
                    discipline={discipline}
                  />
                ) : (
                  <EmptySlots
                    emptySlots={currentTournament.emptySlots}
                    totalSlots={currentTournament.totalSlots}
                  />
                )}
              </div>

              <div className={styles.item}>
                <Icon
                  title={t(`competitive.tournament.accessTypeTitle.${accessIcon}`)}
                  iconName={accessIcon}
                  className={classNames(
                    styles.icon,
                    styles.isBlue,
                    {
                      [styles.premium]: currentTournament.accessType === ACCESS_TYPES.ACCESS_BY_PREMIUM,
                    },
                  )}
                />
              </div>
            </div>

            {discipline === 'cs-go' && (
              <div className={classNames(styles.content, styles.contentFlexible)}>
                <div className={styles.item}>
                  <span className={styles.header}>
                    <Icon
                      className={styles.icon}
                      iconName="csgo-prime"
                    />
                    <span className={styles.smallText}>
                      {t('competitive.tournament.info.requiredPrime')}
                    </span>
                  </span>
                </div>
                <div className={styles.item}>
                  <Link
                    to={TOURNAMENT_RULE_LINKS[discipline].prime[locale]}
                    className={styles.link}
                  >
                    {t('competitive.tournament.info.getPrime')}
                  </Link>
                </div>
              </div>
            )}

            <div className={classNames(
              styles.content,
              {
                [styles.isCanceled]: currentTournament.status === TOURNAMENT_STATUSES.CANCELED,
                [styles.isNotDynamicPrize]: !isDynamicPrize,
              },
            )}
            >
              <div className={styles.item}>
                <div className={styles.header}>
                  <Icon
                    iconName="prize"
                    className={styles.icon}
                  />
                  <span className={styles.smallText}>
                    {currentTournament.prize}
                  </span>
                </div>
              </div>

              {isDynamicPrize && (
              <div className={styles.item}>
                <CopyLink
                  text={inviteLink}
                  className={styles.link}
                >
                  <Icon
                    iconName="link"
                    className={styles.icon}
                  />
                  <span className={styles.smallText}>{t('competitive.tournament.info.invite')}</span>
                </CopyLink>
              </div>
              )}
            </div>

            <JoinTournament
              isCurrentMemberInTournament={isCurrentMemberInTournament}
              handlerJoinTournament={handlerJoinTournament}
              disableJoinBtn={disableJoinBtn || !isFetchedTournamentInfo}
              tipType={tipType}
              currentTournament={currentTournament}
              isRejectedByDeleteCount={isRejectedByDeleteCount}
            />
          </div>

          {!isSmallLaptopTournamentWidth && (
          <ScrollSpyAnchors
            links={scrollSpyLinks}
            scrollSpySections={scrollSpySections}
          />
          )}
        </div>
      </div>
      {isShownConnectGameAndSteamModal && (
        <ConnectSteam
          isShown={isShownConnectGameAndSteamModal}
          closeHandler={hideConnectGameAndSteamModal}
          finalActionName="joinTournament"
          finalAction={handlerFinishAndJoinTournament}
        />
      )}
      {activeAlertModalType && (
      <AlertModal
        isShown={Boolean(activeAlertModalType)}
        onCloseModal={hideAlertModal}
        onConfirmModal={goToMemberProfile}
        texts={`competitive.tournament.modals.${activeAlertModalType}`}
        preview={previewImage}
      />
      )}
      {activeInviteMembersModal && (
      <InviteMembersModal
        isShown={Boolean(activeInviteMembersModal)}
        onCloseModal={hideInviteMembersModal}
        teamId={currentTeamId}
        teamName={currentTeamName}
      />
      )}
      {activePickStandInMembersModal && (
      <PickStandInMembersModal
        isShown={Boolean(activePickStandInMembersModal)}
        onCloseModal={hidePickStandInMembersModal}
        onConfirm={onJoinTournamentWithStandIn}
        members={standInMembers}
        quantity={currentTournament.reservedSize}
      />
      )}
      {activeConfirmModalType && (
      <ConfirmModal
        isShown={Boolean(activeConfirmModalType)}
        onCloseModal={hideConfirmModal}
        onConfirm={handleConfirm}
        title={t(`competitive.tournament.modals.${activeConfirmModalType}.title`)}
        subTitle={t(`competitive.tournament.modals.${activeConfirmModalType}.subTitle`)}
        confirmBtnText={t(`competitive.tournament.modals.${activeConfirmModalType}.confirmBtnText`)}
        closeBtnText={t(`competitive.tournament.modals.${activeConfirmModalType}.closeBtnText`)}
        {...hasTip && { tip: t(`competitive.tournament.modals.${activeConfirmModalType}.closeBtnText`) }}
        tipIcon="exclamation"
        modifiers={confirmModalModifiers}
      />
      )}
    </>
  )
}

ShortTournamentInfo.propTypes = {
  // required props
  gameMode: gameModePropType.isRequired,
  tournamentGame: gamePropType.isRequired,
  currentTournament: tournamentPropType.isRequired,
  scrollSpySections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
      rendered: PropTypes.bool,
    }),
  ).isRequired,
  isFetchedTournamentInfo: PropTypes.bool.isRequired,
  // props from container
  standInMembers: PropTypes.arrayOf(memberPropType).isRequired,
  isCurrentMemberInTournament: PropTypes.bool.isRequired,
  handlerJoinTournament: PropTypes.func.isRequired,
  onJoinTournamentWithStandIn: PropTypes.func.isRequired,
  goToMemberProfile: PropTypes.func.isRequired,
  disableJoinBtn: PropTypes.bool.isRequired,
  tipType: PropTypes.string.isRequired,
  previewImage: PropTypes.string.isRequired,
  currentTeamId: PropTypes.number.isRequired,
  currentTeamName: PropTypes.string.isRequired,
  isShownConnectGameAndSteamModal: PropTypes.bool.isRequired,
  hideConnectGameAndSteamModal: PropTypes.func.isRequired,
  hasSteam: PropTypes.bool.isRequired,
  inviteLink: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  accessIcon: PropTypes.string.isRequired,
  isRejectedByDeleteCount: PropTypes.bool.isRequired,
  confirmModalModifiers: PropTypes.shape({
    confirmButton: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  isSmallLaptopTournamentWidth: PropTypes.bool.isRequired,
  isDynamicPrize: PropTypes.bool.isRequired,
  hasTip: PropTypes.bool.isRequired,
  // Modals
  activeAlertModalType: PropTypes.string.isRequired,
  hideAlertModal: PropTypes.func.isRequired,
  activeConfirmModalType: PropTypes.string.isRequired,
  hideConfirmModal: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  handlerFinishAndJoinTournament: PropTypes.func.isRequired,
  activeInviteMembersModal: PropTypes.bool.isRequired,
  hideInviteMembersModal: PropTypes.func.isRequired,
  activePickStandInMembersModal: PropTypes.bool.isRequired,
  hidePickStandInMembersModal: PropTypes.func.isRequired,
  winner: PropTypes.oneOfType([
    memberPropType,
    teamPropType,
  ]).isRequired,
  // props from HOCs
  discipline: PropTypes.string.isRequired,
  // optional props
}

ShortTournamentInfo.defaultProps = {
  // optional props
}

export default container(ShortTournamentInfo)
