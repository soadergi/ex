import React from 'react'
import PropTypes from 'prop-types'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import HrefLangLink from 'weplay-components/HrefLangLink'
import PageHelmet from 'weplay-components/PageHelmet'
import Breadcrumbs from 'weplay-components/Breadcrumbs'

import TagCategory from 'weplay-media/pages/TagsPage/TagCategory'

import container from './container'
import styles from './styles.scss'

const TagsPage = ({
  breadcrumbsEntityName,
  i18nTexts,
  categories,
  tagsByCategory,
}) => (
  <>
    <PageHelmet lokaliseProject="mediaCore" />
    <HrefLangLink pathname="/tags" />

    <div className="u-py-2 u-py-md-4">
      <ContentContainer>
        <Breadcrumbs entityName={breadcrumbsEntityName} />

        <h1
          className={styles.title}
          data-qa-id={dataQaIds.pages[NAMES.TAGS].container}
        >
          {i18nTexts.mediaCore.tags.title}
        </h1>

        <div className={styles.content}>
          {categories.map(category => (
            <TagCategory
              key={category}
              title={category}
              tags={tagsByCategory[category]}
            />
          ))}
        </div>
      </ContentContainer>
    </div>
  </>
)

TagsPage.propTypes = {
  breadcrumbsEntityName: PropTypes.string.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  tagsByCategory: PropTypes.shape({}).isRequired,
}

TagsPage.defaultProps = {
}

export default container(TagsPage)
