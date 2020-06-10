import { compose, withHandlers } from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { goTo } from 'weplay-core/routes'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import { nearbyOptionIdsSelector } from 'weplay-core/reduxs/votingOptions/reducer'
import { NAMES } from 'weplay-core/routes/core'

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    nearbyOptionIds: nearbyOptionIdsSelector,
  }), {
  }),
  withHandlers({
    navigateToOption: ({ history, match }) => (votingOptionId) => {
      goTo({
        name: NAMES.CANDIDATE,
        history,
        params: {
          ...match.params,
          votingOptionId,
        },
      })
    },
  }),
  withHandlers({
    onPrevClick: ({
      navigateToOption,
      nearbyOptionIds,
    }) => () => navigateToOption(nearbyOptionIds.prevOptionId),
    onNextClick: ({
      navigateToOption,
      nearbyOptionIds,
    }) => () => navigateToOption(nearbyOptionIds.nextOptionId),
  }),
)

export default container
