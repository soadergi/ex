import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import MapVoting from 'weplay-competitive/pages/MatchPage/Information/MapVoting'
import Overview from 'weplay-competitive/pages/MatchPage/Information/Overview'
import container from 'weplay-competitive/pages/MatchPage/Information/container'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'

import styles from './styles.scss'

const Information = ({
  // required props
  awayTournamentMemberIds,
  matchPlayer1Id,
  matchPlayer2Id,
  lobbyId,
  matchStatus,
  isVoteItemsNotEmpty,
  startVoteDatetime,
  discipline,

  // optional props
  className,
}) => {
  const t = useTranslation()

  return (
    <div className={classNames(
      styles.block,
      className,
    )}
    >
      <div className={styles.wrapper}>
        <p className={styles.title}>
          {t('competitive.match.matchInfo.overview')}
        </p>

        {matchStatus === MATCH_STATUSES.VOTING && (
          <MapVoting
            matchPlayer1Id={matchPlayer1Id}
            matchPlayer2Id={matchPlayer2Id}
            lobbyId={lobbyId}
            startVoteDatetime={startVoteDatetime}
          />
        )}

        {isVoteItemsNotEmpty && (
          <Overview
            matchStatus={matchStatus}
            awayTournamentMemberIds={awayTournamentMemberIds}
            discipline={discipline}
          />
        )}
      </div>
    </div>
  )
}

Information.propTypes = {
  // required props
  awayTournamentMemberIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  lobbyId: PropTypes.number.isRequired,
  matchStatus: PropTypes.string.isRequired,
  isVoteItemsNotEmpty: PropTypes.bool.isRequired,
  startVoteDatetime: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
  // container props
  matchPlayer1Id: PropTypes.number.isRequired,
  matchPlayer2Id: PropTypes.number.isRequired,
  // optional props
  className: PropTypes.string,
}

Information.defaultProps = {
  // optional props
  className: '',
}

export default container(Information)
