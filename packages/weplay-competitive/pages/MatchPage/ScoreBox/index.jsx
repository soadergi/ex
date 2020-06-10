import React from 'react'
import PropTypes from 'prop-types'
import Section from 'weplay-competitive/components/Section'
import csGoPropType from 'weplay-competitive/customPropTypes/statistic/csGoPropType'
import container from 'weplay-competitive/pages/MatchPage/ScoreBox/container'
import ScoreBoxWrapper from 'weplay-competitive/pages/MatchPage/ScoreBox/ScoreBoxWrapper'
import dotaPropType from 'weplay-competitive/customPropTypes/statistic/dotaPropType'

const ScoreBox = ({
  // required props
  mapsStats,
  discipline,
  // props from container

  // optional props
}) => (
  <Section
    title="Scorebox"
    id="ScoreBoxSection"
    icon="score"
    containerClassName="u-px-0"
  >
    <ScoreBoxWrapper
      mapsStats={mapsStats}
      discipline={discipline}
    />
  </Section>
)

ScoreBox.propTypes = {
  mapsStats: PropTypes.oneOfType([
    csGoPropType,
    dotaPropType,
  ]).isRequired,
  discipline: PropTypes.string.isRequired,
}

ScoreBox.defaultProps = {
  // optional props
}

export default container(ScoreBox)
