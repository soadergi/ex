import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import SectionHeader from 'weplay-components/SectionHeader'
import Tweet from 'weplay-components/Tweet/loadable'
import ShowMoreLink from 'weplay-components/ShowMoreLink'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './styles.scss'
import container from './container'

const hotMediaAlignTitle = ['hotMediaAlignTitle', 'hasLinkArrow']

export const TweetsListMarkup = ({
  // required props
  allTweetsUrl,
  tournamentHotTweetIDs,

  // props from container
  isOpened,
  handleClick,

  // optional props
  isMobileWidth,
  // analytic
  contentAction,
  contentType,
}) => {
  const t = useTranslation()

  return (
    <div
      className={styles.tweetsList}
    >
      <SectionHeader
        title={t('events.mediaHeaders.tweets.title')}
        linkUrl={!isMobileWidth && allTweetsUrl}
        linkText={t('events.mediaHeaders.tweets.link')}
        contentAction={contentAction}
        contentType={contentType}
        modifiers={hotMediaAlignTitle}
        hasLinkArrow
      />

      <div className={classNames(
        styles.wrapper,
        { [styles.hideCloud]: isOpened },
      )}
      >
        {tournamentHotTweetIDs.map(tweetId => (
          <div
            className={styles.tweet}
            key={tweetId}
          >
            <div className={styles.container}>
              <Tweet
                tweetId={tweetId}
              />
            </div>
          </div>
        ))}
      </div>

      {!isMobileWidth ? (
        <div className={classNames(
          'u-text-center u-mt-0 u-mt-sm-2',
        )}
        >
          <Button
            className={styles.button}
            color={BUTTON_COLOR.BASIC}
            priority={BUTTON_PRIORITY.SECONDARY}
            onClick={handleClick}
          >
            {isOpened
              ? t('button.loadMore')
              : t('button.hideAll')}
          </Button>
        </div>
      ) : (
        <ShowMoreLink
          target="_blank"
          linkUrl={allTweetsUrl}
          linkText={t('events.mediaHeaders.tweets.link')}
          contentAction={contentAction}
          isVisible
        />
      )}
    </div>
  )
}

TweetsListMarkup.propTypes = {
  // required props
  allTweetsUrl: PropTypes.string.isRequired,
  tournamentHotTweetIDs: PropTypes.arrayOf(PropTypes.string).isRequired,

  // props from container
  isOpened: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,

  // optional props
  isMobileWidth: PropTypes.bool,
  contentAction: PropTypes.string,
  contentType: PropTypes.string,
}

TweetsListMarkup.defaultProps = {
  isMobileWidth: false,
  contentAction: '',
  contentType: '',
}

export default container(TweetsListMarkup)
