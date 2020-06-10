import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import articlePropType from 'weplay-core/customPropTypes/articlePropType'
import { getSortedTagsByNewspaper } from 'weplay-core/helpers/getSortedTagsByNewspaper'
import { transformUrl } from 'weplay-core/helpers/transformUrl'
import articleImagePropType from 'weplay-core/customPropTypes/articleImagePropType'

import Link from 'weplay-components/Link'
import PaperInfo from 'weplay-components/PaperInfo'
import Image from 'weplay-components/Image'
import Skeleton from 'weplay-components/Skeleton'

import Tags from '../Tags'
import SpecialLabel from '../SpecialLabel'
import AuthorInline from '../AuthorInline'
import Activities from '../Activities'

import DeleteArticleControls from './DeleteArticleControls'
import container from './container'
import styles from './styles.scss'

const topConfig = { position: 'relative', top: '-90px' }
const activitiesClassNames = ['white']

const Article = ({
  article,
  articleImage,
  modifier,
  currentTagUrl,
  isHiddenSpecialTag,
  isEditable,
  isDeletionConfirming,
  toggleConfirmDeletion,
  onDeleteArticle,
  controlledArticleId,
  locationState,
  withPaperInfo,
  hasTags,
  isMediaArticle,
  isWhite,
}) => {
  const hasSpecialTag = Boolean(article.specialTag)
  const newsPaperWriter = article.author ? article.author : article.columnist
  return (
    <div
      className={classNames(
        styles.articleItem,
        {
          [styles[modifier]]: modifier,
          [styles.editable]: isEditable,
          [styles.confirm]: isDeletionConfirming,
          [styles.white]: isWhite,
        },
      )}
    >
      {isEditable && (
        <DeleteArticleControls
          controlledArticleId={controlledArticleId}
          onDeleteArticle={onDeleteArticle}
          isDeletionConfirming={isDeletionConfirming}
          handleConfirmDeletion={toggleConfirmDeletion}
          className={styles.controls}
        />
      )}

      {modifier === 'large' && (
        <div
          id="Top"
          style={topConfig}
        />
      )}

      <figure className={styles.figure}>
        <Link
          to={`/news/${transformUrl(article)}`}
          state={locationState}
          className={styles.imageLink}
        >
          <Image
            className={styles.image}
            src={articleImage.url}
            alt={articleImage.alt}
          />
        </Link>

        {hasTags && hasSpecialTag && (
          <div className={styles.articleBlock}>
            <SpecialLabel />
          </div>
        )}

        <div className={classNames(
          styles.activities,
          { [styles.isHidden]: modifier === 'large' },
        )}
        >
          <Activities
            publishedDate={article.publishedDate}
            modifications={activitiesClassNames}
            className="u-mt-1"
          />
        </div>
        {isMediaArticle && (
          <span className={styles.timer}>
            {article.mediaDuration}
          </span>
        )}
      </figure>
      {hasTags && (
        <div className={classNames({ [styles.isHidden]: modifier === 'large' })}>
          {article.tags && (
            <Tags
              specialTag={article.specialTag}
              tagsForNews={getSortedTagsByNewspaper(article)}
              isHiddenSpecialTag={isHiddenSpecialTag}
              currentTagUrl={currentTagUrl}
            />
          )}
        </div>
      )}
      <>
        <Link
          to={`/news/${transformUrl(article)}`}
          className={styles.contentLink}
        >
          <p className={classNames(
            styles.title,
            { [styles.topTitle]: modifier === 'large' },
          )}
          >
            {article.title || <Skeleton />}
          </p>
        </Link>
        {modifier === 'large' && (
          <div className={classNames(styles.info, 'u-mb-sm-1')}>
            <div className={styles.largeActivities}>
              <Activities
                publishedDate={article.publishedDate}
              />
            </div>
            <PaperInfo
              newspaper={article}
            />
          </div>
        )}
        <p className={classNames(styles.text,
          { [styles.isHidden]: modifier === 'large' })}
        >
          {article.description || <Skeleton />}
        </p>
      </>
      <div className={classNames(
        styles.writer,
        { [styles.isHidden]: modifier === 'large' },
      )}
      >
        <div className={classNames(
          styles.info,
          { [styles.mediaArticleType]: isMediaArticle },
        )}
        >
          {(newsPaperWriter && !isMediaArticle) && (
            <AuthorInline
              newspaperWriter={newsPaperWriter}
              color={isWhite ? 'gray' : ''}
            />
          )}
          {withPaperInfo && (
            <PaperInfo
              newspaper={article}
            />
          )}
        </div>
      </div>
    </div>
  )
}

Article.propTypes = {
  article: articlePropType.isRequired,
  articleImage: articleImagePropType.isRequired,
  isHiddenSpecialTag: PropTypes.bool,
  modifier: PropTypes.string,
  isEditable: PropTypes.bool,
  isDeletionConfirming: PropTypes.bool,
  toggleConfirmDeletion: PropTypes.func,
  onDeleteArticle: PropTypes.func,
  controlledArticleId: PropTypes.number,
  locationState: PropTypes.shape({}).isRequired,
  isMediaArticle: PropTypes.bool.isRequired,
  currentTagUrl: PropTypes.string,
  isWhite: PropTypes.bool,
  withPaperInfo: PropTypes.bool,
  hasTags: PropTypes.bool,
}

Article.defaultProps = {
  modifier: '',
  isWhite: false,
  isHiddenSpecialTag: false,
  isEditable: false,
  isDeletionConfirming: false,
  toggleConfirmDeletion: null,
  onDeleteArticle: null,
  controlledArticleId: null,
  currentTagUrl: null,
  withPaperInfo: true,
  hasTags: true,
}

export default container(Article)
