import React from 'react'

import B2BSection from 'components/B2BSection/B2BSection'

import Opportunity from '_pages/index/Opportunities/Opportunity/Opportunity'

import classes from '../styles.scss'

const ExplanationBlock = ({ whatIsBlock }) => (
  <B2BSection>
    <Opportunity
      className={classes.projectPage}
      opportunity={{
        innerTitle: whatIsBlock.title,
        innerText: whatIsBlock.description,
      }}
      image={whatIsBlock.logo.path}
    />
  </B2BSection>
)

export default React.memo(ExplanationBlock)
