import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import articlesPropType from 'weplay-core/customPropTypes/articlesPropType'
import { isPeriodicalBlockVisible } from 'weplay-core/helpers/isPeriodicalBlockVisible'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'

import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import Article from 'weplay-components/Article'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import ArticleItemWrap from 'weplay-components/_wrappers/ArticleItemWrap'
import GridTile from 'weplay-components/GridTile/GridTile'
import LoadMoreButton from 'weplay-components/LoadMoreButton'
import GradientLink from 'weplay-components/GradientLink'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import VirtualPagination from 'weplay-media/components/VirtualPagination'

import styles from './styles.scss'
import container from './container'

const subscribeFormModifiers = ['media']

const NewsFeed = ({
  i18nTexts,
  articles,
  fetchMoreNews,
  readNewsHasMore,
  isLoadingReadNews,
  pageNum,
  titleText,
}) => (
  <>
    <VirtualPagination
      hasMore={readNewsHasMore}
      pageNum={pageNum}
    />
    <Section
      id="latest"
      paddingY={PADDING_Y.SM}
    >
      <ContentContainer
        data-qa-id={dataQaIds.components.newsFeed}
      >
        <h2 className={styles.header}>
          <GradientLink
            to="/"
            text={titleText}
            className={styles.title}
          />
        </h2>
        <GridTile direction="row">
          {articles.map((article, index) => (
            <Fragment key={article.newsId}>
              <ArticleItemWrap>
                <Article
                  article={article}
                  modifier="inline"
                />
              </ArticleItemWrap>
              {isPeriodicalBlockVisible({
                currentIndex: index,
                startIndex: 4,
                interval: 20,
              }) && (
              <SubscriptionBlock
                Wrapper={ArticleItemWrap}
                modifiers={subscribeFormModifiers}
              />
              )}
            </Fragment>
          ))}
        </GridTile>

        <LoadMoreButton
          isVisible={readNewsHasMore}
          isLoading={isLoadingReadNews}
          onClick={fetchMoreNews}
          buttonText={i18nTexts.button.loadMore}
        />
      </ContentContainer>
    </Section>
  </>
)

NewsFeed.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  articles: articlesPropType.isRequired,
  fetchMoreNews: PropTypes.func.isRequired,
  readNewsHasMore: PropTypes.bool.isRequired,
  isLoadingReadNews: PropTypes.bool.isRequired,
  pageNum: PropTypes.number.isRequired,
  titleText: PropTypes.string,
}

NewsFeed.defaultProps = {
  titleText: '',
}

export default container(NewsFeed)
