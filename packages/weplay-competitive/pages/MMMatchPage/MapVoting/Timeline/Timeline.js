import React, { useMemo } from 'react'

import MMVotePropType from 'weplay-competitive/customPropTypes/MMVotePropType'

import useTimeLineItems from './useTimeLineItems'
import TimelineItem from './TimelineItem/TimelineItem'
import styles from './Timeline.scss'

const Timeline = ({
  vote,
}) => {
  const timeLineItems = useTimeLineItems(vote)

  const votedMapsLength = useMemo(
    () => (vote?.voteItems ?? []).filter(voteItem => voteItem.users.length).length,
    [vote.voteItems],
  )

  return (
    <div className={styles.block}>
      <ul className={styles.list}>
        {timeLineItems.map((item, index) => (
          <TimelineItem
            key={index} // eslint-disable-line react/no-array-index-key
            item={item}
            isVoted={votedMapsLength > index}
            isActive={votedMapsLength === index}
            isDisabled={votedMapsLength < index}
          />
        ))}
      </ul>
    </div>
  )
}

Timeline.propTypes = {
  vote: MMVotePropType.isRequired,
}

Timeline.defaultProps = {
  // optional props
}

export default Timeline
