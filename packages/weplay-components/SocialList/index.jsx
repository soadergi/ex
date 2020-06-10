import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import SocialItem from './SocialItem'
import styles from './styles.scss'
import container from './container'

const mods = [
  'light',
  'videos',
  'greyBackground',
]

const SocialList = ({
  // required props
  links,
  // optional props
  modifiers,
  className,
  linkIcon,
  // analytic
  position,
}) => (
  <div className={classNames(
    styles.block,
    setCSSModifiers(modifiers, styles),
    className,
  )}
  >
    <ul className={styles.list}>
      {links.map(link => (
        <li
          key={link.title}
          className={styles.item}
        >
          <SocialItem
            link={link}
            modifiers={modifiers}
            position={position}
            linkIcon={linkIcon}
          />
        </li>
      ))}
    </ul>
  </div>
)

SocialList.propTypes = {
  // required props
  links: PropTypes.arrayOf(socialLinkPropType).isRequired,
  // optional props
  modifiers: PropTypes.arrayOf(
    PropTypes.oneOf(mods),
  ),
  className: PropTypes.string,
  // analytic
  position: PropTypes.string,
  linkIcon: PropTypes.string,
}

SocialList.defaultProps = {
  modifiers: [],
  className: '',
  position: '',
  linkIcon: '',
}

export default container(SocialList)
