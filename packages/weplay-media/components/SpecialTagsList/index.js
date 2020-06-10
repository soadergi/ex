import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import i18nTextsPropType from 'weplay-core/customPropTypes/i18nTextsPropType'
import { isPeriodicalBlockVisible } from 'weplay-core/helpers/isPeriodicalBlockVisible'

import SubscriptionBlock from 'weplay-components/SubscriptionBlock'
import ArticleItemWrap from 'weplay-components/_wrappers/ArticleItemWrap'
import LoadMoreButton from 'weplay-components/LoadMoreButton'
import GridTile from 'weplay-components/GridTile/GridTile'

import VirtualPagination from 'weplay-media/components/VirtualPagination'
import specialTagPropType from 'weplay-media/customPropTypes/specialTagPropType'

import SpecialTagCard from './SpecialTagCard'
import container from './container'

const subscribeFormModifiers = ['media']
const specialTagCardConfig = { type: 'inline' }

const SpecialTagsList = ({
  i18nTexts,
  specialTags,
  specialTagsPage,
  specialTagsHasMore,
  isSpecialTagsLoading,
  loadNextPage,
}) => (
  <>
    <VirtualPagination
      hasMore={specialTagsHasMore}
      pageNum={specialTagsPage}
    />
    <GridTile direction="row">
      {specialTags.map((specialTag, index) => (
        <Fragment key={specialTag.specialTagId}>
          <SpecialTagCard
            specialTag={specialTag}
            config={specialTagCardConfig}
          />
          {isPeriodicalBlockVisible({
            currentIndex: index,
            startIndex: 4,
            interval: 20,
            total: specialTags.length,
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
      isVisible={specialTagsHasMore}
      isLoading={isSpecialTagsLoading}
      onClick={loadNextPage}
      buttonText={i18nTexts.button.loadMore}
    />
  </>
)

SpecialTagsList.propTypes = {
  i18nTexts: i18nTextsPropType.isRequired,
  specialTags: PropTypes.arrayOf(specialTagPropType).isRequired,
  specialTagsPage: PropTypes.number.isRequired,
  specialTagsHasMore: PropTypes.bool.isRequired,
  isSpecialTagsLoading: PropTypes.bool.isRequired,
  loadNextPage: PropTypes.func.isRequired,
}

export default container(SpecialTagsList)
