import React from 'react'
import PropTypes from 'prop-types'

import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import authorPropType from 'weplay-core/customPropTypes/authorPropType'

import Link from 'weplay-components/Link'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import AuthorInline from 'weplay-components/AuthorInline'

import columnistPropType from 'weplay-media/customPropTypes/columnistPropType'

import styles from 'legacy-components/PromoBlock/ArticleList/ArticleItem/styles.scss'
import container from 'legacy-components/PromoBlock/ArticleList/ArticleItem/container'

const ArticleItem = ({
  newspaper,
  newsPaperWriter,
  newsLink,
}) => (
  <li className={styles.item}>
    <Link
      to={newsLink}
      className={styles.title}
    >
      {newspaper.title}
    </Link>
    <div className={styles.meta}>
      <ul className={styles.metaList}>
        <li className={styles.metaItem}>
          <LocalizedMoment
            dateTime={newspaper.publishedDate}
            formatKey="short"
          />
        </li>

        <li className={styles.metaItem}>
          {newsPaperWriter && (
            <AuthorInline
              newspaperWriter={newsPaperWriter}
              modification={['isInline']}
            />
          )}
        </li>
      </ul>
    </div>
  </li>
)

ArticleItem.propTypes = {
  newsLink: PropTypes.string.isRequired,
  newspaper: newspaperPropType.isRequired,
  newsPaperWriter: PropTypes.oneOfType([columnistPropType, authorPropType]).isRequired,
}

export default container(ArticleItem)
