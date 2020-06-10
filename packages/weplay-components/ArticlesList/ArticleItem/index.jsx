import React from 'react'
import PropTypes from 'prop-types'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import classNames from 'classnames'
import Link from 'weplay-components/Link'
import { transformUrl } from 'weplay-core/helpers/transformUrl'

import AuthorInline from '../../AuthorInline'

import container from './container'
import styles from './styles.scss'

const modification = ['isInline']
const ArticleItem = ({
  article,
  className,
  onClick,
  title,
}) => {
  const newsPaperWriter = article.author ? article.author : article.columnist

  return (
    <div className={classNames(
      styles.item,
      className,
    )}
    >
      <Link
        className={styles.itemTitle}
        to={`/news/${transformUrl(article)}`}
        onClick={onClick}
      >
        {title}
      </Link>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <time
            dateTime={article.publishedDate}
          >
            <LocalizedMoment
              fromNow
              dateTime={article.publishedDate}
            />
          </time>
        </span>

        {newsPaperWriter && (
          <span className={styles.metaItem}>
            <AuthorInline
              newspaperWriter={newsPaperWriter}
              modification={modification}
            />
          </span>
        )}
      </div>
    </div>
  )
}


ArticleItem.propTypes = {
  article: PropTypes.shape({
    author: PropTypes.shape({}),
    columnist: PropTypes.shape({}),
    publishedDate: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

ArticleItem.defaultProps = {
  className: '',
}

export default container(ArticleItem)
