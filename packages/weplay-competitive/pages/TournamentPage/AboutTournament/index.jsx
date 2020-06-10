import React from 'react'
import PropTypes from 'prop-types'
import Tab from 'weplay-components/Tab'
import InlineTabs from 'weplay-components/InlineTabs'
import Section from 'weplay-competitive/components/Section'
import Wrapper from 'weplay-competitive/components/Wrapper'
import TableRowTwoColumns from 'weplay-competitive/components/TableRowTwoColumns'
import container from 'weplay-competitive/pages/TournamentPage/AboutTournament/container'

const sectionModification = ['noContainerPaddingX']
const wrapperModification = ['content']

const AboutTournament = ({
  // required props
  tournamentDetails,
  // container props
  t,
  openRules,
  tabs,
  activeTab,
  handleTabClick,
  // optional props
}) => (
  <Wrapper>
    <Wrapper modifiers={wrapperModification}>
      <Section
        title={t('competitive.tournament.about.title')}
        linkText={t('competitive.tournament.about.link')}
        linkIcon="rules"
        modifiers={sectionModification}
        linkHandler={openRules}
        className="u-pb-0"
      >
        {tabs.length > 1 && (
          <InlineTabs>
            {tabs.map(tab => (
              <Tab
                key={tab}
                tab={tab}
                handleClick={handleTabClick(tab)}
                activeTab={tab === activeTab}
              />
            ))}
          </InlineTabs>
        )}
        {tournamentDetails.map(tournamentDetail => (
          <TableRowTwoColumns
            key={tournamentDetail.text}
            text={tournamentDetail.text}
            value={tournamentDetail.value}
            icon={tournamentDetail.icon}
          />
        ))}
      </Section>
    </Wrapper>
  </Wrapper>
)

AboutTournament.propTypes = {
  // required props
  tournamentDetails: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    icon: PropTypes.string,
  })).isRequired,
  // container props
  t: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleTabClick: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  openRules: PropTypes.func.isRequired,
  // optional props
}

AboutTournament.defaultProps = {
  // optional props
}

export default container(AboutTournament)
