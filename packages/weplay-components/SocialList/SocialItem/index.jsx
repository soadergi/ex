import React from 'react'
import PropTypes from 'prop-types'
import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const SocialItem = ({
  link,
  modifiers,
  linkIcon,
}) => (
  <a
    className={classNames(
      styles.link,
      styles[link.type],
      setCSSModifiers(modifiers, styles),
    )}
    href={link.url}
    target="_blank"
    rel="noreferrer noopener"
    {...getAnalyticsAttributes({
      category: 'Social click',
      action: link.title,
      label: link.type,
      position: LOOKUP,
    })}
  >
    <span className={styles.icon}>
      <Icon
        iconName={link.type}
        className={classNames(
          styles[link.type],
        )}
      />
    </span>
    {link.title && (
      <p className={styles.text}>
        <span className={styles.title}>{link.title}</span>
        {link.description && (
          <span className={styles.subTitle}>{link.description}</span>
        )}
      </p>
    )}
    {linkIcon && (
      <span className={styles.icon}>
        <Icon
          iconName={linkIcon}
          className={styles.linkIcon}
        />
      </span>
    )}
  </a>
)

SocialItem.propTypes = {
  link: socialLinkPropType.isRequired,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  linkIcon: PropTypes.string,
}

SocialItem.defaultProps = {
  modifiers: [],
  linkIcon: '',
}

export default container(SocialItem)
