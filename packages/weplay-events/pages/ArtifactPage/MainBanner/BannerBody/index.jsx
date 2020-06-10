import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import TournamentTabs from 'weplay-events/components/TournamentTabs'

import { STAGE_STATUS } from '../../consts'

import TournamentRegistration from './TournamentRegistration'
import Winner from './Winner/index'
import styles from './styles.scss'
import container from './container'

const BannerBody = ({
  i18nTexts,
  currentStage,
  stages,
  onChange,
  isTournamentInProgress,
  stageTitle,
}) => (
  <div className={styles.bannerBody}>
    <div className={styles.bannerBodyText}>
      <h2 className={styles.bannerTitle}>{i18nTexts.artifact.mainBanner.title}</h2>
      {currentStage.status !== STAGE_STATUS.FINISHED && (
      <p className={styles.bannerDescription}>
        <span className={classNames(
          'u-block',
          'u-text-medium',
        )}
        >
          {isTournamentInProgress
            ? i18nTexts.artifact.mainBanner.stages[currentStage.id].tournamentRegistration.inProgress.text
            : i18nTexts.artifact.mainBanner.stages[currentStage.id].tournamentRegistration.scheduled.text
          }
        </span>
        {isTournamentInProgress
          ? i18nTexts.artifact.mainBanner.stages[currentStage.id].tournamentRegistration.inProgress.description
          : i18nTexts.artifact.mainBanner.stages[currentStage.id].tournamentRegistration.scheduled.description
        }
      </p>
      )}
      {currentStage.status !== STAGE_STATUS.FINISHED
        ? (
          <TournamentRegistration
            i18nTexts={i18nTexts}
            currentStage={currentStage}
            isTournamentInProgress={isTournamentInProgress}
          />
        )
        : (
          <Winner
            stageTitle={stageTitle}
            i18nTexts={i18nTexts}
          />
        )
    }
    </div>
    <TournamentTabs
      stages={stages}
      currentStage={currentStage}

      onChange={onChange}
    />
  </div>
)

BannerBody.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      status: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  stageTitle: PropTypes.string.isRequired,
  currentStage: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    title: PropTypes.string,
  }),
  isTournamentInProgress: PropTypes.bool.isRequired,
}

BannerBody.defaultProps = {
  currentStage: {
    id: '1',
    status: STAGE_STATUS.SCHEDULED,
    title: '',
  },
}

export default container(BannerBody)
