import PropTypes from 'prop-types'
import React, { Fragment, useMemo, useCallback } from 'react'
import classNames from 'classnames'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { $hasData } from 'weplay-core/$utils/$hasData'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import { createEmptyArray } from 'weplay-core/helpers/createEmptyArray'
import { isPeriodicalBlockVisible } from 'weplay-core/helpers/isPeriodicalBlockVisible'

import ArticleItemWrap from 'weplay-components/_wrappers/ArticleItemWrap'
import Article from 'weplay-components/Article'
import LoadMoreButton from 'weplay-components/LoadMoreButton'
import SubscriptionBlock from 'weplay-components/SubscriptionBlock'

import BigBanner from 'weplay-media/components/BigBanner'
import VirtualPagination from 'weplay-media/components/VirtualPagination'
import bigBannerPropType from 'weplay-media/customPropTypes/bigBannerPropType'

import container from './container'
import styles from './styles.scss'

const subscribeFormModifiers = ['media']
const DEFAULT_NEWS_LIST_LENGTH = 5

const NewsInfiniteList = ({
  i18nTexts,
  storedNewsList,
  isHiddenSpecialTag,
  fetchMoreNews,
  isLoadingReadNews,
  pageNum,
  readNewsHasMore,
  currentTagUrl,
  articleModifier,
  // optional props
  bigBanner,
  isTile,
  isWhite,
}) => {
  const handleCreateEmptyNewsArray = useCallback(() => (
    isLoadingReadNews
      ? createEmptyArray(DEFAULT_NEWS_LIST_LENGTH)
      : []),
  [isLoadingReadNews])

  const newsList = useMemo(
    () => ($hasData(storedNewsList) ? storedNewsList : handleCreateEmptyNewsArray()),
    [storedNewsList, handleCreateEmptyNewsArray],
  )

  return (
    <>
      <VirtualPagination
        hasMore={readNewsHasMore}
        pageNum={pageNum}
      />
      <div
        className={classNames(
          styles.block,
          isTile && styles.tile,
        )}
        data-qa-id={dataQaIds.components.newsInfiniteList}
      >
        {newsList.map((newspaper, index) => (
          <Fragment key={newspaper?.newsId ?? index}>
            <ArticleItemWrap>
              <Article
                modifier={articleModifier}
                article={newspaper}
                isHiddenSpecialTag={isHiddenSpecialTag}
                currentTagUrl={currentTagUrl}
                isWhite={isWhite}
              />
            </ArticleItemWrap>
            {(bigBanner && isPeriodicalBlockVisible({
              currentIndex: index,
              startIndex: 10,
              interval: 20,
              total: newsList.length,
            })) && <BigBanner banner={bigBanner} />}

            {!isTile && isPeriodicalBlockVisible({
              currentIndex: index,
              startIndex: 4,
              interval: 20,
              total: newsList.length,
            }) && (
              <SubscriptionBlock
                Wrapper={ArticleItemWrap}
                modifiers={subscribeFormModifiers}
              />
            )}
          </Fragment>
        ))}
      </div>

      <LoadMoreButton
        isVisible={readNewsHasMore}
        isLoading={isLoadingReadNews}
        onClick={fetchMoreNews}
        buttonText={i18nTexts.button.loadMore}
      />
    </>
  )
}

NewsInfiniteList.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  storedNewsList: PropTypes.arrayOf(newspaperPropType).isRequired,
  isHiddenSpecialTag: PropTypes.bool,
  fetchMoreNews: PropTypes.func.isRequired,
  isLoadingReadNews: PropTypes.bool.isRequired,
  pageNum: PropTypes.number.isRequired,
  readNewsHasMore: PropTypes.bool.isRequired,
  articleModifier: PropTypes.string,
  currentTagUrl: PropTypes.string,
  isWhite: PropTypes.bool,
  bigBanner: bigBannerPropType,
  isTile: PropTypes.bool,
}

NewsInfiniteList.defaultProps = {
  isHiddenSpecialTag: false,
  currentTagUrl: null,
  bigBanner: null,
  articleModifier: '',
  isWhite: false,
  isTile: false,
}

export default container(NewsInfiniteList)
