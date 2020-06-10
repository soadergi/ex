import * as R from 'ramda'
import {
  compose,
  withStateHandlers,
  withHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import { getUserNotifications } from 'weplay-core/reduxs/notifications/actions'
import { getUserWallet } from 'weplay-core/reduxs/wallets/actions'
import { goTo, NAMES } from 'weplay-core/routes'
import { signOut, deleteUser } from 'weplay-core/reduxs/_legacy/auth/actions'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

const container = compose(
  withRouter,
  connect(createStructuredSelector({
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
    deleteUser,
    signOut,
    goTo,
    clearUserWallet: getUserWallet.clear,
    clearUserNotifications: getUserNotifications.clear,
  }),

  withStateHandlers({
    isChecked: false,
  }, {
    toggleCheckbox: ({ isChecked }) => () => ({ isChecked: !isChecked }),
  }),
  withHandlers({
    deleteUserAccount: props => () => {
      props.deleteUser().then(() => {
        props.signOut()
        props.clearUserWallet()
        props.clearUserNotifications()
        toaster.showNotification({
          type: TOAST_TYPE.SUCCESS,
          content: R.path(['mediaCore', 'notifications', 'success', 'profileDeleted'], props.i18nTexts),
        })
        props.goTo({
          name: NAMES.MEDIA,
          history: props.history,
        })
      })
    },
  }),
  withHandlers({
    handleClick: ({
      history,
      toggleDeleteAccountModal,
      deleteUserAccount, /* eslint-disable-line no-shadow */
    }) => () => {
      deleteUserAccount({ history })
      toggleDeleteAccountModal()
    },
  }),
)

export default container
