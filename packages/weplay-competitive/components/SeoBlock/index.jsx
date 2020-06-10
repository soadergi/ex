import React from 'react'
import PropTypes from 'prop-types'
import SeoText from 'weplay-competitive/components/SeoText'

import container from './container'
import SeoAll from './SeoAll'
import Seo1v1 from './Seo1v1'
import Seo2v2 from './Seo2v2'
import Seo5v5 from './Seo5v5'

const SeoBlock = ({
  // required props
  // container props
  isAll,
  is1v1,
  is2v2,
  is5v5,
  discipline,
  // optional props
}) => (
  <SeoText>
    {isAll && (
    <SeoAll
      localizationText={`competitive.seo.tournamentsPage.${discipline}.all`}
      discipline={discipline}
    />
    )}
    {is1v1 && (
    <Seo1v1
      localizationText={`competitive.seo.tournamentsPage.${discipline}.1v1`}
      discipline={discipline}
    />
    )}
    {is2v2 && (
    <Seo2v2
      localizationText={`competitive.seo.tournamentsPage.${discipline}.2v2`}
      discipline={discipline}
    />
    )}
    {is5v5 && (
    <Seo5v5
      localizationText={`competitive.seo.tournamentsPage.${discipline}.5v5`}
      discipline={discipline}
    />
    )}
  </SeoText>
)

SeoBlock.propTypes = {
  // required props
  // container props
  isAll: PropTypes.bool.isRequired,
  is1v1: PropTypes.bool.isRequired,
  is2v2: PropTypes.bool.isRequired,
  is5v5: PropTypes.bool.isRequired,
  discipline: PropTypes.string.isRequired,
  // optional props
}

SeoBlock.defaultProps = {
  // optional props
}

export default container(SeoBlock)
