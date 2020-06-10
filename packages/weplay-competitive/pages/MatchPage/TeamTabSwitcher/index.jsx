import PropTypes from 'prop-types'
import React from 'react'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import styles from 'weplay-competitive/pages/MatchPage/styles.scss'
import { MATCH_MEMBER_PARTICIPATION_TYPES } from 'weplay-competitive/constants/matchMemberParticipationTypes'
import container from 'weplay-competitive/pages/MatchPage/TeamTabSwitcher/container'

const TeamTabSwitcher = ({
  // required props
  activeTab,
  handleTabClick,
  tabs,
  // container props
  homeTeamName,
  awayTeamName,

  // optional props
}) => (
  <InlineTabs
    className={styles.tabsList}
  >
    {tabs.map(tab => (
      <Tab
        key={tab}
        tab={
          tab === MATCH_MEMBER_PARTICIPATION_TYPES.HOME
            ? homeTeamName
            : awayTeamName
        }
        handleClick={handleTabClick(tab)}
        activeTab={tab === activeTab}
      />
    ))}
  </InlineTabs>
)

TeamTabSwitcher.propTypes = {
  // required props
  handleTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ]).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({}),
  ])).isRequired,

  // container props
  homeTeamName: PropTypes.string.isRequired,
  awayTeamName: PropTypes.string.isRequired,

  // optional props
}

TeamTabSwitcher.defaultProps = {
  // optional props
}

export default container(TeamTabSwitcher)
