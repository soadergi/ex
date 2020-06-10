import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import classNames from 'classnames'
import Link from 'weplay-components/Link'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'
import disciplinePropType from 'weplay-competitive/customPropTypes/disciplinePropType'

import container from './container'
import styles from './styles.scss'

const TournamentGame = ({
  // required props
  tournamentDiscipline,
  discipline,
  // container props
  isDisabledForPlayer,
  handleLinkClick,
  // optional props
}) => {
  const t = useTranslation()
  return (
    <Link
      to={`${pathWithParamsByRoute(
        NAMES.TOURNAMENTS,
        {
          discipline: tournamentDiscipline.url,
        },
      )}`}
      className={classNames(
        styles.link,
        {
          [styles.isDisabled]: isDisabledForPlayer,
          [styles.isActive]: DISCIPLINES[discipline].id === tournamentDiscipline.id,
        },
      )}
    >
      <div
        className={styles.wrapper}
        onClick={handleLinkClick}
      >
        <img
          className={styles.image}
          src={tournamentDiscipline.backgrounds.iconTournamentsPage}
          alt=""
        />
      </div>
      <div className={styles.text}>
        <span className={styles.title}>{tournamentDiscipline.name}</span>
        {isDisabledForPlayer && (
          <span className={styles.message}>{t('competitive.tournaments.route.beta')}</span>
        )}
      </div>
    </Link>
  )
}

TournamentGame.propTypes = {
  // required props
  tournamentDiscipline: disciplinePropType.isRequired,
  discipline: PropTypes.string.isRequired,
  // container props
  isDisabledForPlayer: PropTypes.bool.isRequired,
  handleLinkClick: PropTypes.func.isRequired,
  // optional props
}

TournamentGame.defaultProps = {
  // optional props
}

export default container(TournamentGame)
