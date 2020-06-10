import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import articleImagePropType from 'weplay-core/customPropTypes/articleImagePropType'
import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'

import Skeleton from 'weplay-components/Skeleton'
import Breadcrumbs from 'weplay-components/Breadcrumbs'
import Image from 'weplay-components/Image'
import MediaContent from 'weplay-components/MediaContent/loadable'

import newspaperWriterPropType from 'weplay-media/customPropTypes/newspaperWriterPropType'

import container from './container'
import styles from './styles.scss'
import AuthorTile from './AuthorTile'
import InfoPanel from './InfoPanel'

const articleMediaPlayer = [
  'articleMediaPlayer',
]

const NewspaperHeader = ({
  // required props
  articleLanguages,
  newspaper,
  hasBreadcrumbs,
  // container props
  newspaperWriter,
  bigArticleImage,
  breadcrumbsEntityName,
  isLongread,
  articleMediaUrl,
  isMediaArticle,
  isAudioArticle,
  isWhiteBreadcrumbs,
  // optional props
  allBreadcrumbs,
  hasAuthor,
  hasBookmarkButton,
}) => (
  <div className={classNames(
    styles.block,
    {
      [styles.longread]: isLongread,
      [styles.media]: isMediaArticle,
    },
  )}
  >
    <div className={styles.head}>
      {hasBreadcrumbs && (
        <div className={classNames(
          styles.section,
          styles.breadcrumbsBlock,
        )}
        >
          <Breadcrumbs
            entityName={breadcrumbsEntityName}
            allBreadcrumbs={allBreadcrumbs}
            className={styles.breadcrumbs}
            isWhite={isWhiteBreadcrumbs}
          />
        </div>
      )}

      <div className={styles.section}>
        <div className={styles.titleBlock}>
          <div className={styles.info}>
            <h1
              className={styles.title}
              data-qa-id={dataQaIds.pages.articlePage.title}
            >
              {newspaper.title || <Skeleton count={2} />}
            </h1>
            {(hasAuthor && !isMediaArticle) && (
              <AuthorTile
                className={styles.author}
                newspaperWriter={newspaperWriter}
                isWhite={isLongread}
              />
            )}
            <InfoPanel
              className={styles.activities}
              newspaper={newspaper}
              isLight={isLongread}
              articleLanguages={articleLanguages}
              hasBookmarkButton={hasBookmarkButton}
            />
          </div>
        </div>
      </div>
    </div>

    <div className={styles.mediaBlock}>
      { (isMediaArticle && articleMediaUrl) ? (
        <div className={classNames(
          styles.section,
          styles.mediaWrap,
          { [styles.audioWrap]: isAudioArticle },
        )}
        >
          <MediaContent
            newspaper={newspaper}
            isAudio={isAudioArticle}
            url={articleMediaUrl}
            modifiers={articleMediaPlayer}
          />
        </div>
      ) : (
        <figure className={styles.imgBlock}>
          <Image
            src={bigArticleImage.url}
            alt={bigArticleImage.alt}
            className={styles.image}
          />
          <figcaption className={styles.imgCaption}>{newspaper.mediaCopyright}</figcaption>
        </figure>
      )}
    </div>
  </div>
)

NewspaperHeader.propTypes = {
  // required props
  articleLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  newspaper: newspaperPropType.isRequired,
  hasBreadcrumbs: PropTypes.bool.isRequired,
  // container props
  newspaperWriter: newspaperWriterPropType.isRequired,
  isLongread: PropTypes.bool.isRequired,
  isMediaArticle: PropTypes.bool.isRequired,
  isAudioArticle: PropTypes.bool.isRequired,
  isWhiteBreadcrumbs: PropTypes.bool.isRequired,
  bigArticleImage: articleImagePropType.isRequired,
  breadcrumbsEntityName: PropTypes.string.isRequired,
  // optional props
  allBreadcrumbs: PropTypes.arrayOf(PropTypes.shape({})),
  hasAuthor: PropTypes.bool,
  hasBookmarkButton: PropTypes.bool,
  articleMediaUrl: PropTypes.string,
}

NewspaperHeader.defaultProps = {
  // optional props
  allBreadcrumbs: null,
  hasAuthor: true,
  hasBookmarkButton: true,
  articleMediaUrl: '',
}

export default container(NewspaperHeader)
