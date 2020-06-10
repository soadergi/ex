import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import ListPool from 'weplay-competitive/components/ListPool'
import Wrapper from 'weplay-competitive/components/Wrapper'
import Section from 'weplay-competitive/components/Section'
import container from 'weplay-competitive/pages/TournamentPage/MapsOrHeroesPool/container'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const wrapperModification = ['content']
const sectionModification = ['noContainerPaddingX']

const MapsOrHeroesPool = ({
  // required props
  discipline,
  // container props
  poolIDs,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <Wrapper>
      <Wrapper modifiers={wrapperModification}>
        <Section
          title={t(`competitive.tournament.pool.${DISCIPLINES[discipline].pool}`)}
          modifiers={sectionModification}
        >
          <ListPool poolIds={poolIDs} />
        </Section>
      </Wrapper>
    </Wrapper>
  )
}

MapsOrHeroesPool.propTypes = {
  // required props
  discipline: PropTypes.string.isRequired,
  // container props
  poolIDs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
  // optional props
}

MapsOrHeroesPool.defaultProps = {
  // optional props
  poolIDs: [],
}

export default container(MapsOrHeroesPool)
