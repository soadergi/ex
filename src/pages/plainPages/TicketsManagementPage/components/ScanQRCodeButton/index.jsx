import PropTypes from 'prop-types'
import React, {
  useState,
  useCallback,
} from 'react'
import QrReader from 'react-qr-reader'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'
import ModalBase from 'weplay-components/ModalBase'
import { activateTicketRequest } from 'weplay-events/services/e-ticket-service'

import styles from '../Header/styles.scss'

import CheckingTicketContent from './Modals/CheckingTicketContent'

const modalModifiers = ['paddingLess']

function ScanQRCodeButton({ getActivatedTicketsList }) {
  const t = useTranslation()

  const [isQRCodeScannerOpened, setIsQRCodeScannerOpened] = useState(false)
  const toggleQRCodeScannerVisibility = useCallback(
    () => setIsQRCodeScannerOpened(!isQRCodeScannerOpened),
    [isQRCodeScannerOpened],
  )

  const [isCheckingTicketModalOpened, setIsCheckingTicketModalOpened] = useState(false)
  const [checkingTicketStatus, setCheckingTicketStatus] = useState('')
  const toggleCheckingTicketModalVisibility = useCallback(
    () => setIsCheckingTicketModalOpened(!isCheckingTicketModalOpened),
    [isCheckingTicketModalOpened],
  )

  const handleScan = useCallback(
    (data) => {
      if (data) {
        toggleQRCodeScannerVisibility()
        toggleCheckingTicketModalVisibility()
        const qrSecretHash = data.split('ticket=')[1]
        activateTicketRequest(qrSecretHash)
          .then(() => {
            setCheckingTicketStatus('success')
            getActivatedTicketsList()
          })
          .catch(() => setCheckingTicketStatus('failure'))
      }
    },
    [isQRCodeScannerOpened],
  )

  const scanAnotherTicket = useCallback(
    () => {
      setIsCheckingTicketModalOpened(false)
      setIsQRCodeScannerOpened(true)
    },
    [],
  )

  const closeModal = useCallback(
    () => {
      setIsCheckingTicketModalOpened(false)
      setIsQRCodeScannerOpened(false)
    },
    [],
  )

  const handleError = useCallback(() => setCheckingTicketStatus('failure'), [])

  return (
    <>
      <ModalBase
        handleClose={toggleQRCodeScannerVisibility}
        isShown={isQRCodeScannerOpened}
        modifiers={modalModifiers}
      >
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          className={styles.qrModal}
        />
      </ModalBase>

      <Button
        color={BUTTON_COLOR.CTA}
        className={styles.buttonScan}
        onClick={toggleQRCodeScannerVisibility}
      >
        {t('events.ticketsPage.header.buttonScanTicketText')}
      </Button>

      <ModalBase
        handleClose={closeModal}
        isShown={isCheckingTicketModalOpened}
      >
        <CheckingTicketContent
          isSuccess={checkingTicketStatus === 'success'}
          isFailure={checkingTicketStatus === 'failure'}
          scanAnotherTicket={scanAnotherTicket}
        />
      </ModalBase>
    </>
  )
}

ScanQRCodeButton.propTypes = {
  getActivatedTicketsList: PropTypes.func.isRequired,
}

export default ScanQRCodeButton
