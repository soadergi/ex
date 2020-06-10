import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Tab from 'weplay-components/Tab'
import InlineTabs from 'weplay-components/InlineTabs'
import csGoPropType from 'weplay-competitive/customPropTypes/statistic/csGoPropType'
import WrapperOverflowX from 'weplay-competitive/components/WrapperOverflowX'
import Wrapper from 'weplay-competitive/components/Wrapper'
import ScoreBoxTeam from 'weplay-competitive/pages/MatchPage/ScoreBox/ScoreBoxTeam'
import ScoreBoxHeader from 'weplay-competitive/pages/MatchPage/ScoreBox/ScoreBoxHeader'
import dotaPropType from 'weplay-competitive/customPropTypes/statistic/dotaPropType'

import container from './container'

const ScoreBoxWrapper = ({
  // required props
  mapsStats,
  // props from container
  tabs,
  handleTabClick,
  activeTab,
  scoreBoxHeadCells,
  scoreBoxCells,
  // optional props
}) => (
  <Fragment>
    <Wrapper>
      <InlineTabs className="u-mb-6">
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            tab={tab.title}
            handleClick={handleTabClick(tab)}
            activeTab={tab.id === activeTab.id}
          />
        ))}
      </InlineTabs>
    </Wrapper>
    <WrapperOverflowX>
      <ScoreBoxHeader scoreBoxHeadCells={scoreBoxHeadCells} />
      {mapsStats[activeTab.id].teams.map((team, index) => (
        team ? (
          <ScoreBoxTeam
            team={team}
            sideIndex={index}
            key={index} // eslint-disable-line react/no-array-index-key
            teams={mapsStats[activeTab.id].teams}
            scoreBoxCells={scoreBoxCells}
            scoreBoxHeadCells={scoreBoxHeadCells}
          />
        ) : null
      ))}
    </WrapperOverflowX>
  </Fragment>
)

ScoreBoxWrapper.propTypes = {
  mapsStats: PropTypes.oneOfType([
    csGoPropType,
    dotaPropType,
  ]).isRequired,
  handleTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ])).isRequired,
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
}

ScoreBoxWrapper.defaultProps = {
  // optional props
}

export default container(ScoreBoxWrapper)
