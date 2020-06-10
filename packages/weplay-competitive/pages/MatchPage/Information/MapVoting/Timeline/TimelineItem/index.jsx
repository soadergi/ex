import React from 'react'
import PropTypes from 'prop-types'
import UserAvatar from 'weplay-components/UserAvatar'
import NotificationLabel from 'weplay-components/NotificationLabel'
import Icon from 'weplay-components/Icon'
import lobbyMapPropType from 'weplay-competitive/customPropTypes/lobbyMapPropType'
import matchParticipantPropType from 'weplay-competitive/customPropTypes/matchParticipantPropType'

import container from './container'
import styles from './styles.scss'

const TimelineItem = ({
  // required props
  // container props
  lobbyMap,
  participant,
  color,
  isActive,
  // optional props
}) => (
  <li
    className={styles.item}
    key={lobbyMap.id}
  >
    {!lobbyMap.relationships.member
      ? (
        <Icon
          className={styles.server}
          iconName="server"
        />
      )
      : (
        <UserAvatar
          avatar={participant.avatar}
          className={styles.avatar}
          imageClassName={styles.image}
          isPremiumAccount={participant.isPremiumAccount}
          size="24"
        />
      )}

    <NotificationLabel
      isActive={isActive}
      color={color}
      className={styles.notification}
    />
  </li>
)

TimelineItem.propTypes = {
  // required props
  // container props
  lobbyMap: lobbyMapPropType.isRequired,
  participant: matchParticipantPropType.isRequired,
  color: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  // optional props
}

TimelineItem.defaultProps = {
  // optional props

}

export default container(TimelineItem)
