import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import NotificationLabel from 'weplay-components/NotificationLabel'
import Icon from 'weplay-components/Icon'

import PlayerAvatar from 'weplay-competitive/components/PlayerAvatar'

import styles from './TimelineItem.scss'
import TimelineItemSkeleton from './TimelineItemSkeleton'

const TimelineItem = ({
  item,
  isActive,
  isDisabled,
  isVoted,
}) => {
  const isDisabledColor = useMemo(
    () => (isDisabled ? 'isDefault' : ''),
    [isDisabled],
  )

  if (!item) return TimelineItemSkeleton

  return (
    <li className={classNames(
      styles.item,
      {
        [styles.isVoted]: isVoted,
      },
    )}
    >
      {item.voteMemberId === 'SERVER'
        ? (
          <Icon
            className={styles.server}
            iconName="server"
          />
        )
        : (
          <PlayerAvatar
            id={item.voteMemberId}
            className={styles.avatar}
            size="24"
          />
        )}
      <NotificationLabel
        isActive={isActive}
        color={isDisabledColor}
        className={styles.notification}
      />
    </li>
  )
}

TimelineItem.propTypes = {
  item: PropTypes.shape({
    voteMemberId: PropTypes.number,
    action: PropTypes.string,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isVoted: PropTypes.bool.isRequired,
}

TimelineItem.defaultProps = {}

export default TimelineItem
