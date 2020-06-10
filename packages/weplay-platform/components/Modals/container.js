import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import { triggerMutualModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import { mutualModalSelector } from 'weplay-core/reduxs/_legacy/modals/reducer'
import { MUTUAL_MODALS } from 'weplay-components/ModalBase/config'

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    // selectors
    mutualModal: mutualModalSelector,
  }), {
    // actionCreators
    triggerMutualModal,
  }),

  withPropsOnChange([
    'mutualModal',
  ], ({
    mutualModal,
  }) => ({
    isMutualVisible: R.contains(mutualModal, R.values(MUTUAL_MODALS)),
    modifiers: mutualModal ? [mutualModal] : [],
    isCloseBtnHidden: mutualModal === MUTUAL_MODALS.ONBOARDING_WP_POINTS,
  })),

  withHandlers({
    closeMutualModal: ({
      triggerMutualModal, // eslint-disable-line no-shadow
    }) => () => {
      triggerMutualModal(null)
    },
  }),
)

export default container
