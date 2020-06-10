import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import DividedDateTime from 'weplay-components/DividedDateTime'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'

const TipLogged = ({
  // required props
  currentTournament,
  tipType,
  // container props
  // optional props
}) => {
  const t = useTranslation()

  return (
    <>
      {t(`competitive.tournament.tips.${tipType}`)}
      {tipType === 'regWillBeOpened' && (
        <>
          {' '}
          <DividedDateTime dateTime={currentTournament.openRegistrationDatetime} />
        </>
      )}
    </>
  )
}

TipLogged.propTypes = {
  // required props
  currentTournament: tournamentPropType.isRequired,
  tipType: PropTypes.string.isRequired,
  // container props
  // optional props
}

TipLogged.defaultProps = {
  // optional props
}

export default TipLogged
