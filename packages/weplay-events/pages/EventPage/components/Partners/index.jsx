import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { getEventPartnersSelector } from 'weplay-events/reduxs/tournamentCompanies/selectors'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

import styles from './styles.scss'
import Partner from './Partner'

const Partners = ({ className }) => {
  const tournamentId = useCurrentTournamentId()
  const eventPartners = useSelector(getEventPartnersSelector)(tournamentId)

  if (!tournamentId) return null

  return (
    <div
      className={classNames(
        styles.block,
        className,
      )}
    >
      <ul className={styles.list}>
        {eventPartners.map(partner => (
          <Partner
            key={partner.id}
            partner={partner}
          />
        ))}
      </ul>
    </div>
  )
}

Partners.propTypes = {
  // optional props
  className: PropTypes.string,
}

Partners.defaultProps = {
  // optional props
  className: '',
}

export default React.memo(Partners)
