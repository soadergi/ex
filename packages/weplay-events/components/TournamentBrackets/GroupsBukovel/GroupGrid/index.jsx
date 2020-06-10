import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import GroupGridBody from './GroupGridBody'
import styles from './styles.scss'
import container from './container'
import GroupGridHead from './GroupGridHead'

const GroupTable = ({
  // required props
  group,
  participantKey,

  // props from container

  // optional props
  stageTitle,
  amountOfWinners,
}) => (
  <div
    className={classNames(
      styles[stageTitle],
      styles.block,
    )}
  >
    <GroupGridHead groupName={group.name} />

    {
      group[participantKey].map((participant, participantIndex) => (
        <GroupGridBody
          key={participant.uuid}
          participant={participant}
          stageTitle={stageTitle}
          isWinner={participantIndex < amountOfWinners}
          // TODO: Hardcode coeff
          coefficient="0.123"
        />
      ))
    }
  </div>
)

GroupTable.propTypes = {
  // required props
  group: PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  participantKey: PropTypes.oneOf(['teams', 'players']).isRequired,

  // props from container

  // optional props
  stageTitle: PropTypes.string,
  amountOfWinners: PropTypes.number,
}

GroupTable.defaultProps = {
  // optional props
  stageTitle: '',
  amountOfWinners: 0,
}

export default container(GroupTable)
