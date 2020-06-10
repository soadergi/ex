import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import Anchor from './Anchor'
import styles from './styles.scss'
import container from './container'

const AnchorMenu = ({
  // required props
  anchors,
  // props from container

  // optional props
  modifiers,
  className,
}) => (
  <div className={classNames(
    styles.block,
    setCSSModifiers(modifiers, styles),
    className,
  )}
  >
    <div className={styles.container}>
      <ul className={styles.list}>
        {anchors.map(anchor => (
          <Anchor
            key={anchor.link}
            anchor={anchor}
          />
        ))}
      </ul>
    </div>
  </div>
)

AnchorMenu.propTypes = {
  // required props
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string,
    amplitudeEvent: PropTypes.string,
  })).isRequired,

  // props from container

  // optional props
  modifiers: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
}

AnchorMenu.defaultProps = {
  // optional props
  modifiers: [],
  className: '',
}

export default container(AnchorMenu)
