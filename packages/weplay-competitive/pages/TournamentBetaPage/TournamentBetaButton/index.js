import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

import container from 'weplay-competitive/pages/TournamentBetaPage/TournamentBetaButton/container'
import { AT__LP_REGISTRATION_BTN } from 'weplay-competitive/analytics/amplitude'

const TournamentBetaButton = ({
  // required props
  content,
  color,
  priority,
  // container props
  handleClick,
  isLoggedIn,

  // optional props
  className,
}) => !isLoggedIn && (
  <Button
    className={classNames(
      className,
    )}
    priority={priority}
    color={color}
    onClick={handleClick}
    {...getAnalyticsAttributes({
      'amplitude-action': AT__LP_REGISTRATION_BTN,
    })}
  >
    {content}
  </Button>
)

TournamentBetaButton.propTypes = {
  // required props
  content: PropTypes.string.isRequired,
  // container props
  isLoggedIn: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,

  // optional props
  className: PropTypes.string,
  color: PropTypes.string,
  priority: PropTypes.string,
}

TournamentBetaButton.defaultProps = {
  // optional props
  className: '',
  color: BUTTON_COLOR.CTA,
  priority: BUTTON_PRIORITY.PRIMARY,
}

export default container(TournamentBetaButton)
