import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const TeamCardToggle = ({
  // required props
  handleClick,
  isExpanded,

  // container props
  i18nTexts,

  // optional props
}) => (
  <button
    type="button"
    data-event-action="team-card click"
    className={classNames(
      styles.block,
      { [styles.isExpanded]: isExpanded },
    )}
    onClick={handleClick}
  >
    <span>{i18nTexts.EVENTS.teamToggleButton}</span>
    <Icon
      iconName="arrow-expand"
      className={classNames(
        styles.icon,
        { [styles.isExpanded]: isExpanded },
      )}
    />
  </button>
)

TeamCardToggle.propTypes = {
  // required props
  handleClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
}

export default container(TeamCardToggle)
