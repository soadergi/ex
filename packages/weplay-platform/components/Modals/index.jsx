import React from 'react'
import PropTypes from 'prop-types'
import ModalBase from 'weplay-components/ModalBase'
import { MUTUAL_MODALS } from 'weplay-components/ModalBase/config'

import LoginModal from './LoginModal'
import ForgotPasswordModal from './ForgotPasswordModal'
import SignUpModal from './SignUpModal'
import PromoCodeModal from './PromoCodeModal'
import SubscribeModal from './SubscribeModal'
import CookiesPolicyPopup from './CookiesPolicyPopup'
import ChangeEmailModal from './ChangeEmailModal'
import container from './container'
import styles from './styles.scss'

const Modals = ({
  mutualModal,
  isMutualVisible,
  closeMutualModal,
  modifiers,
  isCloseBtnHidden,
}) => (
  <div className={styles.modals}>
    {/* Old Modals potentially Mutually Exclusive */}
    <LoginModal />
    <ForgotPasswordModal />
    <SignUpModal />
    <PromoCodeModal />
    <ChangeEmailModal />

    {/* Mutually Exclusive Modals */}
    <ModalBase
      handleClose={closeMutualModal}
      isShown={isMutualVisible}
      modifiers={modifiers}
      isCloseBtnHidden={isCloseBtnHidden}
    >
      {mutualModal === MUTUAL_MODALS.CONFIRM_SUBSCRIPTION && <SubscribeModal closeModal={closeMutualModal} />}
    </ModalBase>

    {/* Independence Modals */}
    <CookiesPolicyPopup />
  </div>
)

Modals.propTypes = {
  mutualModal: PropTypes.string.isRequired,
  isMutualVisible: PropTypes.bool.isRequired,
  closeMutualModal: PropTypes.func.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string).isRequired,
  isCloseBtnHidden: PropTypes.bool.isRequired,
}

export default container(Modals)
