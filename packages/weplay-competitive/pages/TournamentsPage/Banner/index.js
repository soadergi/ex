import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import container from 'weplay-competitive/pages/TournamentsPage/Banner/container'

import styles from './styles.scss'

const Banner = ({
  // required props

  // container props
  handleApply,
  isTournamentDota2BetaPlayer,
  // optional props
}) => {
  const t = useTranslation()

  return (!isTournamentDota2BetaPlayer
    ? (
      <div className={styles.block}>
        <p className={styles.title}>
          {t('competitive.tournaments.banner.title')}
        </p>
        <Button
          color={BUTTON_COLOR.CTA}
          onClick={handleApply}
        >
          {t('competitive.tournaments.banner.button')}
        </Button>
      </div>
    )
    : null
  )
}

Banner.propTypes = {
  // required props

  // container props
  handleApply: PropTypes.func.isRequired,
  isTournamentDota2BetaPlayer: PropTypes.bool.isRequired,
  // optional props

}

Banner.defaultProps = {
  // optional props
}

export default container(Banner)
