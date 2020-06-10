import React from 'react'
import PropTypes from 'prop-types'
import className from 'classnames'
import Link from 'weplay-components/Link'

import styles from './styles.scss'
import container from './container'

const TournamentTab = ({
  tab,
  isActive,
  onClick,
  activeStageTexts,
}) => (tab.id === '9'
  ? (
    <Link
      to="/events/dota-2/tug-of-war-mad-moon"
      className={className(
        styles.tab,
        styles.tabStage9,
      )}
    >
      <div className={styles.tabContent}>
        <p className={styles.tabTitle}>{`${activeStageTexts.stageTitle}`}</p>
        <p className={styles.tabDescription}>
          {activeStageTexts.date}
          <span className={styles.tabPrize}>{activeStageTexts.prizeValue}</span>
        </p>
      </div>
    </Link>
  ) : (
    <button
      type="button"
      className={className(
        styles.tab,
        styles[`tabStage${tab.id}`],
        { [styles.isActive]: isActive },
      )}
      onClick={onClick}
    >
      <div className={styles.tabContent}>
        <p className={styles.tabTitle}>{`${activeStageTexts.stageTitle}`}</p>
        <p className={styles.tabDescription}>
          {activeStageTexts.date}
          <span className={styles.tabPrize}>{activeStageTexts.prizeValue}</span>
        </p>
      </div>
    </button>
  ))

TournamentTab.propTypes = {
  tab: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  activeStageTexts: PropTypes.shape({}).isRequired,
}

export default container(TournamentTab)
