import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tabs from 'weplay-components/Tabs'
import { stagesPropType, currentStagePropType } from 'weplay-events/customPropTypes/tournamentStagesPropType'

import TournamentTab from './TournamentTab'
import styles from './styles.scss'
import container from './container'

const TournamentTabs = ({
  stages,
  currentStage,
  onChange,
  className,
}) => (
  <div
    className={classNames(
      styles.tournamentTabs,
      className,
    )}
  >
    <Tabs
      tabs={stages}
      activeTab={currentStage}
      TabComponent={TournamentTab}

      onChange={onChange}
    />
  </div>
)

TournamentTabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  stages: stagesPropType.isRequired,
  currentStage: currentStagePropType,
  className: PropTypes.string,
}

TournamentTabs.defaultProps = {
  className: '',
  currentStage: {
    id: '1',
    status: 'SCHEDULED',
    title: '',
  },
}

export default container(TournamentTabs)
