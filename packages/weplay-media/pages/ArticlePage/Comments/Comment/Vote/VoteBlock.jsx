import classNames from 'classnames'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'weplay-singleton/RouterProvider/withRouter'
import Icon from 'weplay-components/Icon'
import { getComment, rateComment } from 'weplay-media/reduxs/comments/actions'
import { connect } from 'react-redux'

import styles from './styles.scss'

class VoteBlock extends Component {
  increaseVote = () => {
    const newVote = this.props.myVote === 1 ? 0 : 1
    this.postVoteHandler(newVote, this.props.commentId)
  }

  decreaseVote = () => {
    const newVote = this.props.myVote === -1 ? 0 : -1
    this.postVoteHandler(newVote, this.props.commentId)
  }

  postVoteHandler = (myRate, commentId) => {
    this.props.onPostVote(
      {
        direct: myRate,
        commentId,
        newspaperId: this.props.newspaperId,
      },
    ).then(() => this.props.getComment(commentId))
  }

  render() {
    const { currentUser, rate } = this.props
    return (
      <div className={styles.block}>
        {currentUser
          ? (
            <button
              className={classNames(
                styles.button,
                styles.buttonDown,
              )}
              type="button"
              onClick={this.decreaseVote}
            >
              <Icon
                className={styles.icon}
                iconName="arrow-down-second"
              />
            </button>
          )
          : null}
        <div className={classNames(
          styles.body,
          {
            [styles.positive]: this.props.rate > 0,
            [styles.negative]: this.props.rate < 0,
          },
        )}
        >
          {rate}
        </div>
        {currentUser
          ? (
            <button
              className={classNames(
                styles.button,
                styles.buttonUp,
              )}
              type="button"
              onClick={this.increaseVote}
            >
              <Icon
                className={styles.icon}
                iconName="arrow-down-second"
              />
            </button>
          )
          : null}
      </div>
    )
  }
}

VoteBlock.propTypes = {
  commentId: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  currentUser: PropTypes.shape({}),
  onPostVote: PropTypes.func.isRequired,
  getComment: PropTypes.func.isRequired,
  myVote: PropTypes.number,
  newspaperId: PropTypes.number.isRequired,
}

VoteBlock.defaultProps = {
  currentUser: {},
  myVote: 0,
}

const mapDispatchToProps = {
  onPostVote: rateComment.request,
  getComment: getComment.request,
}

export default withRouter(connect(null, mapDispatchToProps)(VoteBlock))
