import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const PlayerToggle = ({
  // required props
  handleClick,
  isExpanded,

  // container props
  i18nTexts,

  // optional props
}) => (
  <button
    type="button"
    className={styles.block}
    onClick={handleClick}
  >
    <span>{i18nTexts.EVENTS.playerToggleButton}</span>
    <Icon
      iconName="arrow-down-second"
      size="small"
      className={classNames(
        styles.icon,
        { [styles.isExpanded]: isExpanded },
      )}
    />
  </button>
)

PlayerToggle.propTypes = {
  // required props
  handleClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
}

export default container(PlayerToggle)
