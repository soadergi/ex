import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Skeleton from 'weplay-components/Skeleton'
import Button from 'weplay-components/Button'

import styles from './LeaderBoard.scss'
import LeaderBoardParticipant from './LeaderBoardParticipant/LeaderBoardParticipant'
import useLeaderBoard from './useLeaderBoard'
import LeaderBoardEmptyState from './LeaderBoardEmptyState'

const LeaderBoard = ({ isActive }) => {
  const t = useTranslation()
  const {
    leaderBoard,
    connectedTwitchAccountId,
    currentUser,
    isLoading,
    PAGE_LIMIT,
    isAllListLoaded,
    handleLoadMore,
  } = useLeaderBoard()

  if (!isActive) return null

  return (
    <>
      <ul
        className={classNames(
          styles.block,
          styles.isOpened,
          { [styles.isEmpty]: leaderBoard.length === 0 },
        )}
      >
        {leaderBoard.map(participant => (
          <LeaderBoardParticipant
            key={participant.id}
            participant={participant}
            isMarked={participant.id === connectedTwitchAccountId}
          />
        ))}

        {leaderBoard.length === 0 && <LeaderBoardEmptyState />}

        {currentUser && (
          <LeaderBoardParticipant
            participant={currentUser}
            isMarked
          />
        )}

        {isLoading && (
          <Skeleton
            count={PAGE_LIMIT}
            height="96px"
          />
        )}
      </ul>

      {!isAllListLoaded && (
        <div className="u-text-center u-mt-3 u-mt-sm-5">
          <Button
            className={styles.button}
            onClick={handleLoadMore}
          >
            {t('button.loadMore')}
          </Button>
        </div>
      )}
    </>
  )
}

LeaderBoard.propTypes = {
  isActive: PropTypes.bool.isRequired,
}

export default React.memo(LeaderBoard)
