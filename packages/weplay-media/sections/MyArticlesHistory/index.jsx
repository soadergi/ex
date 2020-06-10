import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import MessageBanner from 'weplay-components/MessageBanner'
import PageSectionTitle from 'weplay-components/PageSectionTitle'

import userArticlesPropType from 'weplay-media/customPropTypes/userArticlesPropType'
import messageBannerImage from 'weplay-media/sections/img/telescope.svg'
import ClearUserArticlesPopup from 'weplay-media/components/ClearUserArticlesPopup'
import { SEARCH_TIMEOUT } from 'weplay-media/sections/config/myMedia'
import NoArticles from 'weplay-media/components/NoArticles'
import MyMediaFilters from 'weplay-media/components/MyMediaFilters'
import UserArticles from 'weplay-media/components/UserArticles'

import { SORT_OPTIONS } from './consts'
import styles from './styles.scss'
import container from './container'

const MyArticlesPage = ({
  isUserHistoryEmpty,
  openMyMediaClearHistoryPopup,
  closeMyMediaClearHistoryPopup,
  isClearHistoryPopupVisible,
  isUserHistoryLoading,
  isSearchResultEmpty,
  viewOptions,
  handleViewOptionsChange,
  fetchMoreUserHistory,
  hasContent,
  createAnalyticsWithAction,
  userHistory,
  userHistoryHasMore,
  deleteHistoryById,
  userHistoryCount,
  deleteUserHistory,
  isDeletedBrowsingHistory,
}) => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      <PageSectionTitle
        text={t('mediaCore.profile.browsingHistory.title')}
      />
      <div className={styles.content}>
        {isUserHistoryEmpty
          ? (
            <NoArticles
              pageName="browsingHistory"
              isDeletedArticles={isDeletedBrowsingHistory}
            />
          )
          : (
            <MyMediaFilters
              openClearArticlesPopup={openMyMediaClearHistoryPopup}
              viewOptions={viewOptions}
              dropdownOptions={SORT_OPTIONS}
              asyncSearchTimeout={SEARCH_TIMEOUT}
              onChange={handleViewOptionsChange}
              createAnalyticsWithAction={createAnalyticsWithAction}
              hasCounter
              hasClearButton
              userArticlesCount={userHistoryCount}
              pageName="history"
              userArticlesLoading={isUserHistoryLoading}
            />
          )}
        {hasContent && (
          <UserArticles
            userArticles={userHistory}
            viewOptions={viewOptions}
            fetchUserArticles={fetchMoreUserHistory}
            hasMoreArticles={userHistoryHasMore}
            isLoading={isUserHistoryLoading}
            deleteArticleById={deleteHistoryById}
          />
        )}
        {isSearchResultEmpty && (
          <MessageBanner
            imageUrl={messageBannerImage}
            title={t('mediaCore.profile.message.noResultTitle')}
            message={t('mediaCore.profile.message.noResultSubTitle')}
          />
        )}
        <ClearUserArticlesPopup
          closePopup={closeMyMediaClearHistoryPopup}
          isShown={isClearHistoryPopupVisible}
          deleteUserArticles={deleteUserHistory}
          popupName="deleteHistory"
        />
      </div>
    </div>
  )
}

MyArticlesPage.propTypes = {
  // required props
  // props from container
  isUserHistoryEmpty: PropTypes.bool.isRequired,
  openMyMediaClearHistoryPopup: PropTypes.func.isRequired,
  closeMyMediaClearHistoryPopup: PropTypes.func.isRequired,
  isClearHistoryPopupVisible: PropTypes.bool.isRequired,
  isUserHistoryLoading: PropTypes.bool.isRequired,
  isSearchResultEmpty: PropTypes.bool.isRequired,
  viewOptions: PropTypes.shape({
    sortType: PropTypes.string.isRequired,
    sortDesc: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  handleViewOptionsChange: PropTypes.func.isRequired,
  fetchMoreUserHistory: PropTypes.func.isRequired,
  hasContent: PropTypes.bool.isRequired,
  createAnalyticsWithAction: PropTypes.func.isRequired,
  userHistory: userArticlesPropType.isRequired,
  userHistoryHasMore: PropTypes.bool.isRequired,
  deleteHistoryById: PropTypes.func.isRequired,
  userHistoryCount: PropTypes.number.isRequired,
  deleteUserHistory: PropTypes.func.isRequired,
  isDeletedBrowsingHistory: PropTypes.bool.isRequired,
  // optional props
}

export default container(MyArticlesPage)
