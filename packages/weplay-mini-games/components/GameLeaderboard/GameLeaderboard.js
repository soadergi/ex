import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { currentUserSelector, isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import LoadMoreButton from 'weplay-components/LoadMoreButton'

import styles from './GameLeaderboard.scss'
import PlayerRow from './PlayerRow/PlayerRow'

const initialFetchParams = {
  limit: 25,
  offset: 0,
}

const GameLeaderboard = ({
  userPosition,
  userBestScore,
  getLeaders,
  gameId,
  isLeadersLoading,
  pagination,
  getMaxResult,
  additionalFetchParams,
}) => {
  const t = useTranslation()
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(isLoggedInSelector)
  const currentUser = useSelector(currentUserSelector)
  const [gameLeaders, setGameLeaders] = useState([])

  const fetchMoreLeaders = useCallback(() => {
    dispatch(getLeaders.request({
      ...initialFetchParams,
      offset: pagination.offset + initialFetchParams.limit,
      gameId,
      ...additionalFetchParams,
    })).then((res) => {
      setGameLeaders(gameLeaders.concat(res.data))
    })
  }, [getLeaders, pagination.offset, gameLeaders, setGameLeaders, gameId, additionalFetchParams, dispatch])

  useEffect(() => {
    if (isLoggedIn && gameId) {
      dispatch(getMaxResult.request({ gameId, ...additionalFetchParams }))
    }
  }, [isLoggedIn, getMaxResult, gameId, additionalFetchParams, dispatch])

  useEffect(() => {
    if (gameId) {
      dispatch(getLeaders.request({
        gameId,
        ...initialFetchParams,
        ...additionalFetchParams,
      })).then(res => setGameLeaders(res.data))
    }
  }, [getLeaders, gameId, additionalFetchParams, dispatch])

  const hasMoreLeaders = useMemo(
    () => pagination.total > pagination.offset + initialFetchParams.limit,
    [pagination],
  )
  const userNickname = currentUser?.nickname ?? null

  const isUserInLeaders = useMemo(
    () => gameLeaders.reduce((isMatch, leader) => isMatch || leader?.nickname === userNickname, false),
    [gameLeaders, userNickname],
  )

  return (
    <>
      <div className={styles.block}>
        <div className={styles.row}>
          <span className={styles.value}>{t('mediaCore.common.number')}</span>
          <span className={styles.value}>{t('mediaCore.common.nickname')}</span>
          <span className={styles.value}>{t('mediaCore.common.score')}</span>
        </div>
        {gameLeaders.map((gameLeader, index) => (
          <PlayerRow
            key={gameLeader?.nickname ?? index}
            position={index + 1}
            nickname={gameLeader?.nickname}
            score={gameLeader?.score}
            hasAccent={gameLeader?.nickname === userNickname}
          />
        ))}
        {(isLoggedIn && !isUserInLeaders) && (
          <PlayerRow
            position={userPosition}
            nickname={userNickname}
            score={userBestScore}
            color="darkBlue"
            hasAccent
          />
        )}
      </div>

      <LoadMoreButton
        className={styles.button}
        buttonText={t('mediaCore.common.button.loadMore')}
        onClick={fetchMoreLeaders}
        isLoading={isLeadersLoading}
        isVisible={hasMoreLeaders}
      />
    </>
  )
}

GameLeaderboard.propTypes = {
  userPosition: PropTypes.number.isRequired,
  userBestScore: PropTypes.number.isRequired,
  isLeadersLoading: PropTypes.bool.isRequired,
  getLeaders: PropTypes.shape({
    request: PropTypes.func.isRequired,
  }).isRequired,
  gameId: PropTypes.number,
  getMaxResult: PropTypes.shape({
    request: PropTypes.func.isRequired,
  }).isRequired,
  pagination: PropTypes.shape({
    offset: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  additionalFetchParams: PropTypes.shape({}),
}

GameLeaderboard.defaultProps = {
  gameId: NaN,
  additionalFetchParams: {},
}

export default React.memo(GameLeaderboard)
