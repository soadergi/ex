export default function getWinnerIndex(score1, score2) {
  if (typeof score1 !== 'number' || typeof score2 !== 'number') {
    return null
  }

  if (score1 > score2) {
    return 0
  }

  if (score2 > score1) {
    return 1
  }

  return null
}
