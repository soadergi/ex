import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'

import { SETTING_OPTION_TYPES } from 'weplay-competitive/constants/MM/settingOptionTypes'

import styles from './styles.scss'

const Option = ({
  // required props
  isActive,
  onClickHandler,
  // optional props
  name,
  type,
  disabled,
}) => {
  const t = useTranslation()

  return (
    <button
      type="button"
      className={classNames(
        styles.settingItem,
        {
          [styles.disabled]: disabled,
          [styles.isActive]: isActive,
        },
      )}
      disabled={disabled}
      onClick={onClickHandler}
    >
      {name && (
        <>
          <div className={styles.center}>
            <h6 className={styles.heading}>
              {type === SETTING_OPTION_TYPES.LADDER ? name : t(`competitive.modals.matchmaking.${name}`)}
            </h6>
            {disabled && <p className={styles.error}>{t('competitive.modals.matchmaking.comingSoon')}</p>}
          </div>
          {isActive && (
          <Icon
            iconName="check"
            className={styles.icon}
          />
          )}
        </>
      )}
    </button>
  )
}

Option.propTypes = {
  // required props
  isActive: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  // optional props
  disabled: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
}

Option.defaultProps = {
  // optional props
  disabled: false,
  name: '',
  type: '',
}

export default Option
