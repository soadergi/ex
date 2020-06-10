import React from 'react'
import PropTypes from 'prop-types'

import GridTile from 'weplay-components/GridTile/GridTile'
import SectionHeader from 'weplay-components/SectionHeader'

import Article from '../Article'

import container from './container'

const BottomArticles = ({
  title,
  linkUrl,
  linkText,
  articles,

  // analytic
  contentAction,
  contentType,
  sectionHeaderModifiers,
}) => (
  <>
    <SectionHeader
      title={title}
      linkUrl={linkUrl}
      linkText={linkText}
      contentAction={contentAction}
      contentType={contentType}
      modifiers={sectionHeaderModifiers}
    />

    <GridTile>
      {articles.map(article => (
        <Article
          key={article.newsId}
          article={article}
        />
      ))}
    </GridTile>
  </>
)

BottomArticles.propTypes = {
  title: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // props from container
  contentAction: PropTypes.string.isRequired,
  contentType: PropTypes.string.isRequired,

  // optional props
  sectionHeaderModifiers: PropTypes.arrayOf(PropTypes.string),
}

BottomArticles.defaultProps = {
  sectionHeaderModifiers: [],
}

export default container(BottomArticles)
