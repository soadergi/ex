import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import LocalizedMoment from 'weplay-components/LocalizedMoment'
import Button from 'weplay-components/Button'
import UserAvatar from 'weplay-components/UserAvatar'
import SlideToggle from 'weplay-components/SlideToggle'

import { SORT } from '../Filters/consts'
import Form from '../Form/loadable'

import container from './container'
import VoteBlock from './Vote/VoteBlock'
import styles from './styles.scss'

class Comment extends Component {
  static Recursive = container(Comment)

  render() {
    const {
      item,
      articleId,
      parentId,
      answer,
      sort,

      i18nTexts,
      currentUser,
      isLoggedIn,
      onOpenDeleteComment,

      commentFormVisible,
      hideCollapse,
      onOpenCommentHandler,
      onCloseCommentHandler,
      handleOpenCollapse,
      saveCommentRef,
      newspaperId,
      handleGetComments,
    } = this.props

    const childsComments = item.childs ?? []
    const collapsedChildren = childsComments.slice(0, childsComments.length - 1)

    return (
      <div
        ref={saveCommentRef}
        className={classNames(
          styles.block,
          {
            [styles.inside]: answer,
          },
        )}
      >
        {item.status === 'deleted' || item.status === 'deleted_by_admin' || item.removedStatus
          ? (
            <>
              <div className={styles.info}>
                <div className={styles.placeholder}>
                  <span className={styles.placeholderAvatar} />
                  <div className={styles.placeholderContent}>
                    <p className={styles.placeholderMessage}>
                      {(item.status === 'deleted') && i18nTexts.comments.deletedByUser}
                      {(item.status !== 'deleted') && item.removedStatus && i18nTexts.comments.yourCommentDeleted}
                      {(item.status !== 'deleted') && !item.removedStatus && i18nTexts.comments.deletedByAdmin}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )
          : (
            <>
              <div className={styles.info}>
                <UserAvatar
                  avatar={item.avatarPath}
                  className="u-mr-2"
                />
                <div className={styles.commentBlock}>
                  <div className={styles.name}>
                    {item.username}
                  </div>
                  <div className={styles.date}>
                    <time className={styles.time}>
                      <LocalizedMoment
                        dateTime={item.createdDate}
                        formatKey="24h"
                      />
                    </time>
                    <LocalizedMoment
                      dateTime={item.createdDate}
                      formatKey="short"
                    />
                  </div>
                </div>
              </div>

              <div className={styles.content}>
                <p className={styles.text}>
                  {item.text}
                </p>
              </div>
              <div className={styles.controls}>
                <div className={styles.controlsBlock}>
                  {isLoggedIn && (
                    <>
                      <Button
                        className={styles.controlsButton}
                        onClick={onOpenCommentHandler}
                      >
                        {i18nTexts.button.reply}
                      </Button>
                      { item.userId === currentUser.id
                        ? (
                          <Button
                            className={styles.controlsButton}
                            onClick={() => onOpenDeleteComment(item)}
                          >
                            {i18nTexts.button.delete}
                          </Button>
                        )
                        : null}
                    </>
                  )}
                </div>
                <VoteBlock
                  rate={item.rating}
                  commentId={item.id}
                  currentUser={currentUser}
                  myVote={item.myVote}
                  newspaperId={newspaperId}
                />
              </div>
              { commentFormVisible && isLoggedIn && (
              <Form
                onCloseCommentHandler={onCloseCommentHandler}
                parentId={parentId}
                articleId={articleId}
                newspaperId={newspaperId}
                handleGetComments={handleGetComments}
              />
              )}
            </>
          )}

        {
          (collapsedChildren.length && !hideCollapse && sort === SORT.POPULAR
            ? (
              <>
                <SlideToggle
                  onExpanded={handleOpenCollapse}
                  collapsed
                >
                  {({ onToggle, setCollapsibleElement }) => (
                    <div className={styles.collapsible}>
                      <div
                        className={styles.collapsibleBlock}
                        ref={setCollapsibleElement}
                      >
                        <div className={styles.collapsibleContent}>
                          {collapsedChildren.map(childItem => (
                            <Comment.Recursive
                              key={childItem.id}
                              item={childItem}
                              articleId={articleId}
                              parentId={item.id}
                              childs={childItem.childs}
                              answer
                              onOpenDeleteComment={onOpenDeleteComment}
                              handleGetComments={handleGetComments}
                              newspaperId={newspaperId}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="c-comments__more c-comments__more--inside">
                        <button
                          type="button"
                          onClick={onToggle}
                          className="c-comments__more-button"
                        >
                          <span className="c-comments__more-text">
                            <span className="c-comments__more-link u-mx-1">{i18nTexts.comments.showComments}</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </SlideToggle>
                <Comment.Recursive
                  id={item.id}
                  articleId={articleId}
                  parentId={item.id}
                  childs={null}
                  answer
                  onOpenDeleteComment={onOpenDeleteComment}
                  handleGetComments={handleGetComments}
                />
              </>
            )
            : (
              <div className="c-comments__list">
                {childsComments.map(childItem => (
                  <Comment.Recursive
                    key={childItem.id}
                    id={childItem.id}
                    articleId={articleId}
                    parentId={item.id}
                    childs={null}
                    answer
                    onOpenDeleteComment={onOpenDeleteComment}
                    currentUser={currentUser}
                    handleGetComments={handleGetComments}
                  />
                ))}
              </div>
            ))
        }
      </div>

    )
  }
}

Comment.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    status: PropTypes.string,
    removedStatus: PropTypes.bool,
    avatarPath: PropTypes.string,
    createdDate: PropTypes.string,
    text: PropTypes.string,
    myVote: PropTypes.number,
    rating: PropTypes.number,
    username: PropTypes.string,
    userId: PropTypes.number,
    childs: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
    })),
  }).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  articleId: PropTypes.number.isRequired,
  sort: PropTypes.string,
  answer: PropTypes.bool.isRequired,
  parentId: PropTypes.string.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  onOpenDeleteComment: PropTypes.func.isRequired,

  commentFormVisible: PropTypes.bool.isRequired,
  hideCollapse: PropTypes.bool.isRequired,
  onOpenCommentHandler: PropTypes.func.isRequired,
  onCloseCommentHandler: PropTypes.func.isRequired,
  handleOpenCollapse: PropTypes.func.isRequired,
  saveCommentRef: PropTypes.func.isRequired,
  newspaperId: PropTypes.number.isRequired,
  handleGetComments: PropTypes.func.isRequired,
}

Comment.defaultProps = {
  currentUser: {},
  sort: '',
}

export default container(Comment)
