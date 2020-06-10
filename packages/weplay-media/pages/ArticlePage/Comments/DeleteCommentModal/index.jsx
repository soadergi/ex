import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ModalBase from 'weplay-components/ModalBase'
import ModalControls from 'weplay-components/_modal-components/ModalControls'
import Header from 'weplay-components/_modal-components/Header'

import container from './container'

// TODO: @frontend, this component needs refactoring

const cancelButtonModifiers = ['blockBorderBlue', 'blockWide']
const deleteButtonModifiers = ['blockDanger', 'blockWide']
class DeleteCommentModal extends Component {
  handleDeleteComment = () => {
    this.props.hideDeleteCommentModal()
    const bodyValue = {
      status: 'deleted',
    }
    this.props.handleDeleteComment({
      id: this.props.commentToDelete.id,
      body: bodyValue,
    })
  };

  render() {
    const { i18nTexts, hideDeleteCommentModal, commentToDelete } = this.props
    if (!commentToDelete || Object.keys(commentToDelete).length < 1) return null
    return (
      <ModalBase
        handleClose={hideDeleteCommentModal}
        isShown={commentToDelete}
      >
        <div data-gtm="Are you sure that you want to delete the comment?">
          <div>
            <Header
              title={i18nTexts.deleteComment.title}
              titleAlign="center"
            />
          </div>
          <ModalControls
            primaryButtonType="submit"
            secondaryButtonText={i18nTexts.deleteComment.yes}
            primaryButtonText={i18nTexts.deleteComment.cancel}
            primaryButtonCallback={hideDeleteCommentModal}
            primaryButtonModifiers={cancelButtonModifiers}
            secondaryButtonModifiers={deleteButtonModifiers}
            secondaryButtonCallback={this.handleDeleteComment}
          />
        </div>
      </ModalBase>
    )
  }
}

DeleteCommentModal.propTypes = {
  hideDeleteCommentModal: PropTypes.func.isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  commentToDelete: PropTypes.shape({
    id: PropTypes.string,
    avatarPath: PropTypes.string,
    username: PropTypes.string,
    createdDate: PropTypes.string,
    text: PropTypes.string,
  }),
}

DeleteCommentModal.defaultProps = {
  commentToDelete: {},
}

export default container(DeleteCommentModal)
