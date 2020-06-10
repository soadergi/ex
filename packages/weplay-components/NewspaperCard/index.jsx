import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import getArticleImage from 'weplay-core/helpers/getArticleImage'
import { getIsMediaArticle } from 'weplay-core/helpers/getIsMediaArticle'
import { getSortedTagsByNewspaper } from 'weplay-core/helpers/getSortedTagsByNewspaper'
import { transformUrl } from 'weplay-core/helpers/transformUrl'

import NewspaperInfoText from 'weplay-components/NewspaperInfoText'
import BookmarkIcon from 'weplay-components/BookmarkIcon'
import LocalizedMoment from 'weplay-components/LocalizedMoment'

import Link from '../Link/index'
import Skeleton from '../Skeleton'
import Tags from '../Tags/index'

import styles from './styles.scss'

export const NewspaperCard = ({
  // required props
  newspaper,
  currentTagUrl,
  isHiddenSpecialTag,
  handleClick,
  // container props
  // optional props
  titleColor,
  hasActivities,
  timeColor,
  bookmarkColor,
  isBordered,
  ...restProps
}) => {
  const t = useTranslation()
  const image = useMemo(() => getArticleImage(newspaper, 'standard'), [newspaper])
  const newspaperInfoText = useMemo(() => (getIsMediaArticle(newspaper)
    ? newspaper.mediaDuration
    : t('mediaCore.timeCounter.timeToRead', { count: newspaper.timeToRead })
  ), [newspaper])

  return (
    <div
      className={classNames(
        styles.articleItem,
        styles[titleColor],
        {
          [styles.bordered]: isBordered,
        },
      )}
      {...restProps}
    >
      <figure className={styles.figure}>
        <Link
          to={`/news/${transformUrl(newspaper)}`}
          className={styles.imageLink}
          onClick={handleClick}
        >
          <img
            className={styles.image}
            src={image.url}
            alt={image.alt}
          />
        </Link>
      </figure>

      {newspaper.tags && (
        <Tags
          specialTag={newspaper.specialTag}
          tagsForNews={getSortedTagsByNewspaper(newspaper)}
          isHiddenSpecialTag={isHiddenSpecialTag}
          currentTagUrl={currentTagUrl}
        />
      )}

      <>
        <Link
          to={`/news/${transformUrl(newspaper)}`}
          className={styles.contentLink}
          onClick={handleClick}
        >
          <p className={styles.title}>
            {newspaper.title || <Skeleton count={2} />}
          </p>
        </Link>
        {hasActivities && (
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
        )}
      </>
    </div>
  )
}

NewspaperCard.propTypes = {
  // required props
  // container props
  // optional props
  newspaper: newspaperPropType,
  currentTagUrl: PropTypes.string,
  isHiddenSpecialTag: PropTypes.bool,
  handleClick: PropTypes.func,
  hasActivities: PropTypes.bool,
  isBordered: PropTypes.bool,
  timeColor: PropTypes.string,
  bookmarkColor: PropTypes.string,
  titleColor: PropTypes.string,
}

NewspaperCard.defaultProps = {
  // optional props
  newspaper: {},
  isHiddenSpecialTag: false,
  currentTagUrl: null,
  handleClick: R.always,
  hasActivities: false,
  isBordered: false,
  titleColor: '',
  timeColor: '',
  bookmarkColor: '',
}

export default React.memo(NewspaperCard)
