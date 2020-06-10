import React from 'react'
import PropTypes from 'prop-types'
import PageHelmet from 'weplay-components/PageHelmet'
import disciplinePropType from 'weplay-competitive/customPropTypes/disciplinePropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import container from './container'
import { tabs } from './settings'
import DisciplinesBlock from './DisciplinesBlock'
import HeroSection from './HeroSection'
import BottomHeroSection from './BottomHeroSection'
import AdvantagesBlock from './AdvantagesBlock'
import AccordionSection from './AccordionSection'

const TournamentBetaPage = ({
  // required props

  // container props
  disciplines,
  ogImage,
  handleDisciplineClick,
  // optional props
}) => (
  <>
    <PageHelmet
      ogImage={ogImage}
    />
    <HeroSection>
      <BottomHeroSection handleDisciplineClick={handleDisciplineClick} />
    </HeroSection>

    <AdvantagesBlock />

    <AccordionSection tabs={tabs} />

    <DisciplinesBlock
      disciplines={disciplines}
      handleDisciplineClick={handleDisciplineClick}
    />
    <div data-qa-id={dataQaIds.pages[NAMES.LANDING].container} />
  </>
)

TournamentBetaPage.propTypes = {
  // required props

  // container props
  ogImage: PropTypes.string.isRequired,
  disciplines: PropTypes.arrayOf(disciplinePropType).isRequired,
  handleDisciplineClick: PropTypes.func.isRequired,
  // optional props
}

TournamentBetaPage.defaultProps = {
  // optional props
}

export default container(TournamentBetaPage)
