import React from 'react'
import { useSelector } from 'react-redux'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import PageHelmet from 'weplay-components/PageHelmet'

import { useMMVotingSockets } from 'weplay-competitive/hooks/MM/sockets/useMMVotingSockets'
import { useMMMatchSockets } from 'weplay-competitive/hooks/MM/sockets/useMMMatchSockets'
import { MMVotesSelectors } from 'weplay-competitive/reduxs/MMVotes'
import { MMGameModesSelectors } from 'weplay-competitive/reduxs/MMGameModes'
import { MMMatchesSelectors } from 'weplay-competitive/reduxs/MMMatches'

import MatchHeader from './MatchHeader/MatchHeader'
import useMMMatch from './useMMMatch'
import MapVoting from './MapVoting/MapVoting'
import styles from './MMMatchPage.scss'

const MMMatchPage = () => {
  const { matchId } = useParams()

  useMMMatch({ matchId })

  const match = useSelector(MMMatchesSelectors.createRecordByIdSelector(matchId))

  const gameMode = useSelector(MMGameModesSelectors.createRecordByIdSelector(match?.gameModeId))

  const MMVote = useSelector(MMVotesSelectors.createRecordByIdSelector(matchId))

  const votingAvailable = MMVote.isFetched && MMVote.status !== 'FINISHED'

  const seoParams = {
    matchId,
  }

  useMMVotingSockets({ matchId })
  useMMMatchSockets({ matchId })

  return match.isFetched && (
    <div className={styles.page}>
      <PageHelmet seoParams={seoParams} />
      <MatchHeader matchId={Number(matchId)} />
      { votingAvailable && (
      <MapVoting
        gameMode={gameMode}
        vote={MMVote}
      />
      )}
    </div>
  )
}

export default MMMatchPage
