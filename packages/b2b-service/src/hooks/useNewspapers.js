import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import useAction from 'weplay-core/helpers/useAction'
import { createNewspapersByTagIdSelector } from 'weplay-core/reduxs/news/reducer'
import { readNews } from 'weplay-core/reduxs/news/actions'

const b2bOtherNewsTagId = 1440
const requestConfig = {
  limit: 4,
  showHiddenFromListing: 1,
  sort: '-published',
}

export const useNewspapers = ({
  tagId,
  params,
}) => {
  const { locale } = useLocale()
  const { readNewsRequest } = useAction({ readNewsRequest: readNews.request })
  const newspapers = useSelector(createNewspapersByTagIdSelector(tagId || b2bOtherNewsTagId, locale))

  useEffect(() => {
    readNewsRequest({
      language: locale,
      tag: tagId || b2bOtherNewsTagId,
      ...requestConfig,
      ...params,
    })
  }, [tagId, locale, readNewsRequest, params])

  return newspapers
}
