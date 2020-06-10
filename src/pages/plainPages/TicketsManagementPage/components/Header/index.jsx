import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import Icon from 'weplay-components/Icon'
import downloadFile from 'weplay-events/helpers/downloadFile'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import ScanQRCodeButton from '../ScanQRCodeButton'

import styles from './styles.scss'

function Header({ getActivatedTicketsList }) {
  const t = useTranslation()
  const globalScope = useSelector(globalScopeSelector)

  const handleClick = useCallback(
    () => {
      // globalScope is used here to make browser refresh page after redirect
      // This is needed for BaseLayout portals targetContainers reinitialization
      // TODO: Replace it when Illia merged to develop his changes of header and footer
      globalScope.location.href = '/events/dota-2/tug-of-war-mad-moon'
    },
    [globalScope.location.href],
  )

  const downloadCSV = useCallback(
    () => {
      // TODO: Refactor to not use querySelectors and innerHTML, WE-1256
      const rows = document.querySelectorAll('#currentUserTicketRow')
      const rowsData = Array.from(rows).map((row) => {
        const nickName = row.querySelector('#currentUserNickname').innerHTML
        const firstName = row.querySelector('#currentUserFirstName').innerHTML
        const lastName = row.querySelector('#currentUserLastName').innerHTML
        const email = row.querySelector('#currentUserEmail').innerHTML
        const activationsRow = row.querySelectorAll('.currentUserActivations')
        const activationsData = Array.from(activationsRow).map(activation => activation.innerHTML)
        const activations = activationsData.join(' ')

        return [nickName, firstName, lastName, email, activations]
      })

      const rowsDataWithHeaders = [['NICKNAME', 'FIRST_NAME', 'LAST_NAME', 'EMAIL', 'ACTIVATIONS']].concat(rowsData)

      const csvData = rowsDataWithHeaders.map(e => e.join(',')).join('\n')

      const encodedUri = `data:text/csv;charset=utf-8,\uFEFF${encodeURIComponent(csvData)}`
      downloadFile(encodedUri, 'tickets activations.csv')
    },
    [],
  )

  return (
    <div className={styles.block}>
      <div
        className={styles.link}
        onClick={handleClick}
      >
        <Icon
          className={styles.icon}
          iconName="arrow-left"
          size="small"
        />
        {t('events.ticketsPage.header.linkText')}
      </div>

      <div className={styles.wrapButtons}>
        <Button
          priority={BUTTON_PRIORITY.SECONDARY}
          className={styles.buttonExport}
          onClick={downloadCSV}
        >
          {t('events.ticketsPage.header.buttonExportTicketText')}
        </Button>

        <ScanQRCodeButton getActivatedTicketsList={getActivatedTicketsList} />
      </div>
    </div>
  )
}

Header.propTypes = {
  getActivatedTicketsList: PropTypes.func.isRequired,
}

export default Header
