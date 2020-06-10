import * as R from 'ramda'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getIsMediaArticle } from 'weplay-core/helpers/getIsMediaArticle'
import { transformUrl } from 'weplay-core/helpers/transformUrl'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import { getSortedTagsByNewspaper } from 'weplay-core/helpers/getSortedTagsByNewspaper'

import Image from 'weplay-components/Image'
import Tags from 'weplay-components/Tags'
import Link from 'weplay-components/Link'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import BookmarkIcon from 'weplay-components/BookmarkIcon'
import Skeleton from 'weplay-components/Skeleton'
import NewspaperInfoText from 'weplay-components/NewspaperInfoText'
import MediaPlayer from 'weplay-components/MediaPlayer'

import styles from './styles.scss'

const mediaPlayerMods = ['articlePlayer']

const ArticlePreview = ({
  // required props
  // container props
  // optional props
  newspaper,
  currentTagUrl,
  isHiddenSpecialTag,
  onClick,
  previewUrl,
  timeColor,
  bookmarkColor,
  ...restProps
}) => {
  const t = useTranslation()
  const newspaperInfoText = useMemo(() => (getIsMediaArticle(newspaper)
    ? newspaper.mediaDuration
    : t('mediaCore.timeCounter.timeToRead', { count: newspaper.timeToRead })
  ), [newspaper])
  const isArticleMediaType = useMemo(() => (getIsMediaArticle(newspaper)), [newspaper])
  const mediaIframeLink = useMemo(() => (newspaper.mediaIframeLink), [newspaper])

  return (
    <div
      className={classNames(
        styles.block,
      )}
      {...restProps}
    >
      <div className={styles.previewHolder}>
        {isArticleMediaType ? (
          <MediaPlayer
            url={mediaIframeLink}
            modifiers={mediaPlayerMods}
          />
        ) : (
          <figure className={styles.figure}>
            <Link
              to={`/news/${transformUrl(newspaper)}`}
              className={styles.imageLink}
              onClick={onClick}
            >
              <Image
                className={styles.image}
                src={previewUrl}
                alt={previewUrl}
              />
            </Link>
          </figure>
        )}
      </div>

      <Tags
        specialTag={newspaper.specialTag}
        tagsForNews={getSortedTagsByNewspaper(newspaper)}
        isHiddenSpecialTag={isHiddenSpecialTag}
        currentTagUrl={currentTagUrl}
        className={styles.tags}
      />

      <div className={styles.infoWrap}>
        <Link
          to={`/news/${transformUrl(newspaper)}`}
          className={styles.contentLink}
          onClick={onClick}
        >
          <p className={styles.title}>
            {newspaper.title || <Skeleton count={2} />}
          </p>
        </Link>

        <div className={styles.activities}>
          <div className={styles.info}>
            <LocalizedMoment
              dateTime={newspaper.publishedDate}
              formatKey="short"
            />
            <NewspaperInfoText
              className={styles.counter}
              color={timeColor}
              text={newspaperInfoText}
            />
          </div>
          <BookmarkIcon
            color={bookmarkColor}
            newspaperId={newspaper.newsId}
            isBookmarked={newspaper.isInBookmark}
            size="small"
          />
        </div>
      </div>

    </div>
  )
}

ArticlePreview.propTypes = {
  // required props
  // container props
  // optional props
  newspaper: newspaperPropType,
  currentTagUrl: PropTypes.string,
  isHiddenSpecialTag: PropTypes.bool,
  onClick: PropTypes.func,
  timeColor: PropTypes.string,
  bookmarkColor: PropTypes.string,
  previewUrl: PropTypes.string,
}

ArticlePreview.defaultProps = {
  // optional props
  newspaper: {},
  isHiddenSpecialTag: false,
  currentTagUrl: null,
  onClick: R.always,
  timeColor: '',
  bookmarkColor: '',
  previewUrl: '',
}

export default React.memo(ArticlePreview)
