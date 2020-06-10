import React from 'react'
import PropTypes from 'prop-types'

import CopyLink from 'weplay-components/CopyLink/loadable'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const CopyLinkBanner = ({
  // required props
  linkUrl,
  linkText,
  messageText,
  imageUrl,

  // container props

  // optional props
}) => (
  <div className={styles.block}>
    <div className={styles.container}>
      <figure className={styles.decorImage}>
        <img
          src={imageUrl}
          alt="Scroll"
          className="o-img-responsive"
        />
      </figure>

      <p className={styles.message}>
        <Icon
          iconName="link"
          className={styles.chain}
        />

        {messageText}

        <CopyLink
          text={linkUrl}
          tooltipIcon="check"
          className={styles.copyLink}
        >
          {linkText}
        </CopyLink>
      </p>
    </div>
  </div>
)

CopyLinkBanner.propTypes = {
  // required props
  linkUrl: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  messageText: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,

  // container props

  // optional props
}

CopyLinkBanner.defaultProps = {
  // optional props
}

export default container(CopyLinkBanner)
