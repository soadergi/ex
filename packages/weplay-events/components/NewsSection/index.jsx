import React from 'react'
import PropTypes from 'prop-types'
import NewsCard from 'weplay-components/NewsSection/NewsCard'

import styles from './styles.scss'

const modifiers = {
  large: ['newsLargeCard', 'events'],
}

const NewsSection = ({
  // required props
  sourcesList,

  // container props

  // optional props
}) => (
  <div className={styles.block}>
    {sourcesList.map(source => (
      <NewsCard
        key={source}
        newsId={source}
        modifiers={modifiers.large}
      />
    ))}
  </div>
)

NewsSection.propTypes = {
  // required props

  // container props
  sourcesList: PropTypes.arrayOf(PropTypes.number).isRequired,

  // optional props
}

NewsSection.defaultProps = {
  // optional props
}

export default NewsSection
