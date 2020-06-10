import React from 'react'
import PropTypes from 'prop-types'

import DeleteCommentModal from './DeleteCommentModal'
import Filters from './Filters'
import Comment from './Comment'
import Form from './Form/loadable'
import UnauthCommentsBlock from './UnauthCommentsBlock'
import container from './container'
import styles from './styles.scss'

const Comments = ({
  // required props
  articleId,
  commentIds,
  count,
  sort,
  toggleCommentsVisibility,
  newspaperId,
  handleGetComments,
  // container props
  hideDeleteCommentModal,
  showDeleteCommentModal,
  commentToDelete,
  isLoggedIn,
  i18nTexts,
  handleSortComments,
}) => (
  <div className={styles.block}>
    <div className={styles.header}>
      <h3 className={styles.title}>
        {`${i18nTexts.title.liveThread} `}
        <span className={styles.counter}>
          {count}
        </span>
      </h3>
      <Filters
        value={sort}
        onChange={handleSortComments}
      />
    </div>

    <div className={styles.comments}>
      {commentIds.map(commentId => (
        <Comment
          key={commentId}
          id={commentId}
          articleId={articleId}
          parentId={commentId}
          answer={false}
          sort={sort}
          onOpenDeleteComment={showDeleteCommentModal}
          newspaperId={newspaperId}
          handleGetComments={handleGetComments}
        />
      ))}

      {isLoggedIn ? (
        <Form
          newspaperId={newspaperId}
          parentId={null}
          articleId={articleId}
          toggleCommentForm={toggleCommentsVisibility}
          handleGetComments={handleGetComments}
        />
      ) : (
        <UnauthCommentsBlock />
      )}
    </div>
    <DeleteCommentModal
      newspaperId={newspaperId}
      commentToDelete={commentToDelete}
      hideDeleteCommentModal={hideDeleteCommentModal}
    />
  </div>
)

Comments.propTypes = {
  // required props
  articleId: PropTypes.number.isRequired,
  commentIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  count: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
  toggleCommentsVisibility: PropTypes.func.isRequired,
  // container props
  hideDeleteCommentModal: PropTypes.func.isRequired,
  showDeleteCommentModal: PropTypes.func.isRequired,
  commentToDelete: PropTypes.shape({}), // TODO: comment prop type
  isLoggedIn: PropTypes.bool.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  handleSortComments: PropTypes.func.isRequired,
  newspaperId: PropTypes.number.isRequired,
  handleGetComments: PropTypes.func.isRequired,
}

Comments.defaultProps = {
  commentToDelete: null,
}

export default container(Comments)
