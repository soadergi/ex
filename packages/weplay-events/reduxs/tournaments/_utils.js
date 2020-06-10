import * as R from 'ramda'

export const extendParticipant = getTournamentParticipantById => participant => ({
  ...participant,
  ...getTournamentParticipantById(participant && participant.uuid),
})

const extendParticipantPair = (getTournamentParticipantById, participants) => ({
  a: extendParticipant(getTournamentParticipantById)(participants && participants.a),
  b: extendParticipant(getTournamentParticipantById)(participants && participants.b),
})

export const getExtendGameWithParticipant = (getTournamentParticipantById, participantKey) => game => ({
  ...game,
  [participantKey]: extendParticipantPair(getTournamentParticipantById, game[participantKey]),
})

export const makePairs = (getTournamentPlayerById, participantKey, games) => R.pipe(
  R.map(getExtendGameWithParticipant(getTournamentPlayerById, participantKey)),
  R.reduce((pairs, game) => {
    const lastPair = R.last(pairs)
    if (!lastPair || lastPair.length === 2) {
      pairs.push([game])
    } else {
      lastPair.push(game)
    }
    return pairs
  }, []),
  // TODO rewrite without R.uniq
  R.uniq,
)(games)
