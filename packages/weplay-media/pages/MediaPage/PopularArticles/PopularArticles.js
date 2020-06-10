import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { createNewsByIdSelector } from 'weplay-core/reduxs/news/reducer'

import GridTile from 'weplay-components/GridTile/GridTile'
import Article from 'weplay-components/Article'
import Section, { BACKGROUNDS, PADDING_Y } from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import GradientLink from 'weplay-components/GradientLink'

import styles from './PopularArticles.scss'

const PopularArticles = (props) => {
  const t = useTranslation()
  const popularNews = useSelector(createNewsByIdSelector(() => props.popularIds))
  return (
    <Section
      backgrounds={BACKGROUNDS.GRAY}
      paddingY={PADDING_Y.SM}
    >
      <ContentContainer>
        <h2 className={styles.header}>
          <GradientLink
            to="/"
            text={t('title.popular')}
            className={styles.title}
          />
        </h2>
        <GridTile>
          {popularNews.map(article => (
            <Article
              key={article.newsId}
              article={article}
            />
          ))}
        </GridTile>
      </ContentContainer>
    </Section>
  )
}

PopularArticles.propTypes = {
  popularIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default React.memo(PopularArticles)
