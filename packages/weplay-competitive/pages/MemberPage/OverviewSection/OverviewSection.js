import React from 'react'
import PropTypes from 'prop-types'

import MemberGameCard from 'weplay-competitive/pages/MemberPage/MemberGameCard'
import PerformanceCard from 'weplay-competitive/pages/MemberPage/PerformanceCard'
import Section from 'weplay-competitive/components/Section'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

import styles from './OverviewSection.scss'

const sectionModification = ['small']

const OverviewSection = ({
  isOwner,
}) => {
  const { tournamentDiscipline } = useDiscipline()
  return (
    <Section
      id="overviewSection"
      modifiers={sectionModification}
      title={tournamentDiscipline.name}
      icon={tournamentDiscipline.url}
      iconType="color"
      className={styles.stats}
    >
      <MemberGameCard
        isOwner={isOwner}
      />
      <PerformanceCard />
    </Section>
  )
}

OverviewSection.propTypes = {
  isOwner: PropTypes.bool.isRequired,
}

export default OverviewSection
