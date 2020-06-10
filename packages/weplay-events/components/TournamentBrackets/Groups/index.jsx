import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import container from './container'
import styles from './groups.scss'
import GroupTable from './GroupTable'

const Groups = ({
  // required properties
  groups,
  i18nTexts,

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
          <GroupTable
            group={group}
            index={index}
            key={group.uuid}
            i18nTexts={i18nTexts}
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
        <Icon
          iconName={winnerIconName || 'play-off'}
          className={classNames(
            styles.noteIcon,
            styles[winnerIconName],
          )}
        />
        {' — '}

        {hasTicketIcon
          ? t(`events.${tournamentTitle}.tournamentBracket.${winnerIconName
            ? 'firstAndSecondStage'
            : 'secondStage.roundRobin'}`)
          : i18nTexts.dotaUnderlords.standingsDescription}
      </p>
    </>
  )
}

Groups.propTypes = {
  // required properties
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,

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

Groups.defaultProps = {
  stageTitle: '',
  tournamentTitle: '',
  isRoundRobinTournament: false,
  hasTicketIcon: false,
  CustomGroupTableRow: null,
  renderTableHead: null,
  winnerIconName: '',
  groupWinnersNumber: null,
}

export default container(Groups)
