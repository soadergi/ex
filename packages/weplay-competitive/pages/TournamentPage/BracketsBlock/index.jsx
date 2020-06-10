import * as R from 'ramda'
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Section from 'weplay-competitive/components/Section'
import Wrapper from 'weplay-competitive/components/Wrapper'
import BracketsControls from 'weplay-competitive/pages/TournamentPage/BracketsBlock/BracketsControls'
import { TOURNAMENT_BRACKETS } from 'weplay-competitive/constants/tournamentBrackets'
import RoundsLabels from 'weplay-competitive/components/TMPlayOff/RoundsLabels'

import styles from './styles.scss'
import container from './container'
import PlayOffBlock from './PlayOffBlock'
import GroupBlock from './GroupBlock'

const sectionModification = ['greyBackground']
const containerMod = ['fluid']

const BracketsBlock = ({
  // required props
  isTournamentFinished,

  // container props
  tournamentNodes,
  tournamentBracketType,
  createBracketsRef,
  createHeaderRef,
  handleButtonClick,
  handleHeaderPosition,
  isCollapsed,
  isFullScreen,
  handleToggleCollapse,
  getRoundStatus,
  // optional props
}) => {
  const t = useTranslation()

  return (!R.isEmpty(tournamentNodes) && (
  <div
    className={classNames(
      styles.block,
      {
        [styles.isFullScreen]: isFullScreen,
      },
    )}
    ref={createBracketsRef}
  >
    {tournamentBracketType === TOURNAMENT_BRACKETS.GROUP
      ? (
        <Section modifiers={sectionModification}>
          <GroupBlock />
        </Section>
      )
      : (
        <>
          <div className={styles.header}>
            <Wrapper modifiers={containerMod}>
              <BracketsControls
                tips={[
                  {
                    iconName: 'bracket-empty-cell',
                    text: t('competitive.tournaments.statuses.ONGOING'),
                    color: 'success',
                  },
                  {
                    iconName: 'bracket-empty-cell',
                    text: t('competitive.tournaments.statuses.CANCELED'),
                    color: 'error',
                  },
                  {
                    iconName: 'skull',
                    text: t('competitive.tournaments.statuses.TECHNICAL_DEFEAT'),
                    color: 'magenta',
                  },
                ]}
                controls={[
                // {
                //   iconName: 'bracket-cell',
                //   text: t('competitive.tournament.brackets.yourPosition'),
                //   // TODO: @Roman Bogdanov
                //   clickHandler: () => { alert('My position is here!') },
                // },
                  {
                    iconName: 'collision',
                    text: t('competitive.tournament.brackets.compactView'),
                    clickHandler: handleToggleCollapse,
                  },
                  {
                    iconName: 'scaleUp',
                    text: isFullScreen
                      ? t('competitive.tournament.brackets.fullScreenOut')
                      : t('competitive.tournament.brackets.fullScreenIn'),
                    clickHandler: handleButtonClick,
                  },
                ]}
              />
            </Wrapper>
            <div
              className={styles.controls}
              ref={createHeaderRef}
            >
              <RoundsLabels
                rounds={tournamentNodes}
                getRoundStatus={getRoundStatus}
              />
            </div>
          </div>
          <PlayOffBlock
            handleHeaderPosition={handleHeaderPosition}
            isTournamentFinished={isTournamentFinished}
            tournamentNodes={tournamentNodes}
            isCollapsed={isCollapsed}
            getRoundStatus={getRoundStatus}
          />
        </>
      )}
  </div>
  ))
}

BracketsBlock.propTypes = {
  // required props

  // container props
  isTournamentFinished: PropTypes.bool.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  isFullScreen: PropTypes.bool.isRequired,
  tournamentBracketType: PropTypes.string.isRequired,
  tournamentNodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleToggleCollapse: PropTypes.func.isRequired,
  handleHeaderPosition: PropTypes.func.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  getRoundStatus: PropTypes.func.isRequired,
  // optional props
}

BracketsBlock.defaultProps = {
  // optional props
}

export default container(BracketsBlock)
