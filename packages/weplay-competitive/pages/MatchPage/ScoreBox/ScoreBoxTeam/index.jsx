import React from 'react'
import PropTypes from 'prop-types'
import SlideToggle from 'weplay-components/SlideToggle'

import container from './container'
import styles from './styles.scss'
import DefaultStatistic from './DefaultStatistic'
import DetailedStatistic from './DetailedStatistic'

const ScoreBoxTeam = ({
  // required props
  // props from container
  team,
  sideIndex,
  serverPick,
  scoreBoxHeadCells,
  scoreBoxCells,
  // optional props
}) => (
  <SlideToggle collapsed>
    {({ onToggle, setCollapsibleElement, progress }) => (
      <div className={styles.wrapper}>
        <div
          className={styles.trigger}
          onClick={onToggle}
        >
          <DefaultStatistic
            progress={progress}
            team={team}
            sideIndex={sideIndex}
            serverPick={serverPick}
            scoreBoxHeadCells={scoreBoxHeadCells}
          />
        </div>
        <div
          className={styles.collapsible}
          ref={setCollapsibleElement}
        >
          {team.players && (
            <DetailedStatistic
              team={team}
              scoreBoxCells={scoreBoxCells}
            />
          )}
        </div>
      </div>
    )}
  </SlideToggle>
)

ScoreBoxTeam.propTypes = {
  // required props
  team: PropTypes.shape({
    players: PropTypes.arrayOf(PropTypes.shape({})),
    teamId: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
  serverPick: PropTypes.bool.isRequired,
  scoreBoxHeadCells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  scoreBoxCells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  sideIndex: PropTypes.number.isRequired,
  // optional props

}

export default container(ScoreBoxTeam)
