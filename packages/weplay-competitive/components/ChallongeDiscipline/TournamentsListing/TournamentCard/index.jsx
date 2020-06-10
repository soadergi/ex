import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Icon from 'weplay-components/Icon'
import DividedDateTime from 'weplay-components/DividedDateTime'
import NotificationLabel from 'weplay-components/NotificationLabel'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'
import underlordsTournamentPropType from 'weplay-competitive/customPropTypes/underlordsTournamentPropType'
import { CHALLONGE_STATUSES } from 'weplay-competitive/constants/challongeStatuses'
import withDiscipline from 'weplay-competitive/HOCs/withDiscipline'
import disciplinePropType from 'weplay-competitive/customPropTypes/disciplinePropType'

import styles from './style.scss'

const SMALL_SIZE = 1080
const MEDIUM_SIZE = 1200
const BIG_SIZE = 400
const widths = [SMALL_SIZE, MEDIUM_SIZE, BIG_SIZE]
const UnderlordCard = ({
  // required props
  tournament,
  // props from HOC
  tournamentDiscipline,
  discipline,
}) => {
  const t = useTranslation()
  return (
    <tr className={styles.block}>
      <td className={classNames(
        styles.column,
        styles.common,
        styles.header,
      )}
      >
        <div className={styles.headerWrapper}>
          <a
            href={tournament.fullChallongeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.logo}
          >
            <BackgroundFullWidth
              src={tournamentDiscipline?.backgrounds?.defaultTournamentCard}
              sizes="(max-width: 40em) 1080px, (max-width: 75em) 1200px, 400px"
              widths={widths}
            />
            <Icon
              iconName="cup"
              className={styles.icon}
            />
          </a>
          <div className={styles.headerText}>
            <a
              href={tournament.fullChallongeUrl}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.title}
            >
              {tournament.name}
            </a>
          </div>
        </div>
      </td>
      <td className={classNames(
        styles.column,
        styles.half,
        styles.hasBorder,
      )}
      >
        <p className={styles.columnTitle}>{t('competitive.member.game.date')}</p>
        <span className={styles.status}>
          <NotificationLabel
            className={styles.notification}
            title={t(`competitive.challongeGame.statuses.${tournament.state}`)}
            color={classNames(
              {
                isSuccess: tournament.state === CHALLONGE_STATUSES.UNDERWAY,
                isWarning: tournament.state === CHALLONGE_STATUSES.PENDING,
                isDisabled: tournament.state === CHALLONGE_STATUSES.COMPLETE,
              },
            )}
          />
          {t(`competitive.challongeGame.statuses.${tournament.state}`)}
        </span>
        <p className={styles.subTextDate}>
          <DividedDateTime
            formatDate="dateMonth"
            dateTime={tournament.startedAt || tournament.startAt}
          />
        </p>
      </td>
      <td className={classNames(
        styles.column,
        styles.half,
        styles.hasBorder,
      )}
      >
        <p className={styles.columnTitle}>{t('competitive.member.game.type')}</p>
        <p className={styles.subTitle}>
          {tournament.tournamentType}
        </p>
      </td>
      <td className={classNames(
        styles.column,
        styles.member,
        styles.common,
        styles.hasBorder,
      )}
      >
        <p className={styles.columnTitle}>{t('competitive.member.game.available')}</p>
        <p className={styles.subTitle}>{tournament.participantsCount}</p>
      </td>
      <td className={classNames(
        styles.column,
        styles.common,
        'u-mb-0',
      )}
      >
        <p className={styles.columnTitle}>{t('competitive.member.game.prizes')}</p>
        <p className={styles.subTitle}>
          {t(`competitive.challongeGame.${discipline}.tournaments.prize`)}
        </p>
      </td>
    </tr>
  )
}

UnderlordCard.propTypes = {
  // required props
  tournament: underlordsTournamentPropType.isRequired,

  // props from HOC
  tournamentDiscipline: disciplinePropType.isRequired,
  discipline: PropTypes.string.isRequired,
}

export default withDiscipline(UnderlordCard)
