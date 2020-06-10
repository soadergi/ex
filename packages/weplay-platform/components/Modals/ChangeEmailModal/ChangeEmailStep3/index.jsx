import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import ModalControls from 'weplay-components/_modal-components/ModalControls'

import styles from '../styles.scss'

import container from './container'

const buttonBorder = ['blockBorderBlue']

const ChangeEmailStep3 = ({
  approveSaveSubscriptions,
  declineSaveSubscriptions,
  goToStep,
}) => {
  const t = useTranslation()

  return (
    <>
      <div className="step-two u-text-center">
        <ModalControls
          primaryButtonType="button"
          secondaryButtonType="submit"
          primaryButtonText={t('mediaCore.registration.prev')}
          secondaryButtonText={t('mediaCore.modals.changeEmailModal.changeEmailStep3.accept')}
          primaryButtonCallback={() => goToStep('changeEmailStep2')}
          secondaryButtonCallback={approveSaveSubscriptions}
          primaryButtonModifiers={buttonBorder}
        />
        <button
          type="submit"
          onClick={declineSaveSubscriptions}
          className={styles.declineButton}
        >
          {t('mediaCore.modals.changeEmailModal.changeEmailStep3.decline')}
        </button>
      </div>
    </>
  )
}

ChangeEmailStep3.propTypes = {
  declineSaveSubscriptions: PropTypes.func.isRequired,
  approveSaveSubscriptions: PropTypes.func.isRequired,
  goToStep: PropTypes.func.isRequired,
}

export default container(ChangeEmailStep3)
