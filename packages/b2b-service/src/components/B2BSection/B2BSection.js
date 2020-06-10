import React from 'react'

import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import HeadLine from 'weplay-components/HeadLine'

const B2BSection = ({
  children,
  sectionClassName,
  title,
  titleSize,
}) => (
  <Section
    paddingY={PADDING_Y.SM}
    className={sectionClassName}
  >
    <ContentContainer>
      {title && (
        <HeadLine
          className="u-text-center u-mb-6"
          title={title}
          size={titleSize}
        />
      )}
      {children}
    </ContentContainer>
  </Section>
)

export default React.memo(B2BSection)
