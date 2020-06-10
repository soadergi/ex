import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import { useMatchDetails } from 'weplay-events/pages/EventPage/components/MatchDetails/MatchDetailsProvider'

import styles from './CrossTable.scss'
import ParticipantColumn from './ParticipantColumn/ParticipantColumn'
import MatchRow from './MatchRow/MatchRow'
import ParticipantRow from './ParticipantRow/ParticipantRow'

const CrossTable = ({ participants, matchMatrix, withDuplicates }) => {
  const { setMatchId } = useMatchDetails()
  return (
    <div className={styles.block}>
      <ParticipantColumn
        participants={participants}
        withDuplicates={withDuplicates}
      />

      <Scrollbars autoHide>
        {matchMatrix.map(row => (
          <MatchRow
            key={row[0].id}
            matches={row}
            withDuplicates={withDuplicates}
            onMatchClick={setMatchId}
          />
        ))}

        <ParticipantRow
          participants={participants}
          withDuplicates={withDuplicates}
        />
      </Scrollbars>
    </div>
  )
}

CrossTable.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  matchMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  withDuplicates: PropTypes.bool.isRequired,
}

export default React.memo(CrossTable)
