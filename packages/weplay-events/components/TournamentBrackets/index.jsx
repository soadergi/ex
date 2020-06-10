import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Tabs from 'weplay-components/Tabs'
import SectionHeader from 'weplay-components/SectionHeader'
import SectionBody from 'weplay-components/SectionBody'

import tableTabsPropTypes from 'weplay-events/customPropTypes/tableTabs'
import BetProviderLogo from 'weplay-events/components/BetProviderLogo'

import styles from './shedule.scss'
import container from './container'
import Scoreboard from './Scoreboard'
import Groups from './Groups'
import ScheduleTab from './ScheduleTab'
import DefaultScoreGroup from './Scoreboard/DefaultScoreGroup'

const sectionModifier = ['lightGreyBg']
const TournamentBrackets = ({
  // required props
  tableTabs,
  setActiveTab,
  activeTab,
  rulesUrls,

  // container props
  i18nTexts,
  groups,

  // optional props
  isRoundRobinTournament,
  renderTableHead,
  CustomGroupTableRow,
  ScoreGroup,

  // analytic
  contentType,
  contentAction,
  tournamentTitle,
  children,
}) => (
  <SectionBody
    modifiers={sectionModifier}
    linkUrl={rulesUrls}
    linkText={i18nTexts.tournamentStages[tournamentTitle].tournamentBracket.link}
  >
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SectionHeader
          title={i18nTexts.tournamentStages[tournamentTitle].tournamentBracket.title}
          linkUrl={rulesUrls}
          linkText={i18nTexts.tournamentStages[tournamentTitle].tournamentBracket.link}
          contentType={contentType}
          contentAction={contentAction}
        >
          <BetProviderLogo />
        </SectionHeader>

        <div className={classNames(
          styles.tabs,
          styles[tournamentTitle],
        )}
        >
          <Tabs
            tabs={tableTabs}
            activeTab={activeTab}
            TabComponent={ScheduleTab}
            onChange={setActiveTab}
          />
        </div>

        {activeTab.id === 'scoreboard' && (
          <Scoreboard
            groups={groups}
            isRoundRobinTournament={isRoundRobinTournament}
            ScoreGroup={ScoreGroup}
          />
        )}

        {activeTab.id === 'groups' && (
          <Groups
            groups={groups}
            stageTitle={tournamentTitle}
            isRoundRobinTournament={isRoundRobinTournament}
            renderTableHead={renderTableHead}
            CustomGroupTableRow={CustomGroupTableRow}
          />
        )}

        {activeTab.id === 'playOff' && (
          children
        )}
      </div>
    </div>
  </SectionBody>
)

TournamentBrackets.propTypes = {
  tableTabs: PropTypes.arrayOf(tableTabsPropTypes.isRequired).isRequired,
  setActiveTab: PropTypes.func.isRequired,
  activeTab: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  rulesUrls: PropTypes.string.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  playersCoefficients: PropTypes.shape({
    a: PropTypes.number,
    b: PropTypes.number,
    gameUrl: PropTypes.string,
  }),
  contentType: PropTypes.string.isRequired,
  contentAction: PropTypes.string.isRequired,
  children: PropTypes.node,

  // container props
  groups: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // optional props
  tournamentTitle: PropTypes.string,
  isRoundRobinTournament: PropTypes.bool,
  renderTableHead: PropTypes.func,
  CustomGroupTableRow: PropTypes.func,
  ScoreGroup: PropTypes.shape({}),
}

TournamentBrackets.defaultProps = {
  playersCoefficients: null,
  tournamentTitle: '',
  children: null,
  isRoundRobinTournament: false,
  renderTableHead: null,
  CustomGroupTableRow: null,
  ScoreGroup: DefaultScoreGroup,
}

export default container(TournamentBrackets)
