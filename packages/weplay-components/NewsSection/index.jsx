import React from 'react'
import PropTypes from 'prop-types'

import { getNewsCardModifiers } from './helpers'
import NewsCard from './NewsCard'
import SpecialTagCard from './SpecialTagCard'
import container from './container'
import styles from './styles.scss'

const modifiers = {
  common: ['newsCard', 'newsCardImg'],
  large: ['newsLargeCard'],
  columnist: ['columnistCard'],
  special: ['specialTag'],
}

const NewsSection = ({
  // required props
  // container props
  sourcesList,
}) => (
  <div className={styles.block}>
    {sourcesList.map((source, index) => (source.resourceType === 'special_tag' ? (
      <SpecialTagCard
        modifiers={modifiers[getNewsCardModifiers(index)]}
        specialTagId={source.resourceId}
        key={source.resourceId}
      />
    ) : (
      <NewsCard
        modifiers={modifiers[getNewsCardModifiers(index)]}
        newsId={source.resourceId}
        key={source.resourceId}
      />
    )
    ))}
  </div>
)

NewsSection.propTypes = {
  // required props
  // container props
  sourcesList: PropTypes.arrayOf(PropTypes.shape({
    resourceType: PropTypes.string,
    resourceId: PropTypes.number,
  })).isRequired,
  // optional props
}

NewsSection.defaultProps = {
  // optional props
}

export default container(NewsSection)
