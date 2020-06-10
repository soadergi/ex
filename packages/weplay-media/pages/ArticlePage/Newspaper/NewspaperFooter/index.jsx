import PropTypes from 'prop-types'
import * as R from 'ramda'
import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getSortedTagsByNewspaper } from 'weplay-core/helpers/getSortedTagsByNewspaper'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'

import Button from 'weplay-components/Button'
import Tags from 'weplay-components/Tags'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import Similars from 'weplay-media/components/Similars'
import ArticleContainer from 'weplay-media/pages/ArticlePage/Newspaper/ArticleContainer'

import NewspaperSocialShareBlock from '../NewspaperSocialShareBlock'
import Comments from '../../Comments'

import { useNewsPaperFooter } from './container'
import styles from './styles.scss'

const NewspaperFooter = ({
  newspaperId,
  isBookmarked,
  hasCommentsSection,
  hasTags,
  newspaper,
}) => {
  const {
    isTabletWidth,
    commentIds,
    similarNewsList,
    toggleCommentsVisibility,
    commentsButtonText,
    commentsCount,
    commentsSort,
    isCommentsVisible,
    handleSortComments,
    handleGetComments,
  } = useNewsPaperFooter({
    newspaperId,
    isBookmarked,
    hasCommentsSection,
    hasTags,
    newspaper,
  })
  const t = useTranslation()
  return (
    <>
      <ArticleContainer>
        <div className={styles.block}>
          <div className={styles.content}>
            {hasTags && (
            <Tags
              specialTag={newspaper.specialTag}
              tagsForNews={getSortedTagsByNewspaper(newspaper)}
              isFullList
              className={styles.tags}
            />
            )}
            <NewspaperSocialShareBlock
              className={styles.sharing}
              newspaperId={newspaperId}
              isBookmarked={isBookmarked}
              isHorizontal
            />
          </div>
          {hasCommentsSection && (
          <Button
            onClick={toggleCommentsVisibility}
            icon="comment"
            className={styles.button}
          >
            {commentsButtonText}
          </Button>
          )}
          {hasCommentsSection && (
          <div className={styles.bottom}>
            <Comments
              newspaperId={newspaperId}
              articleId={newspaper.articleId}
              commentIds={commentIds}
              count={commentsCount}
              sort={commentsSort}
              isVisible={isCommentsVisible}
              toggleCommentsVisibility={toggleCommentsVisibility}
              handleSortComments={handleSortComments}
              handleGetComments={handleGetComments}
            />
          </div>
          )}
        </div>
      </ArticleContainer>

      {isTabletWidth && !R.isEmpty(similarNewsList) && (
      <ContentContainer>
        <Similars
          similarNews={similarNewsList}
          isFullCard
          isBottom
          title={t('title.similar')}
        />
      </ContentContainer>
      )}
    </>
  )
}

NewspaperFooter.propTypes = {
  // required props
  newspaper: newspaperPropType.isRequired,
  newspaperId: PropTypes.number.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  // optional props
  hasTags: PropTypes.bool,
  hasCommentsSection: PropTypes.bool,
}

NewspaperFooter.defaultProps = {
  // optional props
  hasTags: true,
  hasCommentsSection: true,
}

export default NewspaperFooter
