import * as R from 'ramda'
import React from 'react'
import i18n from 'i18n-react'

import ToastMessage from './ToastNotifications/ToastMessage'

const TOAST_CATEGORY = {
  GENERAL: 'general',
}

export const TOAST_TYPE = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
}

class Toaster {
  showNotification = ({
    type,
    content,
    category,
    dateTime,
    options,
  }) => content && import('react-toastify').then(({ toast }) => toast(
    <ToastMessage
      content={content}
      type={type}
      category={category}
      dateTime={dateTime}
    />,
    options,
  ))

  showServerError = (errorCode) => {
    const message = R.pathOr(null, ['texts', 'serverErrors', 'codes', errorCode], i18n)
    return message && this.showNotification({
      type: TOAST_TYPE.ERROR,
      content: message,
      category: TOAST_CATEGORY.GENERAL,
      dateTime: Date.now(),
    })
  }
}

export default new Toaster()
