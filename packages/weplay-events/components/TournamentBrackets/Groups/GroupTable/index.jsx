import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SlideToggle from 'weplay-components/SlideToggle'
import Icon from 'weplay-components/Icon'

import DefaultGroupTableRow from './DefaultGroupTableRow'
import DefaultGroupTableHead from './DefaultGroupTableHead'
import styles from './styles.scss'
import container from './container'

const GroupTable = ({
  // required props
  group,
  index,
  participantKey,
  isFinalGroupTabActive,

  // props from container

  // optional props
  isMobileWidth,
  stageTitle,
  isRoundRobinTournament,
  CustomGroupTableRow,
  renderTableHead,
  footer,
  hasTicketIcon,
  winnerIconName,
  amountOfWinners,
}) => (
  <div
    className={classNames(
      styles[stageTitle],
      styles.collapse,
    )}
  >
    <SlideToggle
      key={group.uuid}
      collapsed={(index > 0 && isMobileWidth) && !isRoundRobinTournament}
    >
      {({ onToggle, setCollapsibleElement, range }) => (
        <>
          <a
            className={classNames(
              styles.title,
              styles[stageTitle],
              { [styles.isOpen]: range > 0 },
            )}
            onClick={onToggle}
          >
            {group.name}
            <Icon
              iconName="arrow-down-second"
              className={styles.arrow}
              size="small"
            />
          </a>

          <div
            className={styles.wrapper}
            ref={setCollapsibleElement}
          >
            <table className={classNames(
              styles.group,
              styles[stageTitle],
            )}
            >
              {renderTableHead ? renderTableHead({
                groupName: group.name,
              }) : (
                <DefaultGroupTableHead groupName={group.name} />
              )}

              <tbody className={styles.tBody}>
                {CustomGroupTableRow ? (
                  group[participantKey].map((participant, participantIndex) => (
                    <CustomGroupTableRow
                      key={participant.uuid}
                      participant={participant}
                      cellClassName={styles.cell}
                      stageTitle={stageTitle}
                      isWinner={participantIndex < amountOfWinners}
                      isFinalGroupTabActive={isFinalGroupTabActive}
                      hasTicketIcon={hasTicketIcon}
                      winnerIconName={winnerIconName}
                    />
                  ))
                ) : (
                  group[participantKey].map((participant, participantIndex) => (
                    <DefaultGroupTableRow
                      key={participant.uuid}
                      participant={participant}
                      cellClassName={styles.cell}
                      stageTitle={stageTitle}
                      isWinner={participantIndex < amountOfWinners}
                    />
                  ))
                )}
              </tbody>
            </table>

            {footer}
          </div>
        </>
      )}
    </SlideToggle>
  </div>
)

GroupTable.propTypes = {
  // required props
  group: PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  participantKey: PropTypes.oneOf(['teams', 'players']).isRequired,
  isFinalGroupTabActive: PropTypes.bool,

  // props from container
  isMobileWidth: PropTypes.bool.isRequired,

  // optional props
  stageTitle: PropTypes.string,
  amountOfWinners: PropTypes.number,
  isRoundRobinTournament: PropTypes.bool,
  hasTicketIcon: PropTypes.bool,
  footer: PropTypes.node,
  CustomGroupTableRow: PropTypes.func,
  index: PropTypes.number,
  renderTableHead: PropTypes.func,
  winnerIconName: PropTypes.string,
}

GroupTable.defaultProps = {
  // optional props
  stageTitle: '',
  amountOfWinners: 0,
  isRoundRobinTournament: false,
  hasTicketIcon: false,
  footer: null,
  CustomGroupTableRow: null,
  index: null,
  renderTableHead: null,
  winnerIconName: '',
  isFinalGroupTabActive: false,
}

export default container(GroupTable)
