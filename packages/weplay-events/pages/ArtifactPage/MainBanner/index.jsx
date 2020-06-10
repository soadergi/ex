import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { STAGE_STATUS } from '../consts'

import BannerHeader from './BannerHeader'
import BannerBody from './BannerBody'
import container from './container'
import styles from './styles.scss'

const MainBanner = ({
  goToStage,
  currentStage,
  stages,
  isTournamentInProgress,
  stageTitle,
}) => (
  <div className={classNames(
    styles.mainBanner,
    styles[stageTitle],
  )}
  >
    <div className={styles.mainBannerContainer}>
      <BannerHeader />

      <BannerBody
        stageTitle={stageTitle}
        stages={stages}
        currentStage={currentStage}
        isTournamentInProgress={isTournamentInProgress}
        onChange={goToStage}
      />
    </div>
  </div>
)

MainBanner.propTypes = {
  goToStage: PropTypes.func.isRequired,
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  currentStage: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
  }),
  isTournamentInProgress: PropTypes.bool.isRequired,
  stageTitle: PropTypes.string.isRequired,
}

MainBanner.defaultProps = {
  currentStage: {
    id: '1',
    status: STAGE_STATUS.SCHEDULED,
    title: '',
  },
}

export default container(MainBanner)
