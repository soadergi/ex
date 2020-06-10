import React from 'react'
import Icon from 'weplay-components/Icon'
import Select from 'weplay-components/Select'
import PropTypes from 'prop-types'
import Checkbox from 'weplay-components/Checkbox'

import IconList from '../IconList'

import container from './container'
import styles from './styles.scss'

const checkboxModifiers = ['noMargin']

const mockCheckboxCount = [0, 1, 2]

const SettingsMenu = ({
  // required props
  settingsName,
  timeIntervalOptions,
  timeInterval,
  onChange,
  placeholder,
  hasInput,
  hasSelect,
  time,
  // container props
  i18nTexts,
  // optional props
}) => (
  <div className={styles.block}>
    <button
      className={styles.name}
      type="button"
    >
      {settingsName}
      <Icon
        iconName="arrow-down-second"
        className={styles.icon}
      />
    </button>
    <div className={styles.settings}>
      {/* TODO: @frontend, it needs a component Input */}
      {hasInput && (
      <input
        className={styles.input}
        placeholder={time}
      />
      )}
      {hasSelect && (
        <Select
          value={timeInterval}
          options={timeIntervalOptions}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      <IconList
        className={styles.iconList}
      />
      <div className={styles.checkboxList}>
        <span className={styles.notAvailable}>{i18nTexts.notificationsSettings.state}</span>
        {mockCheckboxCount.map(() => (
          <Checkbox
            modifiers={checkboxModifiers}
          />
        ))
          }
      </div>
    </div>
  </div>

)

SettingsMenu.propTypes = {
  // required props
  settingsName: PropTypes.string.isRequired,
  timeIntervalOptions: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  timeInterval: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  // container props
  hasInput: PropTypes.bool.isRequired,
  hasSelect: PropTypes.bool.isRequired,
  time: PropTypes.string.isRequired,
  // optional props
}

SettingsMenu.defaultProps = {
  // optional props
}

export default container(SettingsMenu)
