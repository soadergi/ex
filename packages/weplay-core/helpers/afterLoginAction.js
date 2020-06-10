import * as R from 'ramda'

import { goTo, NAMES } from 'weplay-core/routes'

const afterLoginAction = (history, postVote, closePopup) => {
  const prevPage = R.path(['location', 'state', 'prevPage'], history)
  switch (prevPage) {
    case NAMES.MY_MEDIA:
    case NAMES.PROFILE:
      goTo({
        history,
        name: prevPage,
        params: { section: '' },
      })
      break
    case NAMES.VOTING_MWP:
      postVote({
        votingId: R.path(['location', 'state', 'votingId'], history),
        votingOptionId: R.path(['location', 'state', 'id'], history),
      })
      break
    default:
      break
  }
  closePopup()
}

export default afterLoginAction
