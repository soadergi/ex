import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Label from 'weplay-components/Label'
import lobbyMapPropType from 'weplay-competitive/customPropTypes/lobbyMapPropType'
import voteItemPropType from 'weplay-competitive/customPropTypes/voteItemPropType'
import matchParticipantPropType from 'weplay-competitive/customPropTypes/matchParticipantPropType'

import container from './container'
import styles from './styles.scss'

const labelModSuccess = 'success'
const labelModPink = 'magenta'

const PickOrBanItem = ({
  // required props
  // container props
  voteItem,
  lobbyMap,
  currentLobbyMap,
  participant,
  handleVote,
  isCurrentMemberTurn,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <button
      type="button"
      onClick={handleVote}
      className={classNames(
        styles.link,
        {
          [styles.isDisabled]: lobbyMap,
          [styles.isPicking]: isCurrentMemberTurn && currentLobbyMap.vote === 'PICK',
          [styles.isBanning]: isCurrentMemberTurn && currentLobbyMap.vote === 'DROP',
        },
      )}
    >
      <img
        src={voteItem.logo}
        alt={voteItem.name}
        className={classNames(
          styles.image,
          {
            [styles.isDisabled]: lobbyMap && !!lobbyMap.relationships.member.id,
          },
        )}
      />
      <div className={styles.content}>
        {(lobbyMap && lobbyMap.relationships.member) && (
        <span className={classNames(
          styles.name,
          styles.textEllipsis,
        )}
        >
          {participant.name}
        </span>
        )}

        {isCurrentMemberTurn
        && (
          <span className={classNames(
            styles.moveState,
            {
              [styles.isSuccess]: currentLobbyMap.vote === 'PICK',
              [styles.isBan]: currentLobbyMap.vote === 'DROP',
            },
          )}
          >
            {t(`competitive.match.mapVoting.buttons.${currentLobbyMap.vote}`)}
          </span>
        )}

        {!lobbyMap
          ? (
            <span className={classNames(
              styles.mapName,
              styles.textEllipsis,
            )}
            >
              {voteItem.name}
            </span>
          )
          : (
            <Label color={lobbyMap.vote === 'PICK' ? labelModSuccess : labelModPink}>
              <span className={styles.textEllipsis}>
                {voteItem.name}
              </span>
            </Label>
          )}
      </div>
    </button>
  )
}

PickOrBanItem.propTypes = {
  // required props
  // container props
  voteItem: voteItemPropType.isRequired,
  participant: matchParticipantPropType,
  lobbyMap: lobbyMapPropType,
  currentLobbyMap: lobbyMapPropType.isRequired,
  handleVote: PropTypes.func.isRequired,
  isCurrentMemberTurn: PropTypes.bool.isRequired,
  // optional props
}

PickOrBanItem.defaultProps = {
  // optional props
  participant: {
    name: '',
  },
  lobbyMap: undefined,
}

export default container(PickOrBanItem)
