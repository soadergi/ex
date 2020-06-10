import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import MessageBanner from 'weplay-components/MessageBanner'
import PageSectionTitle from 'weplay-components/PageSectionTitle'

import userArticlesPropType from 'weplay-media/customPropTypes/userArticlesPropType'
import { SEARCH_TIMEOUT } from 'weplay-media/sections/config/myMedia'
import ClearUserArticlesPopup from 'weplay-media/components/ClearUserArticlesPopup'
import NoArticles from 'weplay-media/components/NoArticles'
import MyMediaFilters from 'weplay-media/components/MyMediaFilters'
import UserArticles from 'weplay-media/components/UserArticles'
import messageBannerImage from 'weplay-media/sections/img/telescope.svg'

import { SORT_OPTIONS } from './consts'
import styles from './styles.scss'
import container from './container'

const MyBookmarksPage = ({
  isBookmarksEmpty,
  isBookmarksLoading,
  isSearchResultEmpty,
  viewOptions,
  handleViewOptionsChange,
  hasContent,
  bookmarks,
  handleDeleteBookmarkById,
  bookmarksCount,
  closeClearUserArticlesPopup,
  openClearUserArticlesPopup,
  isClearBookmarksPopupVisible,
  deleteBookmarks,
  hasMoreBookmarks,
  fetchMoreBookmarks,
  isDeletedBookmarks,
}) => {
  const t = useTranslation()
  return (
    <>
      <div className={styles.block}>
        <PageSectionTitle
          text={t('mediaCore.profile.bookmarks.title')}
        />
        <div className={styles.content}>
          {isBookmarksEmpty
            ? (
              <NoArticles
                pageName="bookmarks"
                isDeletedArticles={isDeletedBookmarks}
                hasLink={false}
              />
            )
            : (
              <MyMediaFilters
                viewOptions={viewOptions}
                dropdownOptions={SORT_OPTIONS}
                asyncSearchTimeout={SEARCH_TIMEOUT}
                onChange={handleViewOptionsChange}
                userArticlesCount={bookmarksCount}
                hasCounter
                hasClearButton
                pageName="bookmarks"
                openClearArticlesPopup={openClearUserArticlesPopup}
                userArticlesLoading={isBookmarksLoading}
              />
            )}
          {hasContent && (
            <UserArticles
              userArticles={bookmarks}
              viewOptions={viewOptions}
              deleteArticleById={handleDeleteBookmarkById}
              fetchUserArticles={fetchMoreBookmarks}
              hasMoreArticles={hasMoreBookmarks}
              isLoading={isBookmarksLoading}
              withPaperInfo={false}
            />
          )}
          <ClearUserArticlesPopup
            closePopup={closeClearUserArticlesPopup}
            isShown={isClearBookmarksPopupVisible}
            deleteUserArticles={deleteBookmarks}
            popupName="deleteBookmarks"
          />
          {isSearchResultEmpty && (
            <MessageBanner
              imageUrl={messageBannerImage}
              title={t('mediaCore.profile.message.noResultTitle')}
              message={t('mediaCore.profile.message.noResultSubTitle')}
            />
          )}
        </div>
      </div>
    </>
  )
}

MyBookmarksPage.propTypes = {
  // required props
  // props from container
  isBookmarksEmpty: PropTypes.bool.isRequired,
  isBookmarksLoading: PropTypes.bool.isRequired,
  isSearchResultEmpty: PropTypes.bool.isRequired,
  viewOptions: PropTypes.shape({
    sortType: PropTypes.string.isRequired,
    sortDesc: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  handleViewOptionsChange: PropTypes.func.isRequired,
  hasContent: PropTypes.bool.isRequired,
  handleDeleteBookmarkById: PropTypes.func.isRequired,
  bookmarks: userArticlesPropType.isRequired,
  bookmarksCount: PropTypes.number.isRequired,
  isClearBookmarksPopupVisible: PropTypes.bool.isRequired,
  openClearUserArticlesPopup: PropTypes.func.isRequired,
  closeClearUserArticlesPopup: PropTypes.func.isRequired,
  deleteBookmarks: PropTypes.func.isRequired,
  hasMoreBookmarks: PropTypes.bool.isRequired,
  fetchMoreBookmarks: PropTypes.func.isRequired,
  isDeletedBookmarks: PropTypes.bool.isRequired,
  // optional props
}

export default container(MyBookmarksPage)
