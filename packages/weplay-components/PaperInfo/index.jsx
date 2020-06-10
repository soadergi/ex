import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getIsMediaArticle } from 'weplay-core/helpers/getIsMediaArticle'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'

import NewspaperInfoText from 'weplay-components/NewspaperInfoText'
import BookmarkIcon from 'weplay-components/BookmarkIcon'

import styles from './styles.scss'

const PaperInfo = ({
  // required props
  newspaper,
  // container props
  // optional props
  hasNewspaperInfoText,
  hasCommentsAndBookmark,
  color,
  className,
}) => {
  const t = useTranslation()
  const newspaperInfoText = useMemo(() => (getIsMediaArticle(newspaper)
    ? t('mediaCore.newspaperInfoText.addToBookmark')
    : t('mediaCore.timeCounter.timeToRead', { count: newspaper.timeToRead })
  ), [newspaper])

  return (
    <div className={classNames(
      styles.block,
      className,
    )}
    >
      {hasNewspaperInfoText && (
        <NewspaperInfoText
          className={styles.counter}
          color={color}
          text={newspaperInfoText}
        />
      )}
      {hasCommentsAndBookmark && (
        <BookmarkIcon
          color={color}
          newspaperId={newspaper.newsId}
          isBookmarked={newspaper.isInBookmark}
          size="small"
        />
      )}
    </div>
  )
}

PaperInfo.propTypes = {
  // required props
  newspaper: newspaperPropType.isRequired,
  // container props
  // optional props
  hasNewspaperInfoText: PropTypes.bool,
  hasCommentsAndBookmark: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
}

PaperInfo.defaultProps = {
  // optional props
  hasNewspaperInfoText: true,
  hasCommentsAndBookmark: true,
  color: '',
  className: '',
}

export default React.memo(PaperInfo)
