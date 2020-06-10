import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import styles from './styles.scss'
import GroupGrid from './GroupGrid'

const GroupsBukovel = ({
  // required properties
  groups,

  // optional props
  stageTitle,
  tournamentTitle,
  isRoundRobinTournament,
  CustomGroupTableRow,
  hasTicketIcon,
  renderTableHead,
  winnerIconName,
  groupWinnersNumber,
}) => {
  const t = useTranslation()

  return (
    <>
      <div className={classNames(
        styles.grid,
        styles[stageTitle],
      )}
      >
        {groups.map((group, index) => (
          <GroupGrid
            group={group}
            index={index}
            key={group.uuid}
            stageTitle={stageTitle}
            isRoundRobinTournament={isRoundRobinTournament}
            CustomGroupTableRow={CustomGroupTableRow}
            renderTableHead={renderTableHead}
            winnerIconName={winnerIconName}
            hasTicketIcon={hasTicketIcon}
            groupWinnersNumber={groupWinnersNumber}
          />
        ))}
      </div>

      <p className={styles.note}>
        <div className={styles.playoffImage} />
        {' — '}

        {hasTicketIcon
          ? t(`events.${tournamentTitle}.tournamentBracket.${winnerIconName
            ? 'firstAndSecondStage'
            : 'secondStage.roundRobin'}`)
          : t('events.dotaUnderlords.standingsDescription')}
      </p>
    </>
  )
}

GroupsBukovel.propTypes = {
  // required properties
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // optional props
  stageTitle: PropTypes.string,
  tournamentTitle: PropTypes.string,
  isRoundRobinTournament: PropTypes.bool,
  hasTicketIcon: PropTypes.bool,
  CustomGroupTableRow: PropTypes.func,
  renderTableHead: PropTypes.func,
  winnerIconName: PropTypes.string,
  groupWinnersNumber: PropTypes.number,
}

GroupsBukovel.defaultProps = {
  stageTitle: '',
  tournamentTitle: '',
  isRoundRobinTournament: false,
  hasTicketIcon: false,
  CustomGroupTableRow: null,
  renderTableHead: null,
  winnerIconName: '',
  groupWinnersNumber: null,
}

export default GroupsBukovel
