import React from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import DividedDateTime from 'weplay-components/DividedDateTime'
import Tip from 'weplay-components/Tip'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'

import styles from '../styles.scss'

const TipRegistrationWillBeClosed = ({
  // required props
  currentTournament,
  // container props
  // optional props
}) => {
  const t = useTranslation()

  return (
    <Tip
      className={styles.tip}
      isWarning
    >
      {t('competitive.tournament.info.registerUntil')}
      {' '}
      <DividedDateTime dateTime={currentTournament.closeRegistrationDatetime} />
    </Tip>
  )
}

TipRegistrationWillBeClosed.propTypes = {
  // required props
  currentTournament: tournamentPropType.isRequired,
  // container props
  // optional props
}

TipRegistrationWillBeClosed.defaultProps = {
  // optional props
}

export default TipRegistrationWillBeClosed
