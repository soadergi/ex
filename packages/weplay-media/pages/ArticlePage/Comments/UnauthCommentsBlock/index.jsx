import React from 'react'
import PropTypes from 'prop-types'
import SvgIcon from 'weplay-components/SvgIcon'
import MessageBlock from 'weplay-media/components/MessageBlock'

import container from './container'

const UnauthCommentsBlock = ({
  // required props
  // container props
  i18nTexts,
  openLoginModal,
  triggerSignUpModal,
  // optional props
}) => (
  <MessageBlock
    className="u-mb-4"
    icon={iconClassName => (
      <SvgIcon
        iconName="comments"
        type="color"
        className={iconClassName}
      />
    )}
    text={messageLinkClassName => (
      <>
        {i18nTexts.comments.message}
        <span
          className={messageLinkClassName}
          onClick={openLoginModal}
        >
          {` ${i18nTexts.comments.signIn} `}
        </span>
        {i18nTexts.comments.or}
        <span
          className={messageLinkClassName}
          onClick={triggerSignUpModal}
        >
          {` ${i18nTexts.comments.reg} `}
        </span>
      </>
    )}
  />
)

UnauthCommentsBlock.propTypes = {
  // required props
  // container props
  openLoginModal: PropTypes.func.isRequired,
  triggerSignUpModal: PropTypes.func.isRequired,
  // optional props
}

UnauthCommentsBlock.defaultProps = {
  // optional props
}

export default container(UnauthCommentsBlock)
