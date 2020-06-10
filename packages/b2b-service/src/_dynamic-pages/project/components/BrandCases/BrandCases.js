import React from 'react'
import classNames from 'classnames'

import getArticleImage from 'weplay-core/helpers/getArticleImage'
import transliterate from 'weplay-core/helpers/translit'

import Image from 'weplay-components/Image'
import Link from 'weplay-components/Link'

import classes from './BrandCases.scss'

const BrandCases = ({
  brandIntegrationNews,
}) => (
  <div className={classes.block}>
    <div className={classes.wrapContent}>
      {brandIntegrationNews.map(brandIntegrationNew => (
        <Link
          className={classes.imageWrap}
          to={`/blog/article/${transliterate(brandIntegrationNew.title)}-${brandIntegrationNew.articleId}`}
          key={brandIntegrationNew.title}
        >
          <Image
            className={classNames(
              classes.image,
              'o-img-responsive',
            )}
            src={getArticleImage(brandIntegrationNew, 'big').url}
          />
          <div className={classes.infoWrap}>
            <h6 className={classes.title}>{brandIntegrationNew.title}</h6>
            <p className={classes.text}>{brandIntegrationNew.description}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
)

export default React.memo(BrandCases)
