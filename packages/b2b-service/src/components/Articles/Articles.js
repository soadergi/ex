import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import getArticleImage from 'weplay-core/helpers/getArticleImage'
import transliterate from 'weplay-core/helpers/translit'

import { NewsCardMarkup } from 'weplay-components/NewsSection/NewsCard'
import Headline from 'weplay-components/HeadLine'

import classes from './Articles.scss'

const Articles = ({
  newspapers,
  button,
  title,
  hasNewspaperInfoText,
}) => {
  const t = useTranslation()
  return (
    <div className={classes.block}>
      <Headline
        className="u-text-center"
        title={title ?? t('futureProjects.component.title')}
      />

      <div className={classes.wrap}>
        {newspapers.map(newspaper => (
          <NewsCardMarkup
            key={newspaper.newsId}
            modifiers={['newsCardBtb', 'newsCardImg', 'noOverlay']}
            image={getArticleImage(newspaper, 'big')}
            title={newspaper.title}
            newspaper={newspaper}
            url={`/blog/article/${transliterate(newspaper.title)}-${newspaper.articleId}`}
            hasNewspaperInfoText={hasNewspaperInfoText}
            hasCommentsAndBookmark={false}
            hasTags={false}
          />
        ))}
      </div>
      {button}
    </div>
  )
}

export default React.memo(Articles)
