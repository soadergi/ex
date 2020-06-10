import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import ModalBase from 'weplay-components/ModalBase'

import PrizePoolList from './PrizePoolList'
import styles from './styles.scss'

const modalModifiers = ['widthAuto']

const PrizePoolPopup = ({ togglePrizePoolPopupVisibility }) => {
  const t = useTranslation()

  return (
    <ModalBase
      isShown
      modifiers={modalModifiers}
      handleClose={togglePrizePoolPopupVisibility}
    >
      <div className={styles.block}>
        <p className={styles.title}>
          {t('events.prizePoolPopup.title')}
        </p>

        <PrizePoolList />
      </div>
    </ModalBase>
  )
}

PrizePoolPopup.propTypes = {
  togglePrizePoolPopupVisibility: PropTypes.func.isRequired,
}

export default PrizePoolPopup
