import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import ShowMoreLink from 'weplay-components/ShowMoreLink'

import styles from './styles.scss'

const SectionBody = ({
  // required props
  children,

  // optional props
  modifiers,
  hasPaddingTop,
  hasPaddingBottom,
  className,
  linkUrl,
  linkText,
}) => (
  <div className={classNames(
    styles.sectionBody,
    {
      [styles.hasPaddingTop]: hasPaddingTop,
      [styles.hasPaddingBottom]: hasPaddingBottom,
      [className]: className,
    },
    setCSSModifiers(modifiers, styles),
  )}
  >
    {children}

    {linkUrl && (
      <div className={styles.container}>
        <ShowMoreLink
          linkUrl={linkUrl}
          linkText={linkText}
        />
      </div>
    )}
  </div>
)

SectionBody.propTypes = {
  // required props
  children: PropTypes.node.isRequired,

  // optional props
  modifiers: PropTypes.arrayOf(PropTypes.string),
  hasPaddingTop: PropTypes.bool,
  hasPaddingBottom: PropTypes.bool,
  className: PropTypes.string,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string,
}

SectionBody.defaultProps = {
  modifiers: [],
  hasPaddingTop: true,
  hasPaddingBottom: true,
  className: '',
  linkUrl: '',
  linkText: '',
}

export default SectionBody
