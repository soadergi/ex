import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import newsPaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import { getIsMediaArticle } from 'weplay-core/helpers/getIsMediaArticle'

import LocalizedMoment from 'weplay-components/LocalizedMoment'
import NewspaperInfoText from 'weplay-components/NewspaperInfoText'
import BookmarkIcon from 'weplay-components/BookmarkIcon'

import LangSwitcher from './LangSwitcher'
import styles from './styles.scss'

const InfoPanel = ({
  // required props
  newspaper,
  // container props
  isLight,
  articleLanguages,
  className,
  // optional props
  hasBookmarkButton,
}) => {
  const t = useTranslation()
  const newspaperInfoText = useMemo(() => {
    let text = ''
    if (getIsMediaArticle(newspaper)) {
      text = newspaper.mediaDuration
    } else if (newspaper.timeToRead) {
      text = t('mediaCore.timeCounter.timeToRead', { count: newspaper.timeToRead })
    }
    return text
  }, [newspaper])

  return (
    <div className={classNames(
      styles.block,
      { [styles.white]: isLight },
      className,
    )}
    >
      <div className={styles.item}>
        <LocalizedMoment
          dateTime={newspaper.publishedDate}
          formatKey="short"
        />
      </div>
      <LangSwitcher
        articleLanguages={articleLanguages}
        className={styles.item}
      />

      <div className={classNames(
        styles.item,
        styles.time,
      )}
      >
        {hasBookmarkButton && (
          <BookmarkIcon
            color={isLight ? 'grey' : ''}
            newspaperId={newspaper.newsId}
            isBookmarked={newspaper.isInBookmark}
            size="small"
          />
        )}
        <NewspaperInfoText
          isLight={isLight}
          className="u-ml-1"
          text={newspaperInfoText}
        />
      </div>
    </div>
  )
}

InfoPanel.propTypes = {
  // required props
  newspaper: newsPaperPropType.isRequired,
  // container props
  articleLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  isLight: PropTypes.bool,
  // optional props
  hasBookmarkButton: PropTypes.bool,
}

InfoPanel.defaultProps = {
  // optional props
  hasBookmarkButton: true,
  className: '',
  isLight: false,
}

export default React.memo(InfoPanel)
