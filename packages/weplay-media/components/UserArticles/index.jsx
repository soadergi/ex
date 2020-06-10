import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Article from 'weplay-components/Article'
import LoadMoreButton from 'weplay-components/LoadMoreButton'

import userArticlesPropType from 'weplay-media/customPropTypes/userArticlesPropType'

import container from './container'
import styles from './styles.scss'

const UserArticles = ({
  // required props
  // props from container
  fetchMoreArticles,
  hasMoreArticles,
  userArticles,
  isLoading,
  deleteArticleById,
  // optional props
  withPaperInfo,
}) => {
  const t = useTranslation()
  return (
    <>
      <div className={styles.block}>
        {userArticles.map(userArticle => (
          <Article
            key={userArticle.id}
            article={userArticle.news}
            modifier="inline"
            controlledArticleId={userArticle.id}
            onDeleteArticle={deleteArticleById}
            isEditable
            withPaperInfo={withPaperInfo}
          />
        ))}
      </div>
      <LoadMoreButton
        isVisible={hasMoreArticles}
        isLoading={isLoading}
        onClick={fetchMoreArticles}
        buttonText={t('mediaCore.button.loadMore')}
      />
    </>
  )
}

UserArticles.propTypes = {
  // required props
  // props from container
  fetchMoreArticles: PropTypes.func.isRequired,
  hasMoreArticles: PropTypes.bool.isRequired,
  userArticles: userArticlesPropType.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deleteArticleById: PropTypes.func.isRequired,
  // optional props
  withPaperInfo: PropTypes.bool,
}

UserArticles.defaultProps = {
  // optional props
  withPaperInfo: true,
}

export default container(UserArticles)
