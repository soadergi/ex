import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import imgPropType from 'weplay-core/customPropTypes/imgPropType'

import Avatar from 'weplay-components/Avatar'
import TextMessage from 'weplay-components/TextMessage'
import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './styles.scss'

const EmptyState = ({
  // required props
  text,
  avatar,
  // props from container
  // optional props
  successContent,
  textButton,
  isHorizontal,
  onClickHandler,
  errorContent,
  className,
}) => (
  <div className={classNames(
    styles.empty,
    className,
    {
      [styles.horizontal]: isHorizontal,
    },
  )}
  >
    <div className={styles.header}>
      <Avatar
        avatar={avatar}
        className={styles.avatar}
        size="64"
      />
      <p className={styles.text}>{text}</p>
    </div>
    {successContent && (
      <TextMessage
        isSuccess
        className="u-mb-2"
      >
        {successContent}
      </TextMessage>
    )}
    {errorContent && (
      <TextMessage
        isError
        className="u-mb-2"
      >
        {errorContent}
      </TextMessage>
    )}

    {textButton && isHorizontal && (
    <Button
      priority={BUTTON_PRIORITY.SECONDARY}
      onClick={onClickHandler}
    >
      {textButton}
    </Button>
    )}
    {textButton && !isHorizontal && (
    <Button
      color={BUTTON_COLOR.CTA}
      onClick={onClickHandler}
    >
      {textButton}
    </Button>
    )}
  </div>
)

EmptyState.propTypes = {
  // required props
  text: PropTypes.string.isRequired,
  // props from container

  // optional props
  avatar: imgPropType.isRequired,
  textButton: PropTypes.string,
  isHorizontal: PropTypes.bool,
  onClickHandler: PropTypes.func,
  successContent: PropTypes.node,
  errorContent: PropTypes.node,
  className: PropTypes.string,
}

EmptyState.defaultProps = {
  // optional props
  textButton: '',
  isHorizontal: false,
  errorContent: null,
  successContent: null,
  onClickHandler: () => {},
  className: '',
}

export default EmptyState
