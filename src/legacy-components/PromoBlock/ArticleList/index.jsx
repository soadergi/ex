import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'
import ArticleItem from 'legacy-components/PromoBlock/ArticleList/ArticleItem'
import styles from 'legacy-components/PromoBlock/ArticleList/styles.scss'
import container from 'legacy-components/PromoBlock/ArticleList/container'

const ArticleList = ({
  i18nTexts,
  articlesLink,
  newsPapers,
}) => (
  <div className={styles.wrapper}>
    <ul className={styles.list}>
      {newsPapers.map(newsPaper => (
        <ArticleItem
          newsPaper={newsPaper}
          key={newsPaper.id}
        />
      ))}
    </ul>

    <Link
      to={articlesLink}
      className={styles.link}
    >
      {i18nTexts.promoBlock.newsLink}
    </Link>
  </div>
)

ArticleList.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  articlesLink: PropTypes.string.isRequired,
  newsPapers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}
export default container(ArticleList)
