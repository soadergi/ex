// TODO: kill the author and rewrite
import isEmpty from 'lodash/isEmpty'

import transliterate from 'weplay-core/helpers/translit'

export const transformUrl = (item, lang, articleTitles) => {
  if (!item) {
    return item
  }
  let name
  if (!isEmpty(articleTitles)) {
    name = articleTitles[lang]
  } else {
    name = item.name || item.title || item.sourceTitle || item.sourceId
  }
  const id = item.sourceId || item.article_id || item.articleId || item.id
    || item.specialTagId || item.tagId || (item.article && item.article.article_id)
  return name && `${transliterate(name)}-${id}`
}
