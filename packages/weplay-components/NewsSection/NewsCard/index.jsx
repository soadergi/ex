import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import articleImagePropType from 'weplay-core/customPropTypes/articleImagePropType'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import { getSortedTagsByNewspaper } from 'weplay-core/helpers/getSortedTagsByNewspaper'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import Link from 'weplay-components/Link'
import Tags from 'weplay-components/Tags'
import Image from 'weplay-components/Image'
import PaperInfo from 'weplay-components/PaperInfo'
import ColumnistInfo from 'weplay-components/ColumnistInfo'

import container from './container'
import styles from './styles.scss'
import Activities from './Activities'

const mods = [
  'columnistCard',
  'newsLargeCard',
  'newsCard',
  'newsCardBtb',
  'newsCardImg',
  'noOverlay',
  'events',
]
const whiteMod = ['white']

export const NewsCardMarkup = ({
  // required props
  newspaper,
  modifiers,
  // container props
  columnist,
  title,
  url,
  image,
  isColumnistNewspaper,
  isLargeNews,
  // optional props
  hasTags,
  hasNewspaperInfoText,
  hasCommentsAndBookmark,
  columnistLink,
}) => (
  <div
    className={classNames(
      styles.block,
      setCSSModifiers(modifiers, styles),
    )}
  >
    { isColumnistNewspaper && (
      <ColumnistInfo
        columnist={columnist}
        className={styles.columnist}
      />
    )}
    {isLargeNews ? (
      <Link to={url}>
        <div className={styles.imgBlock}>
          <Image
            src={image.url}
            alt={image.alt}
            className={styles.image}
          />
        </div>
      </Link>
    )
      : (
        <div className={styles.imgBlock}>
          {isColumnistNewspaper ? (
            <Link
              to={columnistLink}
              className={styles.link}
            >
              <Image
                src={image.url}
                alt={image.alt}
                className={styles.image}
              />
            </Link>
          ) : (
            <Link
              to={url}
            >
              <Image
                src={image.url}
                alt={image.alt}
                className={styles.image}
              />
            </Link>
          )}
        </div>
      )}
    <div className={styles.container}>
      {hasTags && (
        <Tags
          specialTag={newspaper.specialTag}
          tagsForNews={getSortedTagsByNewspaper(newspaper)}
        />
      )}
      <Link
        to={url}
        className={classNames(
          'c-h3',
          styles.title,
        )}
      >
        {title}
      </Link>
      <div className={classNames(
        'u-mt-2',
        styles.footer,
      )}
      >
        <Activities
          className={styles.activities}
          publishedDate={newspaper.publishedDate}
          modifiers={isLargeNews ? whiteMod : []}
        />
        <PaperInfo
          color={isLargeNews ? 'white' : ''}
          newspaper={newspaper}
          hasCommentsAndBookmark={hasCommentsAndBookmark}
          hasNewspaperInfoText={hasNewspaperInfoText}
        />
      </div>
    </div>
  </div>
)

NewsCardMarkup.propTypes = {
  // required props
  newspaper: newspaperPropType.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)).isRequired,
  // container props
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: articleImagePropType.isRequired,
  isLargeNews: PropTypes.bool,
  columnist: PropTypes.shape({}),
  isColumnistNewspaper: PropTypes.bool,
  // optional props
  hasTags: PropTypes.bool,
  hasNewspaperInfoText: PropTypes.bool,
  hasCommentsAndBookmark: PropTypes.bool,
  columnistLink: PropTypes.string,
}

NewsCardMarkup.defaultProps = {
  // container props
  isLargeNews: false,
  columnist: null,
  isColumnistNewspaper: false,
  // optional props
  hasTags: true,
  hasNewspaperInfoText: true,
  hasCommentsAndBookmark: true,
  columnistLink: '',
}

export default container(NewsCardMarkup)
