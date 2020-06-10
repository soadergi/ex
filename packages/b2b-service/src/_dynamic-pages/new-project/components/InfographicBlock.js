import React from 'react'

import Infographics from '_dynamic-pages/project/components/Infographics/Infographics'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import B2BSection from 'components/B2BSection/B2BSection'

const InfographicBlock = ({
  targetAudienceBlock,
  tournamentName,
}) => {
  const t = useTranslation()

  const title = `${t('projectPage.infographics.title')} ${tournamentName}`
  const images = targetAudienceBlock.images.map(image => image.path)
  // TODO @Rohovoi move Infographics component here and delete at the final step (before release updated projects)
  return (
    <B2BSection>
      <Infographics
        title={title}
        images={images}
      />
    </B2BSection>
  )
}

export default InfographicBlock
