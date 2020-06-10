import * as R from 'ramda'
import { connect } from 'react-redux'
import {
  compose,
  withPropsOnChange,
  withHandlers,
} from 'recompose'
import { createStructuredSelector } from 'reselect'

import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { addBookmarkByNewsId, deleteBookmarkByNewsId } from 'weplay-core/reduxs/bookmarks/actions'
import { triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'
import {
  isAddBookmarkByNewsIdLoadingSelector,
  isDeleteBookmarkByNewsIdLoadingSelector,
} from 'weplay-core/reduxs/bookmarks/reducer'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import toaster, { TOAST_TYPE } from 'weplay-core/services/toastNotifications'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
    isLoggedIn: isLoggedInSelector,
    isAddBookmarkLoading: isAddBookmarkByNewsIdLoadingSelector,
    isDeleteBookmarkLoading: isDeleteBookmarkByNewsIdLoadingSelector,
  }), {
    // actionCreators
    addToBookmarks: addBookmarkByNewsId.request,
    deleteFromBookmarks: deleteBookmarkByNewsId.request,
    triggerSignUpModal,
  }),
  withPropsOnChange([
    'isBookmarked',
    'isAddBookmarkLoading',
    'isDeleteBookmarkLoading',
  ], ({
    isBookmarked,
    isAddBookmarkLoading,
    isDeleteBookmarkLoading,
  }) => ({
    iconName: isBookmarked ? 'bookmark' : 'bookmark-transparent',
    isButtonDisabled: Boolean(isAddBookmarkLoading || isDeleteBookmarkLoading),
  })),

  withHandlers({
    handleClick: props => () => {
      if (!props.isLoggedIn) {
        props.triggerSignUpModal()
      } else if (!props.isBookmarked) {
        props.addToBookmarks(props.newspaperId).then(() => {
          toaster.showNotification({
            type: TOAST_TYPE.SUCCESS,
            content: R.path(['mediaCore', 'notifications', 'success', 'bookmarkAdded'], props.i18nTexts),
          })
        })
      } else {
        props.deleteFromBookmarks(props.newspaperId).then(() => {
          toaster.showNotification({
            type: TOAST_TYPE.WARNING,
            content: R.path(['mediaCore', 'notifications', 'success', 'bookmarkDeleted'], props.i18nTexts),
          })
        })
      }
    },
  }),
)

export default container
