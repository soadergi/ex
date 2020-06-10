import React from 'react'
import PropTypes from 'prop-types'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import GroupTable from 'weplay-events/components/TournamentBrackets/Groups/GroupTable'
import SectionHeader from 'weplay-components/SectionHeader'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'
import container from './container'
import DotaUnderlordsGroupTableHead from './DotaUnderlordsGroupTableHead'
import DotaUnderlordsGroupTableRow from './DotaUnderlordsGroupTableRow'
import DotaUnderlordsGroupTableFooter from './DotaUnderlordsGroupTableFooter'

const DotaUnderlordsGroups = ({
  // required props
  i18nTexts,

  // container props
  tabs,
  activeTab,
  handleTabClick,
  activeGroup,
  tournamentTitle,
  rulesUrls,
  isFinalGroupTabActive,

  // optional props
}) => (
  <div>
    <SectionHeader
      title={i18nTexts.tournamentStages[tournamentTitle].tournamentBracket.title}
      linkText={i18nTexts.tournamentStages[tournamentTitle].tournamentBracket.link}
      linkUrl={rulesUrls}
    />

    <InlineTabs
      isCentered
      hasSeparator
    >
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          tab={tab.title}
          handleClick={handleTabClick(tab)}
          activeTab={tab.id === activeTab.id}
        />
      ))}
    </InlineTabs>

    <GroupTable
      stageTitle={tournamentTitle}
      group={activeGroup}
      renderTableHead={() => <DotaUnderlordsGroupTableHead />}
      CustomGroupTableRow={DotaUnderlordsGroupTableRow}
      footer={<DotaUnderlordsGroupTableFooter />}
      i18nTexts={i18nTexts}
      isFinalGroupTabActive={isFinalGroupTabActive}
    />

    {!isFinalGroupTabActive && (
      <p className={styles.note}>
        <Icon
          iconName="weplay"
          size="small"
          className={styles.noteIcon}
        />
        {' — '}
        {i18nTexts[tournamentTitle].standingsDescription}
      </p>
    )}
  </div>

)

DotaUnderlordsGroups.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
  handleTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  rulesUrls: PropTypes.string.isRequired,

  // container props
  activeGroup: PropTypes.shape({}).isRequired,
  isFinalGroupTabActive: PropTypes.bool,

  // optional props
  tournamentTitle: PropTypes.string,
}

DotaUnderlordsGroups.defaultProps = {
  // optional props
  tournamentTitle: '',
  isFinalGroupTabActive: false,
}

export default container(DotaUnderlordsGroups)
