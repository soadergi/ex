import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import TournamentTabs from 'weplay-events/components/TournamentTabs'
import {
  stagesPropType,
  currentStagePropType,
} from 'weplay-events/customPropTypes/tournamentStagesPropType'
import DropDown from 'weplay-events/components/DropDown'
import Rules from 'weplay-events/components/Rules'

import Prizes from '../Prizes'

import styles from './styles.scss'
import container from './container'
import MainWinners from './MainWinners'

const Body = ({
  i18nTexts,
  title,
  description,
  descriptionFinished,
  isTournamentFinished,
  isTournamentScheduled,
  mainWinner,
  stages,
  currentStage,
  goToStage,
  withTournamentTabs,
  FirstPlacePrizeComponent,
  tournamentTitle,
  labelIconName,
  isWinnersListCollapsed,
  showWinnersList,
  hasGroupStagePrizes,
  modifiers,
  prizeListRules,
  regulationLink,

  // optional props
  backgroundWinnerUrl,
  ButtonsBlock,
}) => (
  <div className={classNames(
    styles.block,
    styles[tournamentTitle],
  )}
  >
    <div className={styles.content}>
      <h1 className={classNames(
        styles.title,
        { 'u-mb-sm-4 u-mb-3': isTournamentFinished && tournamentTitle !== 'dotaUnderLords' },
      )}
      >
        {title}
      </h1>

      {!isTournamentFinished && (
        <p className={styles.description}>
          {description}
        </p>
      )}

      {isTournamentFinished && (
        <p className={styles.description}>
          {descriptionFinished}
        </p>
      )}
    </div>

    {ButtonsBlock}

    {isTournamentFinished && (
      <MainWinners
        label={i18nTexts.lockAndLoad.heroSection.winner.winnerLabelFirst}
        winner={mainWinner}
        tournamentTitle={tournamentTitle}
        labelIconName={labelIconName}
        showWinnersListHandler={showWinnersList}
        isWinnersListCollapsed={isWinnersListCollapsed}
        backgroundWinnerUrl={backgroundWinnerUrl}
      />
    )}

    {!isTournamentFinished && (
      <Prizes
        FirstPlacePrizeComponent={FirstPlacePrizeComponent}
        hasGroupStagePrizes={hasGroupStagePrizes}
        tournamentTitle={tournamentTitle}
      />
    )}

    {(!isTournamentFinished && !R.isEmpty(prizeListRules)) && (
      <div className={styles.wrapDropDown}>
        <DropDown
          label={i18nTexts.tugOfWar.matchDetailsButton.text}
          modifiers={modifiers}
          iconName="arrow"
        >
          <Rules
            prizeListRules={prizeListRules}
            tournamentTitle={tournamentTitle}
          />
        </DropDown>
      </div>
    )}

    {(regulationLink && isTournamentScheduled) && (
      <div className={styles.wrapLink}>
        <Link
          to={regulationLink}
          className={styles.link}
          target="_blank"
        >
          {i18nTexts.events[tournamentTitle].heroSection.tournamentRegulations}
        </Link>
        <Icon
          size="small"
          iconName="location"
          className={classNames(
            styles.icon,
            'u-ml-1',
          )}
        />
      </div>
    )}

    {withTournamentTabs && isWinnersListCollapsed && (
      <TournamentTabs
        stages={stages}
        currentStage={currentStage}
        onChange={goToStage}
        className="u-mt-2 u-mt-md-3"
      />
    )}
  </div>
)

Body.propTypes = {
  mainWinner: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  descriptionFinished: PropTypes.string,
  isTournamentFinished: PropTypes.bool.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  stages: stagesPropType.isRequired,
  currentStage: currentStagePropType,
  goToStage: PropTypes.func.isRequired,
  withTournamentTabs: PropTypes.bool,
  FirstPlacePrizeComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({}),
    imgPropType,
  ]).isRequired,
  tournamentTitle: PropTypes.string.isRequired,
  isWinnersListCollapsed: PropTypes.bool.isRequired,
  showWinnersList: PropTypes.func.isRequired,
  labelIconName: PropTypes.string,
  hasGroupStagePrizes: PropTypes.bool,
  regulationLink: PropTypes.string.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  prizeListRules: PropTypes.arrayOf(PropTypes.string),
  isTournamentScheduled: PropTypes.bool,
  ButtonsBlock: PropTypes.node,
  backgroundWinnerUrl: PropTypes.string,
}

Body.defaultProps = {
  currentStage: {
    id: '1',
    status: 'SCHEDULED',
    title: '',
  },
  withTournamentTabs: false,
  labelIconName: '',
  descriptionFinished: '',
  hasGroupStagePrizes: false,
  modifiers: [],
  prizeListRules: [],
  isTournamentScheduled: false,
  ButtonsBlock: null,
  backgroundWinnerUrl: '',
}

export default container(Body)
