import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { $prop } from 'weplay-core/$utils/$prop'
import useAction from 'weplay-core/helpers/useAction'
import { readNews } from 'weplay-core/reduxs/news/actions'
import { createNewsByIdSelector } from 'weplay-core/reduxs/news/reducer'

import NewspaperCard from 'weplay-components/NewspaperCard'

import styles from '../../styles.scss'

const NoResults = ({
  closeSearchModal,
}) => {
  const [latestNewsIds, setLatestNewsIds] = useState([])
  const { locale } = useLocale()
  const { requestReadNews } = useAction({ requestReadNews: readNews.request })
  useEffect(() => {
    requestReadNews({
      language: locale,
      sort: '-published',
      limit: 2,
      offset: 0,
    }).then(res => setLatestNewsIds(res.data.map($prop('newsId'))))
  }, [locale])
  const getLatestNewIds = useCallback(
    () => latestNewsIds,
    [latestNewsIds],
  )

  const latestNews = useSelector(createNewsByIdSelector(getLatestNewIds))

  const t = useTranslation()
  return (
    <>
      <p className={styles.message}>
        {t('mediaCore.modals.search.notResultMessage')}
      </p>
      <p className={styles.result}>{t('mediaCore.modals.search.noResultsTitleOne')}</p>
      <p className={styles.result}>{t('mediaCore.modals.search.noResultsTitleTwo')}</p>
      <p className={styles.result}>{t('mediaCore.modals.search.noResultsTitleThree')}</p>
      <div className={styles.content}>
        <p className={styles.title}>{t('mediaCore.modals.search.resultTitle')}</p>
        <div className={styles.list}>
          {latestNews.map(newspaper => (
            <NewspaperCard
              key={newspaper.title}
              newspaper={newspaper}
              handleClick={closeSearchModal}
            />
          ))}
        </div>
      </div>
    </>
  )
}

NoResults.propTypes = {
  closeSearchModal: PropTypes.func.isRequired,
}

export default React.memo(NoResults)
