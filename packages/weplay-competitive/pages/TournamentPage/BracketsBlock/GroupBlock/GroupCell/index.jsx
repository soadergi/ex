import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import matchPropType from 'weplay-competitive/customPropTypes/matchPropType'

import container from './container'
import styles from './styles.scss'

const GroupCell = ({
  // required props

  // container props
  currentMatch,
  isMatchTechnicalEnded,
  isCancelled,
  isOngoing,
  isUpcoming,
  isLobbyReady,
  discipline,
  tournamentId,
  tournamentName,
  score,

  // optional props
  className,
}) => {
  const t = useTranslation()

  return (!currentMatch.withHimself
    ? (
      <td className={classNames(
        styles.cell,
        className,
        {
          [styles.isOngoing]: isOngoing,
          [styles.isCancelled]: isCancelled,
        },
      )}
      >
        {isLobbyReady && (
        <Link
          to={pathWithParamsByRoute(
            NAMES.MATCH,
            {
              tournamentId,
              tournamentName: transliterate(tournamentName),
              matchId: currentMatch.id,
              discipline,
            },
          )}
          className={styles.link}
        >
          <span className={styles.linkText}>
            {t('competitive.tournament.brackets.lobby')}
          </span>
        </Link>
        )}

        <span className={styles.wrapper}>
          {isUpcoming ? '-:-' : score}

          {isLobbyReady && (
          <Icon
            iconName="arrow-down-second"
            size="small"
            className={classNames(
              styles.icon,
              styles.arrow,
            )}
          />
          )}
          {isMatchTechnicalEnded && (
          <Icon
            iconName="skull"
            className={classNames(
              styles.icon,
              styles.skull,
            )}
          />
          )}
        </span>
      </td>
    )
    : (
      <td className="u-text-bold">
        {t('competitive.tournament.brackets.dnp')}
      </td>
    ))
}

GroupCell.propTypes = {
  // required props

  // container props
  currentMatch: matchPropType.isRequired,
  isMatchTechnicalEnded: PropTypes.bool.isRequired,
  isCancelled: PropTypes.bool.isRequired,
  isUpcoming: PropTypes.bool.isRequired,
  isOngoing: PropTypes.bool.isRequired,
  isLobbyReady: PropTypes.bool.isRequired,
  discipline: PropTypes.string.isRequired,
  tournamentId: PropTypes.number.isRequired,
  tournamentName: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,

  // props from HOCs

  // optional props
  className: PropTypes.string,
}

GroupCell.defaultProps = {
  // optional props
  className: '',
}

export default container(GroupCell)
