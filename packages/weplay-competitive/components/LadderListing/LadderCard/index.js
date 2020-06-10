import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { useFormatDatetime } from 'weplay-core/hooks/useFormatDatetime'
import transliterate from 'weplay-core/helpers/translit'

import Link from 'weplay-components/Link'
import NotificationLabel from 'weplay-components/NotificationLabel'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'

import ladderPropType from 'weplay-competitive/customPropTypes/ladderPropType'
import { LADDER_STATUSES } from 'weplay-competitive/constants/ladderStatuses'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

import decorImage from './img/featured.svg'
import styles from './style.scss'

const mods = {
  topPriority: 'topPriority',
}

const FIRST_PLACE = 1
const featuredBackground = { backgroundImage: `url(${decorImage})` }

const LadderCard = ({
  // required props
  ladder,

  // optional props
  modifier,
}) => {
  const t = useTranslation()
  const formatDatetime = useFormatDatetime()
  const { tournamentDiscipline } = useDiscipline()
  const ladderUrl = useMemo(() => pathWithParamsByRoute(
    NAMES.LADDER,
    {
      discipline: tournamentDiscipline.url,
      ladderName: transliterate(ladder.name),
      ladderId: ladder.id,
    },
  ),
  [ladder, tournamentDiscipline])
  const ladderPrize = useMemo(
    () => ladder.ladderPrizes.find(prize => prize.place === FIRST_PLACE),
    [ladder],
  )

  return (
    <tr
      className={classNames(
        styles.block,
        {
          [styles.disabled]: ladder.ladderStatus === LADDER_STATUSES.UPCOMING,
        },
        styles[modifier],
      )}
      style={modifier === mods.topPriority ? featuredBackground : null}
    >
      <td className={classNames(
        styles.column,
        styles.header,
      )}
      >
        <div className={styles.headerWrapper}>
          <Link
            to={ladderUrl}
            className={styles.logo}
          >
            <BackgroundFullWidth src={ladder.backgroundImageUrl} />
          </Link>

          <div className={styles.headerText}>
            <Link
              to={ladderUrl}
              className={styles.title}
            >
              {ladder.name}
            </Link>
          </div>
        </div>
      </td>
      {modifier !== mods.topPriority && (
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
                title={t(`competitive.ladders.statuses.${ladder.ladderStatus}`)}
                // TODO: @Irina plz fix colors
                color={classNames(
                  {
                    isSuccess: ladder.ladderStatus === LADDER_STATUSES.ONGOING,
                    isWarning: ladder.ladderStatus === LADDER_STATUSES.UPCOMING,
                    isDisabled: ladder.ladderStatus === LADDER_STATUSES.FINISHED,
                  },
                )}
              />
              {t(`competitive.ladders.statuses.${ladder.ladderStatus}`)}
            </span>
          </td>
          <td className={classNames(
            styles.column,
            styles.half,
          )}
          >
            <p className={styles.subTitle}>
              {formatDatetime(ladder.startDate, { formatKey: 'dateMonth' })}
              {' - '}
              {formatDatetime(ladder.endDate, { formatKey: 'dateMonth' })}
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
              {t(`competitive.modals.matchmaking.${ladder.ladderType}`)}
            </p>
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
              {ladder.playersCount}
            </p>
          </td>
        </>
      )}
      <td className={classNames(
        styles.column,
        styles.footer,
      )}
      >
        <p className={styles.subTitle}>{ladderPrize.description}</p>
      </td>
    </tr>
  )
}

LadderCard.propTypes = {
  // required props
  ladder: ladderPropType.isRequired,

  // optional props
  modifier: PropTypes.oneOf([...Object.keys(mods), '']),
}

LadderCard.defaultProps = {
  // props from container

  // optional props
  modifier: '',
}

export default LadderCard
