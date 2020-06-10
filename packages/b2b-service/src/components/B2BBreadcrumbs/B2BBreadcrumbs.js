import React from 'react'

import Breadcrumbs from 'weplay-components/Breadcrumbs'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

const B2BBreadcrumbs = ({
  allBreadcrumbs,
}) => (
  <div className="u-mt-3">
    <ContentContainer>
      <Breadcrumbs allBreadcrumbs={allBreadcrumbs} />
    </ContentContainer>
  </div>
)

export default React.memo(B2BBreadcrumbs)
