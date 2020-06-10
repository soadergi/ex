import socialPostPropType from 'weplay-core/customPropTypes/socialPostPropType'
import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'
import classNames from 'classnames'
import SocialPost from 'weplay-components/SocialPost'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import container from './container'
import styles from './styles.scss'

const SocialPostList = ({
  // required props
  i18nTexts,
  // container props
  posts,
  isMobileWidth,
  isListExpanded,
  expandList,
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.isExpanded]: isListExpanded && isMobileWidth,
      },
    )}
  >
    <Scrollbars
      autoHeightMax={2000}
      autoHide
      universal
      autoHeight={isListExpanded && isMobileWidth}
      disabled
    >
      <div className={styles.listWrap}>
        {posts.map(post => (
          <div
            className={styles.item}
            key={post.id}
            {...getAnalyticsAttributes({
              category: 'Social',
              action: 'post_click',
              label: post.type,
              context: post.url,
              position: LOOKUP,
            })}
          >
            <SocialPost
              post={post}
            />
          </div>
        ))}
      </div>
    </Scrollbars>

    <button
      type="button"
      className={classNames(
        styles.button,
      )}
      onClick={expandList}
    >
      {i18nTexts.button.viewMoreBtn}
    </button>
  </div>
)

SocialPostList.propTypes = {
  // required props
  i18nTexts: PropTypes.shape({}).isRequired,
  // container props
  posts: PropTypes.arrayOf(socialPostPropType).isRequired,
  isMobileWidth: PropTypes.bool.isRequired,
  isListExpanded: PropTypes.bool.isRequired,
  expandList: PropTypes.func.isRequired,
  // optional props
}

SocialPostList.defaultProps = {
  // optional props
}

export default container(SocialPostList)
