import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getPluralizeStatus } from 'weplay-core/helpers/getPluralizeStatus'
import { createNewsByIdSelector } from 'weplay-core/reduxs/news/reducer'
import { searchResultsPaginationSelector } from 'weplay-core/reduxs/search/reducer'

import LoadMoreButton from 'weplay-components/LoadMoreButton'

import styles from '../../styles.scss'

import ShortNewsCard from './ShortNewsCard/ShortNewsCard'

const ResultList = ({
  hasMore,
  searchResultsIds,
  isSearchResultsLoading,
  loadMoreResults,
  closeSearchModal,
}) => {
  const searchResults = useSelector(createNewsByIdSelector(() => searchResultsIds))
  const paginationInfo = useSelector(searchResultsPaginationSelector)
  const t = useTranslation()
  const countName = useMemo(() => t(`mediaCore.modals.search.count.${getPluralizeStatus(paginationInfo.count)}`),
    [t, paginationInfo.count])
  return (
    <>
      <p className={styles.result}>
        {t('mediaCore.modals.search.resultsFor')}
        <span className={styles.resultValue}>
          {paginationInfo.count}
        </span>
        {countName}
      </p>
      <div className={styles.scrollbar}>
        <Scrollbars
          universal
        >
          {searchResults.map(newspaper => (
            <ShortNewsCard
              key={newspaper.title}
              newspaper={newspaper}
              handleCardClick={closeSearchModal}
            />
          ))}
          <LoadMoreButton
            isVisible={hasMore}
            isLoading={isSearchResultsLoading}
            onClick={loadMoreResults}
            buttonText={t('button.loadMore')}
          />
        </Scrollbars>
      </div>
    </>
  )
}

ResultList.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  searchResultsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  isSearchResultsLoading: PropTypes.bool.isRequired,
  loadMoreResults: PropTypes.func.isRequired,
  closeSearchModal: PropTypes.func.isRequired,
}

export default React.memo(ResultList)
