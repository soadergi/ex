import React from 'react'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import SocialLinksPropTypes from 'weplay-core/customPropTypes/socialLInksPropType'

import SocialLink from './SocialLink'
import container from './container'
import styles from './styles.scss'

export const SocialLinksMarkup = ({
  // required props
  links,

  // optional props
  modifiers,
  className,
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
          className={styles.item}
          key={link.path}
        >
          <SocialLink
            path={link.path}
            icon={link.icon}
            modifiers={modifiers}
            analyticEventLabel={link.analyticEventLabel}
            position={position}
          />
        </li>
      ))}
    </ul>
  </div>
)

SocialLinksMarkup.propTypes = SocialLinksPropTypes.propTypes

SocialLinksMarkup.defaultProps = SocialLinksPropTypes.defaultProps

export default container(SocialLinksMarkup)
