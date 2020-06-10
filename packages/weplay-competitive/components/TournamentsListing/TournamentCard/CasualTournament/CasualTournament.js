import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { pathWithParamsByRoute, NAMES } from 'weplay-core/routes'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import DividedDateTime from 'weplay-components/DividedDateTime'
import NotificationLabel from 'weplay-components/NotificationLabel'

import gameModePropType from 'weplay-competitive/customPropTypes/gameModePropType'
import { ACCESS_TYPES } from 'weplay-competitive/constants/accessTypes'
import tournamentPropType from 'weplay-competitive/customPropTypes/tournamentPropType'

import styles from '../style.scss'

const CasualTournament = ({
  // required props
  tournament,
  discipline,

  // props from container
  gameMode,
  accessIcon,

  // optional props
}) => {
  const t = useTranslation()
  return (
    <>
      <td className={classNames(
        styles.column,
        styles.half,
      )}
      >
        <div className={styles.columnTitle}>{t('competitive.member.game.date')}</div>
        <span className={styles.status}>
          <NotificationLabel
            className={styles.notification}
            title={t(`competitive.tournaments.statuses.${tournament.status}`)}
            color={classNames(
              {
                isSuccess: tournament.status === 'ONGOING',
                isWarning: tournament.status === 'UPCOMING',
                isDisabled: tournament.status === 'ENDED',
                '': tournament.status === 'CANCELED',
              },
            )}
          />
          {t(`competitive.tournaments.statuses.${tournament.status}`)}
        </span>
        <p className={styles.subTextDate}>
          <DividedDateTime
            formatDate="short"
            formatTime="24h"
            dateTime={tournament.startDatetime}
          />
        </p>
      </td>
      <td className={classNames(
        styles.column,
        styles.half,
      )}
      >
        <div className={styles.columnTitle}>
          {t('competitive.member.game.mode')}
        </div>
        <p className={styles.subTitle}>
          <Link
            to={`${pathWithParamsByRoute(
              NAMES.TOURNAMENTS,
              {
                discipline,
              },
            )}?gameMode=${gameMode.id}`}
          >
            {gameMode.title}
          </Link>
        </p>
        <p className={styles.subText}>
          {t(`competitive.tournaments.tournamentsTable.filters.options.brackets.${tournament.bracket}`)}
        </p>
      </td>
      <td className={classNames(
        styles.column,
        styles.half,
      )}
      >
        <div className={styles.columnTitle}>
          {t('competitive.member.game.access')}
        </div>
        <Icon
          title={t(`competitive.tournament.accessTypeTitle.${accessIcon}`)}
          iconName={accessIcon}
          className={classNames(
            styles.icon,
            styles.isBlue,
            {
              [styles.premium]: tournament.accessType === ACCESS_TYPES.ACCESS_BY_PREMIUM,
            },
          )}
        />
      </td>
      <td className={classNames(
        styles.column,
        styles.half,
      )}
      >
        <div className={styles.columnTitle}>{t('competitive.member.game.available')}</div>
        <p
          className={styles.subTitle}
          title={t('competitive.tournament.tournamentTeam.title')}
        >
          {tournament.totalSlots - tournament.emptySlots}
          {'/'}
          {tournament.totalSlots}
        </p>
      </td>
    </>
  )
}

CasualTournament.propTypes = {
  // required props
  tournament: tournamentPropType.isRequired,
  discipline: PropTypes.string.isRequired,

  // props from container
  gameMode: gameModePropType.isRequired,
  accessIcon: PropTypes.string.isRequired,

  // optional props
}

CasualTournament.defaultProps = {
  // props from container

  // optional props
}

export default React.memo(CasualTournament)
