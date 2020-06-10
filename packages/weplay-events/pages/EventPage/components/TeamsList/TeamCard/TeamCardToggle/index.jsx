import React from 'react'
import { useSelector } from 'react-redux'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'

const TeamCardToggle = ({
  // required props
  handleClick,
  isExpanded,

  // optional props
}) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)

  return (
    <button
      type="button"
      className={classNames(
        styles.block,
        { [styles.isExpanded]: isExpanded },
      )}
      onClick={handleClick}
    >
      {!isMobileWidth && (
        <span>{t('EVENTS.teamToggleButton')}</span>
      )}

      <Icon
        iconName="arrow-expand"
        className={classNames(
          styles.icon,
          { [styles.isExpanded]: isExpanded },
        )}
      />
    </button>
  )
}

TeamCardToggle.propTypes = {
  // required props
  handleClick: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,

  // optional props
}

export default TeamCardToggle
