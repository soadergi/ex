import React from 'react'

import SocialReviews from '_dynamic-pages/project/components/SocialReviews/SocialReviews'

import B2BSection from 'components/B2BSection/B2BSection'

import { getOldStyleSocialReviews } from '../helpers'

const SocialBlock = ({ voiceOfCommunityBlock }) => {
  const socialReviews = getOldStyleSocialReviews(voiceOfCommunityBlock.voices)
  // TODO @Rohovoi move SocialReviews component here and delete at the final step (before release updated projects)
  return (
    <B2BSection>
      <SocialReviews socialReviews={socialReviews} />
    </B2BSection>
  )
}

export default SocialBlock
