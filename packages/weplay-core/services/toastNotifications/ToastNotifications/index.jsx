import React from 'react'
import { ToastContainer, cssTransition } from 'react-toastify'

import container from './container'
import styles from './styles'
import ToastCloseButton from './ToastCloseButton'

const Bounce = cssTransition({
  enter: styles.moveInUp,
  exit: styles.moveOutDown,
  duration: 500,
})

const ToastNotificationsContainer = () => (
  <ToastContainer
    className={styles.block}
    toastClassName={styles.toast}
    bodyClassName={styles.body}
    progressClassName={styles.progress}
    closeButton={<ToastCloseButton />}
    transition={Bounce}
    closeOnClick={false}
    autoClose={10000}
    newestOnTop
    hideProgressBar
  />
)

export default container(ToastNotificationsContainer)
