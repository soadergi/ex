import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import Standing from './Standing/Standing'
import styles from './RoundRobinStandings.scss'

function collectParticipantResults(matches = [], participantId) {
  return matches.reduce((acc, match) => {
    const host = match.relationships.participants.find(p => p.id === participantId)
    const enemy = match.relationships.participants.find(p => p.id !== participantId)

    if (!host || !enemy) {
      return acc
    }

    if (host.meta.score > enemy.meta.score) {
      acc.wins += 1
    }

    if (host.meta.score < enemy.meta.score) {
      acc.loses += 1
    }

    acc.roundWins += host.meta.score
    acc.roundLoses += enemy.meta.score

    acc.points += Number(host.meta.points)

    return acc
  }, {
    wins: 0,
    loses: 0,
    roundWins: 0,
    roundLoses: 0,
    points: 0,
  })
}

function sortParticipants(a, b) {
  if (b.results.points !== a.results.points) {
    return b.results.points - a.results.points
  }

  if (a.results.loses !== b.results.loses) {
    return a.results.loses - b.results.loses
  }

  const roundDiffA = a.results.roundWins - a.results.roundLoses
  const roundDiffB = b.results.roundWins - b.results.roundLoses

  return roundDiffB - roundDiffA
}

const RoundRobinStandings = ({ participants, matchesByParticipant }) => {
  const participantsWithMatchResults = useMemo(() => participants.map((participant) => {
    const results = collectParticipantResults(matchesByParticipant[participant.id], participant.id)
    return {
      participant,
      results,
    }
  }).sort(sortParticipants), [participants, matchesByParticipant])

  return (
    <div className={styles.block}>
      {
        participantsWithMatchResults.map(({ participant, results }) => (
          <Standing
            key={participant.id}
            participant={participant}
            results={results}
          />
        ))
      }
    </div>
  )
}

RoundRobinStandings.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  matchesByParticipant: PropTypes.shape({}).isRequired,
}

export default React.memo(RoundRobinStandings)
