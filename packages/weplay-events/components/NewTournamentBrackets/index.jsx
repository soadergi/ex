import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import routeInfoPropType from 'weplay-core/customPropTypes/routeInfoPropType'

import SectionHeader from 'weplay-components/SectionHeader'
import SectionBody from 'weplay-components/SectionBody'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Tabs from 'weplay-components/Tabs'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'

import BetProviderLogo from 'weplay-events/components/BetProviderLogo'
import tableTabsPropTypes from 'weplay-events/customPropTypes/tableTabs'
import ScheduleTab from 'weplay-events/components/TournamentBrackets/ScheduleTab'
import DefaultScoreGroup from 'weplay-events/components/TournamentBrackets/Scoreboard/DefaultScoreGroup'

import MainContent from './MainContent'
import container from './container'
import styles from './styles.scss'

const sectionModifier = ['lightGreyBg']

const NewTournamentBrackets = ({
  // required props
  isTournamentFinished,
  linkUrl,
  groupWinnersNumber,

  // container props
  routeInfo,
  tableTabs,
  setActiveTab,
  activeTab,
  activeSubTab,
  setActiveSubTab,
  scoreboardGroups,
  groups,
  isRoundRobinTournament,
  playoffRounds,
  CustomGroupTableRow,
  stage3playOff,
  winnerIconName,

  // optional props
  renderTableHead,
  ScoreGroup,
  hasBracketNote,
}) => {
  const t = useTranslation()

  return (
    <SectionBody
      modifiers={sectionModifier}
      linkUrl={linkUrl}
      linkText={t(`tournamentStages.${routeInfo.title}.tournamentBracket.link`)}
    >
      <ContentContainer>
        <SectionHeader
          title={t(`tournamentStages.${routeInfo.title}.tournamentBracket.title`)}
          linkUrl={linkUrl}
          linkText={t(`tournamentStages.${routeInfo.title}.tournamentBracket.link`)}
        >
          <BetProviderLogo />
        </SectionHeader>

        <div className={styles.tabs}>
          <Tabs
            tabs={tableTabs}
            activeTab={activeTab}
            TabComponent={ScheduleTab}
            onChange={setActiveTab}
          />
        </div>

        {activeTab.subTabs && (
          <InlineTabs
            isCentered
            hasSeparator
          >
            {activeTab.subTabs.map(tab => (
              <Tab
                key={tab.id}
                tab={tab.title}
                handleClick={() => setActiveSubTab(tab)}
                activeTab={tab.id === activeSubTab.id}
              />
            ))}
          </InlineTabs>
        )}

        <MainContent
          isTournamentFinished={isTournamentFinished}
          scoreboardGroups={scoreboardGroups}
          groups={groups}
          playoffRounds={playoffRounds}
          isRoundRobinTournament={isRoundRobinTournament}
          CustomGroupTableRow={CustomGroupTableRow}
          renderTableHead={renderTableHead}
          winnerIconName={winnerIconName}
          tournamentTitle={routeInfo.title}
          stage3playOff={stage3playOff}
          hasTicketIcon
          groupWinnersNumber={groupWinnersNumber}
          ScoreGroup={ScoreGroup}
          hasBracketNote={hasBracketNote}
        />
      </ContentContainer>
    </SectionBody>
  )
}

NewTournamentBrackets.propTypes = {
  // required props
  routeInfo: routeInfoPropType.isRequired,
  tableTabs: PropTypes.arrayOf(tableTabsPropTypes).isRequired,
  activeTab: tableTabsPropTypes.isRequired,
  activeSubTab: tableTabsPropTypes,
  setActiveTab: PropTypes.func.isRequired,
  setActiveSubTab: PropTypes.func,
  isTournamentFinished: PropTypes.bool.isRequired,
  groupWinnersNumber: PropTypes.number.isRequired,

  // container props
  stage3playOff: PropTypes.bool,

  // optional props
  isRoundRobinTournament: PropTypes.bool,
  CustomGroupTableRow: PropTypes.func,
  scoreboardGroups: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ),
  groups: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ),
  playoffRounds: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    games: PropTypes.arrayOf(PropTypes.shape({})),
  })),
  ScoreGroup: PropTypes.shape({}),
  linkUrl: PropTypes.string,
  renderTableHead: PropTypes.func,
  winnerIconName: PropTypes.string,
  hasBracketNote: PropTypes.bool,
}

NewTournamentBrackets.defaultProps = {
  // optional props
  isRoundRobinTournament: false,
  CustomGroupTableRow: null,
  scoreboardGroups: [],
  groups: [],
  playoffRounds: [],
  ScoreGroup: DefaultScoreGroup,
  linkUrl: '',
  renderTableHead: PropTypes.null,
  winnerIconName: '',
  hasBracketNote: false,
  stage3playOff: false,
  setActiveSubTab: null,
  activeSubTab: null,
}

export default container(NewTournamentBrackets)
