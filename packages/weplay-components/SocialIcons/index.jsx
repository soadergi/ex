import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'

import SocialIcon from 'weplay-components/SocialIcon'

import styles from './styles.scss'
import container from './container'

const SocialIcons = ({
  // required props
  links,
  color,
  // optional props
  withMarginRight,
  className,
  iconSize,
}) => (
  <ul className={classNames(
    styles.list,
    className,
  )}
  >
    {links.map(link => (
      <li
        className={classNames(
          styles.item,
          { [styles.withMarginRight]: withMarginRight },
        )}
        key={link.url}
      >
        <SocialIcon
          path={link.url}
          icon={link.type}
          size={iconSize}
          color={color}
        />
      </li>
    ))}
  </ul>
)

SocialIcons.propTypes = {
  // required props
  color: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(socialLinkPropType).isRequired,
  // optional props
  withMarginRight: PropTypes.bool,
  className: PropTypes.string,
  iconSize: PropTypes.string,
}

SocialIcons.defaultProps = {
  // optional props
  withMarginRight: false,
  className: '',
  iconSize: '',
}

export default container(SocialIcons)
