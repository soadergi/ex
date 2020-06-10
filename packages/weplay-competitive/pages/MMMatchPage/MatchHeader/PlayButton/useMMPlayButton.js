import { useSelector } from 'react-redux'

import useDiscipline from 'weplay-competitive/hooks/useDiscipline'
import { MMMatchesSelectors } from 'weplay-competitive/reduxs/MMMatches'
import { MATCH_STATUSES } from 'weplay-competitive/constants/matchStatuses'

const useMMPlayButton = ({ matchId, joinMatchLink }) => {
  const match = useSelector(
    MMMatchesSelectors.createRecordByIdSelector(matchId),
  )
  const { tournamentDiscipline } = useDiscipline()
  switch (match?.status) {
    case MATCH_STATUSES.UPCOMING:
    case MATCH_STATUSES.VOTING:
      return {
        buttonLink: '',
        buttonText: 'play',
      }
    case MATCH_STATUSES.SETUP_SERVER:
      return {
        buttonLink: '',
        buttonText: 'settingUp',
      }
    case MATCH_STATUSES.ONGOING:
      return {
        buttonLink: `${tournamentDiscipline.runCommand}${joinMatchLink}`,
        buttonText: 'play',
      }
    default:
      return {
        buttonText: 'play',
        buttonLink: '',
      }
  }
}

export default useMMPlayButton
