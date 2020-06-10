import React from 'react'
import PropTypes from 'prop-types'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import Breadcrumbs from 'weplay-components/Breadcrumbs'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import ListingTitle from 'weplay-media/components/ListingTitle'
import SpecialTagsList from 'weplay-media/components/SpecialTagsList'

import container from './container'

const SpecialTagsPage = ({
  goToRoot,
  i18nTexts,
  entityName,
}) => (
  <>
    <div
      className="u-py-2 u-py-md-4"
      data-qa-id={dataQaIds.pages[NAMES.SPECIAL_TAGS].container}
    >
      <ContentContainer>
        <Breadcrumbs
          entityName={entityName}
        />
        <ListingTitle
          handleClick={goToRoot}
          title={i18nTexts.specialTags.seo.default.h1}
        />
      </ContentContainer>
      <ContentContainer>
        <SpecialTagsList />
      </ContentContainer>
    </div>
  </>
)

SpecialTagsPage.propTypes = {
  goToRoot: PropTypes.func.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  entityName: PropTypes.string.isRequired,
}

SpecialTagsPage.defaultProps = {
}

export default container(SpecialTagsPage)
