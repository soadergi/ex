import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import tournamentDatePropTypes from 'weplay-core/customPropTypes/timeIntervalPropType'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'

import DefaultTournamentPrizePool from 'weplay-events/components/TournamentPrizePool'

import DefaultFirstPlacePrize from './DefaultFirstPlacePrize'
import styles from './styles.scss'
import container from './container'
import Header from './Header'
import Body from './Body'
import WinnersList from './Body/WinnersList'

const HeroSection = ({
  // required props
  TOURNAMENT_ID,
  isTournamentInProgress,

  // props from container
  i18nTexts,
  tournamentDates,
  logoUrl,
  isTournamentFinished,
  hideWinnersList,
  showWinnersList,
  isWinnersListCollapsed,
  isTournamentScheduled,

  // optional props
  winners,
  mainWinner,
  tournamentTitle,
  withTournamentTabs,
  FirstPlacePrizeComponent,
  labelIconName,
  dateFormat,
  hasGroupStagePrizes,
  PrizePoolComponent,
  children,
  stageTitle,
  modifiers,
  prizeListRules,
  backgroundUrl,
  renderCustomBackground,
  regulationLink,
  subscriptionScopeId,
  modalTitle,
  ButtonsBlock,
  backgroundWinnerUrl,
  backgroundAlignX,
}) => (
  <>
    <div className={classNames(
      styles.block,
      styles[tournamentTitle],
      {
        [styles.hasMarginBottom]: !isTournamentInProgress,
        [styles.hasPaddingBottom]: isTournamentFinished,
      },
    )}
    >
      <ContentContainer>
        <div className={classNames(
          styles.wrap,
          styles[tournamentTitle],
        )}
        >
          <Header
            logoUrl={logoUrl}
            tournamentDates={tournamentDates}
            periodDescription={i18nTexts.events[tournamentTitle].heroSection.periodDescription}
            prizeDescription={i18nTexts.events[tournamentTitle].heroSection.prizeDescription}
            tournamentTitle={tournamentTitle}
            dateFormat={dateFormat}
            PrizePoolComponent={PrizePoolComponent}
          />

          <Body
            TOURNAMENT_ID={TOURNAMENT_ID}
            title={i18nTexts.events[tournamentTitle].heroSection.title}
            description={i18nTexts.events[tournamentTitle].heroSection.description}
            descriptionFinished={i18nTexts.events[tournamentTitle].heroSection.descriptionFinished}
            mainWinner={mainWinner}
            withTournamentTabs={withTournamentTabs}
            FirstPlacePrizeComponent={FirstPlacePrizeComponent}
            tournamentTitle={tournamentTitle}
            labelIconName={labelIconName}
            showWinnersList={showWinnersList}
            isWinnersListCollapsed={isWinnersListCollapsed}
            hasGroupStagePrizes={hasGroupStagePrizes}
            stageTitle={stageTitle}
            modifiers={modifiers}
            prizeListRules={prizeListRules}
            isTournamentScheduled={isTournamentScheduled}
            regulationLink={regulationLink}
            subscriptionScopeId={subscriptionScopeId}
            modalTitle={modalTitle}
            ButtonsBlock={ButtonsBlock}
            backgroundWinnerUrl={backgroundWinnerUrl}
          />
        </div>
      </ContentContainer>

      {renderCustomBackground ? (
        renderCustomBackground()
      ) : (
        <BackgroundFullWidth
          className={classNames(
            styles.backgroundUrl,
            {
              [styles.removeBackgroundUrl]: !isTournamentInProgress,
            },
          )}
          src={backgroundUrl}
          backgroundAlignX={backgroundAlignX}
        />
      )}
    </div>

    {children}

    {(isTournamentFinished && !isWinnersListCollapsed) && (
      <WinnersList
        tournamentTitle={tournamentTitle}
        winners={winners}
        hideWinnersListHandler={hideWinnersList}
        isCollapsed={isWinnersListCollapsed}
        labelIconName={labelIconName}
      />
    )}
  </>
)

HeroSection.propTypes = {
  // required props
  TOURNAMENT_ID: PropTypes.number.isRequired,
  winners: PropTypes.arrayOf(PropTypes.shape({})),
  tournamentTitle: PropTypes.string.isRequired,
  mainWinner: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]),

  // props from container
  i18nTexts: PropTypes.shape({}).isRequired,
  tournamentDates: tournamentDatePropTypes.isRequired,
  hideWinnersList: PropTypes.func.isRequired,
  showWinnersList: PropTypes.func.isRequired,
  isTournamentFinished: PropTypes.bool.isRequired,
  isWinnersListCollapsed: PropTypes.bool.isRequired,
  prizeListRules: PropTypes.arrayOf(PropTypes.string),
  isTournamentScheduled: PropTypes.bool.isRequired,

  // optional props
  logoUrl: imgPropType,
  withTournamentTabs: PropTypes.bool,
  FirstPlacePrizeComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({}),
    imgPropType,
  ]),
  labelIconName: PropTypes.string,
  hasGroupStagePrizes: PropTypes.bool,
  PrizePoolComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({}),
    imgPropType,
  ]),
  children: PropTypes.node,
  dateFormat: tournamentDatePropTypes,
  stageTitle: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  backgroundUrl: PropTypes.oneOfType([
    PropTypes.string,
    imgPropType,
  ]),
  renderCustomBackground: PropTypes.func,
  isTournamentInProgress: PropTypes.bool,
  backgroundAlignX: PropTypes.string,
  regulationLink: PropTypes.string,
  subscriptionScopeId: PropTypes.string,
  modalTitle: PropTypes.string,
  backgroundWinnerUrl: PropTypes.string,
  ButtonsBlock: PropTypes.node,
}

HeroSection.defaultProps = {
  mainWinner: {},
  winners: [],
  backgroundUrl: '',
  labelIconName: '',
  withTournamentTabs: false,
  FirstPlacePrizeComponent: DefaultFirstPlacePrize,
  hasGroupStagePrizes: false,
  logoUrl: '',
  PrizePoolComponent: DefaultTournamentPrizePool,
  children: null,
  dateFormat: {
    start: 'dateMonth',
    end: 'dateMonth',
  },
  stageTitle: '',
  modifiers: [],
  prizeListRules: [],
  renderCustomBackground: null,
  isTournamentInProgress: false,
  backgroundAlignX: '',
  regulationLink: '',
  subscriptionScopeId: '',
  modalTitle: '',
  backgroundWinnerUrl: '',
  ButtonsBlock: null,
}

export default container(HeroSection)
