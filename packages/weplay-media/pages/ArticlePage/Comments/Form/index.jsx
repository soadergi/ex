import * as R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import rangy from 'rangy'
import 'rangy/lib/rangy-classapplier'
import 'rangy/lib/rangy-highlighter'
import 'rangy/lib/rangy-textrange'
import 'rangy/lib/rangy-serializer'
import classNames from 'classnames'

import UserAvatar from 'weplay-components/UserAvatar'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import RadialSymbolsCounter from './RadialSymbolsCounter'
import container from './container'
import styles from './styles.scss'

const commentConfig = {
  symbolsLimit: 1000,
  showWarningLimit: 50,
}
const CIRCLE_DASHARRAY_LENGTH = 50

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onFocus: false,
      symbolsCount: 0,
      symbolsUnderLimitCount: 0,
      symbolsOverLimitCount: 0,
      symbolsUnderLimitText: '',
      activeSubmitButton: false,
    }
  }

  getOffset = () => {
    const sel = rangy.getSelection()
    const range = sel.getRangeAt(0)

    return {
      offset: range.startOffset,
      node: range.commonAncestorContainer,
    }
  }

  setOffset = (rangeOffset) => {
    let { node, offset } = rangeOffset
    const sel = rangy.getSelection()
    const range = sel.getRangeAt(0)

    if (node.length < offset) {
      // if we should have new node
      // we calculate offset according second node (DEL) and set link for this text node
      // TODO: refactor
      offset -= node.length
      node = node.nextSibling.childNodes[0] // eslint-disable-line
    }
    range.setStartAndEnd(node, offset, offset)
    sel.setSingleRange(range)
  }

  handleBlur = (e) => {
    if (e.target.innerText.length < 1) {
      this.setState({
        onFocus: false,
      })
    }
  }

  handleFocus = () => this.setState({
    onFocus: true,
  });

  handleInputTextVerify = () => {
    const limit = commentConfig.symbolsLimit
    const inputEl = this.inputElement
    const text = inputEl.innerText
    const textLength = inputEl.innerText.length
    const rangeOffset = this.getOffset()

    let activeSubmitButton = false
    let underLimitText = ''
    let overLimitText = ''
    if (this.state.symbolsCount !== textLength) {
      if (textLength > 0 && textLength <= limit) {
        underLimitText = text.substr(0, textLength)
        if (inputEl.querySelector('em')) {
          inputEl.removeChild(inputEl.querySelector('em'))
        }
        activeSubmitButton = true
      } else if (textLength > limit) {
        underLimitText = text.substr(0, limit)
        overLimitText = text.substr(limit, textLength)
        this.setOffset(rangeOffset)
        activeSubmitButton = false
      } else {
        activeSubmitButton = false
      }

      this.setState({
        symbolsCount: textLength,
        symbolsUnderLimitCount: underLimitText.length,
        symbolsOverLimitCount: overLimitText.length,
        symbolsUnderLimitText: underLimitText,
        activeSubmitButton,
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const bodyValue = {
      text: this.state.symbolsUnderLimitText,
      source_type: 'news',
      source_id: this.props.articleId,
      status: 'active',
      language: this.props.currentLanguage,
    }

    if (this.props.parentId) bodyValue.parent = this.props.parentId

    this.props.handleCommentFormSubmit(
      {
        body: bodyValue,
      },
    )

    this.refreshCommentForm()
    this.props.onCloseCommentHandler()
  }

  cancelComment = () => {
    this.refreshCommentForm()
    this.props.onCloseCommentHandler()
    this.props.toggleCommentForm()
  }

  refreshCommentForm = () => {
    this.inputElement.innerText = ''
    this.setState({
      symbolsCount: 0,
      symbolsUnderLimitCount: 0,
      symbolsOverLimitCount: 0,
      symbolsUnderLimitText: '',
      activeSubmitButton: false,
    })
  }

  render() {
    const { i18nTexts, parentId, currentUser } = this.props
    const {
      onFocus, symbolsUnderLimitCount, symbolsOverLimitCount, activeSubmitButton,
    } = this.state

    const strokeDashoffset = CIRCLE_DASHARRAY_LENGTH - ((symbolsUnderLimitCount
      * CIRCLE_DASHARRAY_LENGTH) / commentConfig.symbolsLimit)
    const danger = symbolsOverLimitCount > 0
    let messageCounter = ''
    if (commentConfig.symbolsLimit - symbolsUnderLimitCount < commentConfig.showWarningLimit
      && symbolsOverLimitCount <= 0) {
      messageCounter = `${commentConfig.symbolsLimit - symbolsUnderLimitCount} characters left`
    }
    if (symbolsOverLimitCount > 0) {
      messageCounter = `-${symbolsOverLimitCount} characters`
    }

    return (

      <div className={classNames(
        styles.block,
        {
          [styles.inside]: parentId !== null,
        },
      )}
      >
        <div className="u-mr-2 u-hidden-xs-down">
          <UserAvatar avatar={currentUser.avatar_path} />
        </div>
        <form
          className={styles.form}
          onSubmit={this.handleSubmit}
        >
          <div className={styles.wrapper}>
            <div
              contentEditable="true"
              className={classNames(
                styles.input,
                { [styles.inputPseudoFocus]: onFocus },
              )}
              data-placeholder={i18nTexts.placeholder.yourCommentHere}
              onFocus={this.handleFocus}
              onBlur={e => this.handleBlur(e)}
              onInput={this.handleInputTextVerify}
              ref={(el) => { this.inputElement = el }}
            />
          </div>
          <div className={styles.controls}>
            <RadialSymbolsCounter
              className={classNames(
                styles.radialCounter,
                { [styles.isShown]: onFocus },
              )}
              strokeDashoffset={strokeDashoffset}
              hasLimitedSymbols={danger}
              messageCounter={messageCounter}
            />
            <div className={styles.buttonBlock}>
              <Button
                type="reset"
                onClick={this.cancelComment}
                priority={BUTTON_PRIORITY.GHOST}
              >
                {i18nTexts.button.cancel}
              </Button>
              <Button
                type="submit"
                className="u-ml-2"
                disabled={!activeSubmitButton}
              >
                {parentId ? i18nTexts.button.reply : i18nTexts.button.add}
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  handleCommentFormSubmit: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    avatar_path: PropTypes.string.isRequired,
  }).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  articleId: PropTypes.number.isRequired,

  parentId: PropTypes.string,
  onCloseCommentHandler: PropTypes.func,
  toggleCommentForm: PropTypes.func,
}

Form.defaultProps = {
  parentId: '',
  onCloseCommentHandler: R.always,
  toggleCommentForm: R.always,
}

export default container(Form)
