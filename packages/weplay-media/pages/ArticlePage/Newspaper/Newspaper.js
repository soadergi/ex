import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import SubscriptionBlock from 'weplay-components/SubscriptionBlock'

import BigBanner from 'weplay-media/components/BigBanner'
import { useBigBannerByTag } from 'weplay-media/components/BigBanner/useBigBannerByTag'

import styles from './Newspaper.scss'
import { getTagsConfigFromNewspaper } from './helpers'
import NewspaperHeader from './NewpaperHeader'
import NewspaperBody from './NewspaperBody/NewspaperBody'
import NewspaperSidebar from './NewspaperSidebar'
import NewspaperFooter from './NewspaperFooter'
import ArticleContainer from './ArticleContainer'
import NewspaperSocialShareBlock from './NewspaperSocialShareBlock'

const contentSubscribeFormModifiers = ['content']

const Newspaper = ({
  // required props
  newspaper,
  // optional props
  pageName,
  articleLanguages,
  allBreadcrumbs,
  hasTags,
  hasAuthor,
  hasBookmarkButton,
  hasCommentsSection,
  hasBreadcrumbs,
  hasAdditionalBlocks,
}) => {
  const isTabletWidth = useSelector(isTabletWidthSelector)
  const tagsConfig = useMemo(() => getTagsConfigFromNewspaper(newspaper), [newspaper])
  const newspaperId = useMemo(() => Number(newspaper.newsId), [newspaper])
  const isBookmarked = useMemo(() => Boolean(newspaper.isInBookmark), [newspaper])
  const { bigBanner } = useBigBannerByTag(tagsConfig)

  return (
    <div
      className={styles.block}
      data-event-position="Newspaper"
    >
      <NewspaperHeader
        newspaper={newspaper}
        hasBreadcrumbs={hasBreadcrumbs}
        articleLanguages={articleLanguages}
        hasBookmarkButton={hasBookmarkButton}
        hasAuthor={hasAuthor}
        allBreadcrumbs={allBreadcrumbs}
      />
      <div className={styles.content}>
        <ArticleContainer hasAdditionalBlocks={hasAdditionalBlocks}>
          {hasAdditionalBlocks && (
            <div className={styles.leftSidebar}>
              <div className={styles.sticky}>
                <NewspaperSocialShareBlock
                  newspaper={newspaper}
                  newspaperId={newspaperId}
                  isBookmarked={isBookmarked}
                />
              </div>
            </div>
          )}

          <div
            className={styles.article}
            data-qa-id={dataQaIds.pages.articlePage.body}
          >
            <NewspaperBody
              newspaper={newspaper}
              hasTags={hasTags}
            />
            {bigBanner && (
              <div className={styles.bannerWrap}>
                <BigBanner banner={bigBanner} />
              </div>
            )}
            <SubscriptionBlock
              modifiers={contentSubscribeFormModifiers}
              pageName={pageName}
            />
          </div>

          {hasAdditionalBlocks && (
            <div className={styles.rightSidebar}>
              {!isTabletWidth && (
              <NewspaperSidebar
                newspaper={newspaper}
              />
              )}
            </div>
          )}
        </ArticleContainer>
      </div>
      {hasAdditionalBlocks && (
        <NewspaperFooter
          newspaper={newspaper}
          newspaperId={newspaperId}
          isBookmarked={isBookmarked}
          hasCommentsSection={hasCommentsSection}
          hasTags={hasTags}
        />
      )}
    </div>
  )
}

Newspaper.propTypes = {
  // required props
  newspaper: newspaperPropType.isRequired,
  // optional props
  pageName: PropTypes.string,
  articleLanguages: PropTypes.arrayOf(PropTypes.string),
  allBreadcrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  hasTags: PropTypes.bool,
  hasAuthor: PropTypes.bool,
  hasBookmarkButton: PropTypes.bool,
  hasCommentsSection: PropTypes.bool,
  hasBreadcrumbs: PropTypes.bool,
  hasAdditionalBlocks: PropTypes.bool,
}

Newspaper.defaultProps = {
  // optional props
  pageName: undefined,
  articleLanguages: [],
  allBreadcrumbs: null,
  hasTags: true,
  hasAuthor: true,
  hasBookmarkButton: true,
  hasCommentsSection: true,
  hasBreadcrumbs: false,
  hasAdditionalBlocks: true,
}

export default React.memo(Newspaper)
