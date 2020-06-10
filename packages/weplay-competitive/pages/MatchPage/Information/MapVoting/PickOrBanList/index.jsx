import React from 'react'
import PropTypes from 'prop-types'
import lobbyMapPropType from 'weplay-competitive/customPropTypes/lobbyMapPropType'
import voteItemPropType from 'weplay-competitive/customPropTypes/voteItemPropType'
import matchParticipantPropType from 'weplay-competitive/customPropTypes/matchParticipantPropType'

import PickOrBanItem from './PickOrBanItem'
import container from './container'
import styles from './styles.scss'

const PickOrBanList = ({
  // required props
  matchPlayer1Id,
  // container props
  voteItems,
  lobbyMaps,
  homeParticipant,
  awayParticipant,
  currentLobbyMap,
  voteMap,
  isCurrentMemberTurn,
  // optional props
}) => (
  <div className={styles.list}>
    {voteItems.map(voteItem => voteItem.isFetched && (
      <PickOrBanItem
        key={voteItem.id}
        voteItem={voteItem}
        voteMap={voteMap}
        lobbyMaps={lobbyMaps}
        homeParticipant={homeParticipant}
        awayParticipant={awayParticipant}
        currentLobbyMap={currentLobbyMap}
        matchPlayer1Id={matchPlayer1Id}
        isCurrentMemberTurn={isCurrentMemberTurn}
      />
    ))}
  </div>
)

PickOrBanList.propTypes = {
  // required props
  // container props
  voteItems: PropTypes.arrayOf(
    voteItemPropType.isRequired,
  ).isRequired,
  lobbyMaps: PropTypes.arrayOf(
    lobbyMapPropType.isRequired,
  ).isRequired,
  homeParticipant: matchParticipantPropType.isRequired,
  awayParticipant: matchParticipantPropType.isRequired,
  currentLobbyMap: lobbyMapPropType.isRequired,
  isCurrentMemberTurn: PropTypes.bool.isRequired,
  matchPlayer1Id: PropTypes.number.isRequired,
  voteMap: PropTypes.func.isRequired,
  // optional props
}

PickOrBanList.defaultProps = {
  // optional props
}

export default container(PickOrBanList)
