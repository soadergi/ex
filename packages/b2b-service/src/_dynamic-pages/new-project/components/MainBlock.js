import React from 'react'

import ProjectStats from '_dynamic-pages/project/components/ProjectStats/ProjectStats'

import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'

import classes from '../styles.scss'
import { getStats } from '../helpers'

// TODO @Rohovoi ask about isLightTheme, may be we can create flag for it in BO
const MainBlock = ({
  projectLocalization,
  tournamentData,
  // optional
  isFutureProject,
}) => {
  const {
    coverImage,
    interestingInfoBlock,
  } = projectLocalization

  const {
    prizePool,
    labels,
    startDate,
    endDate,
    fullName,
  } = tournamentData

  const stats = getStats({
    prizePool,
    stats: interestingInfoBlock.points,
  })

  return (
    // TODO: HTML please look may be no needed anymore this wrapper (heroWrap)
    <div className={classes.heroWrap}>
      <HeroSectionBtb
        labels={isFutureProject && labels}
        startDate={isFutureProject && startDate}
        endDate={isFutureProject && endDate}
        title={fullName}
        image={coverImage.path}
        isLightTheme
      />

      <ProjectStats stats={stats} />
    </div>
  )
}
export default MainBlock
