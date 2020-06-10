import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { useFormatDatetime } from 'weplay-core/hooks/useFormatDatetime'

import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import TableRow from 'weplay-competitive/components/TableRow'
import matchTableItemPropType from 'weplay-competitive/customPropTypes/matchTableItemPropType'
import { AT__LOBBY_VIEW } from 'weplay-competitive/analytics/amplitude'

import styles from './styles.scss'
import container from './container'

const Match = ({
  // required props
  matchItem,
  // props from container
  votePoolNames,
  gameModeTitle,
  goToMatchPage,
  discipline,
  // optional props
}) => {
  const t = useTranslation()
  const formatDatetime = useFormatDatetime()
  return (
    <TableRow isDefault>
      <>
        <td>
          {matchItem.startDatetime && (
            <>
              {formatDatetime(matchItem.startDatetime, { formatKey: 'short' })}
              <p className={styles.subText}>
                {formatDatetime(matchItem.startDatetime, { formatKey: '24h' })}
              </p>
            </>
          )}
        </td>
        <td>
          <span className={classNames(
            {
              'u-color-success':
              matchItem.status === 'VOTING'
              || matchItem.status === 'ONGOING'
              || matchItem.status === 'UPCOMING',
              'u-color-blue': matchItem.status === 'PAUSE' || matchItem.status === 'FINISHED',
              'u-color-error': matchItem.status === 'CANCELED',
            },
          )}
          >
            {t(`competitive.tournaments.statuses.${matchItem.status}`)}
          </span>
        </td>
        <td>
          {gameModeTitle}
        </td>
        <td>
          {`${matchItem.score1}:${matchItem.score2}`}
        </td>
        <td>
          <ul className={styles.mapList}>
            {votePoolNames.map(item => (
              <li
                className={styles.mapItem}
                key={item}
              >
                {item}
              </li>
            ))}
          </ul>
        </td>
        <td>
          {matchItem.status === 'VOTING' || matchItem.status === 'ONGOING' || matchItem.status === 'UPCOMING'
            ? (
              <Button
                color={BUTTON_COLOR.SUCCESS}
                onClick={goToMatchPage}
                className={styles.joinBtn}
              >
                {t('competitive.member.matchesSection.join')}
              </Button>
            )
            : (
              <button
                type="button"
                onClick={goToMatchPage}
                className={styles.view}
                {...getAnalyticsAttributes({
                  'amplitude-action': AT__LOBBY_VIEW,
                  'amplitude-source': LOOKUP,
                  'amplitude-discipline': discipline,
                })}
              >
                {t('competitive.member.matchesSection.view')}
              </button>
            )}
        </td>
      </>
    </TableRow>
  )
}

Match.propTypes = {
  // required props
  matchItem: matchTableItemPropType.isRequired,
  // props from container
  votePoolNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  gameModeTitle: PropTypes.string.isRequired,
  goToMatchPage: PropTypes.func.isRequired,
  discipline: PropTypes.string.isRequired,
  // optional props
}

Match.defaultProps = {
  // optional props
}

export default container(Match)
