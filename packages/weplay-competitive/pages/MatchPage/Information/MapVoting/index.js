import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import ModalBase from 'weplay-components/ModalBase'

import CoinFlip from 'weplay-competitive/components/CoinFlip'
import lobbyPropType from 'weplay-competitive/customPropTypes/lobbyPropType'
import lobbyMapPropType from 'weplay-competitive/customPropTypes/lobbyMapPropType'
import matchParticipantPropType from 'weplay-competitive/customPropTypes/matchParticipantPropType'

import VoteTimer from './VoteTimer'
import container from './container'
import styles from './styles.scss'
import VotingUser from './VotingUser'
import Timeline from './Timeline'
import PickOrBanList from './PickOrBanList'

const modalModifiers = ['paddingLess']

const MapVoting = ({
  // required props
  lobby,
  lastVoteDateTime,
  matchPlayer1Id,
  matchPlayer2Id,
  // container props
  background,
  homeParticipant,
  awayParticipant,
  voteMap,
  isHomeMemberHasCoin,
  currentLobbyMap,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <ModalBase
      isShown
      modifiers={modalModifiers}
    >
      <div
        className={styles.block}
        style={background}
      >
        <div className={styles.header}>
          <span className={classNames(
            {
              [styles.isRight]: !isHomeMemberHasCoin,
            },
          )}
          >
            <CoinFlip />
          </span>
        </div>

        <div className={styles.body}>
          <VotingUser
            participant={homeParticipant}
            currentLobbyMap={currentLobbyMap}
            lobbyVoteDuration={lobby.settings.voteTime}
            tournamentMemberId={matchPlayer1Id}
            lastVoteDateTime={lastVoteDateTime}
          />
          <div className={styles.timer}>
            <p className={styles.timerTitle}>
              {t('competitive.match.mapVoting.timer')}
            </p>
            <p className={styles.countdown}>
              <VoteTimer
                lobbyVoteDuration={lobby.settings.voteTime}
                lastVoteDateTime={lastVoteDateTime}
              />
            </p>
          </div>
          <VotingUser
            participant={awayParticipant}
            currentLobbyMap={currentLobbyMap}
            lobbyVoteDuration={lobby.settings.voteTime}
            lastVoteDateTime={lastVoteDateTime}
            tournamentMemberId={matchPlayer2Id}
          />
        </div>

        <Timeline
          lobby={lobby}
          currentLobbyMap={currentLobbyMap}
          homeParticipant={homeParticipant}
          awayParticipant={awayParticipant}
          matchPlayer1Id={matchPlayer1Id}
        />

        {currentLobbyMap && (
        <PickOrBanList
          lobby={lobby}
          currentLobbyMap={currentLobbyMap}
          homeParticipant={homeParticipant}
          awayParticipant={awayParticipant}
          matchPlayer1Id={matchPlayer1Id}
          voteMap={voteMap}
        />
        )}
      </div>
    </ModalBase>
  )
}

MapVoting.propTypes = {
  // required props
  lobby: lobbyPropType.isRequired,
  // container props
  background: PropTypes.shape({}).isRequired,
  homeParticipant: matchParticipantPropType.isRequired,
  awayParticipant: matchParticipantPropType.isRequired,
  voteMap: PropTypes.func.isRequired,
  matchPlayer1Id: PropTypes.number.isRequired,
  matchPlayer2Id: PropTypes.number.isRequired,
  // optional props
  lastVoteDateTime: PropTypes.string,
  isHomeMemberHasCoin: PropTypes.bool,
  currentLobbyMap: lobbyMapPropType,
}

MapVoting.defaultProps = {
  // optional props
  lastVoteDateTime: undefined,
  currentLobbyMap: undefined,
  isHomeMemberHasCoin: undefined,
}

export default container(MapVoting)
