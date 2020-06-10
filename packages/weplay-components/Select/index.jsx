import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'

import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import Icon from 'weplay-components/Icon'

import { SELECT_SCROLLBAR_MAX_HEIGHT } from './constants'
import Option from './Option'
import container from './container'
import styles from './styles.scss'

const mods = ['dropdown']

const Select = ({
  // required props
  options,
  toggleSelect,
  isOpen,
  openDirection,
  handleChange,
  value,
  // container props

  // optional props
  style,
  className,
  placeholder,
  isDisabled,
  isRight,
  modifiers,
  isResponsiveLanguageSwitcher,
  color,
}) => (
  <div
    className={classNames(
      styles.block,
      styles[openDirection],
      styles[color],
      className,
      {
        [styles.isRight]: isRight,
        [styles.responsiveLanguage]: isResponsiveLanguageSwitcher,
      },
      setCSSModifiers(modifiers, styles),
    )}
  >
    <button
      style={style}
      type="button"
      className={classNames(
        styles.trigger,
        {
          [styles.isDisabled]: isDisabled,
          [styles.open]: isOpen,
        },
        className,
      )}
      onClick={toggleSelect}
    >
      {placeholder}
      <Icon
        iconName="arrow-expand"
        className={styles.icon}
      />
    </button>

    <div
      className={classNames(
        styles.container,
        {
          [styles.isOpen]: isOpen,
        },
      )}
    >

      <div className={styles.wrapper}>
        <Scrollbars
          autoHide
          autoHeight
          autoHeightMax={SELECT_SCROLLBAR_MAX_HEIGHT}
          universal
        >
          <ul className={styles.list}>
            {options.map(option => (
              <Option
                option={option}
                onChange={handleChange}
                value={value}
                key={option.value}
                modifiers={modifiers}
                color={color}
              />
            ))}
          </ul>
        </Scrollbars>
      </div>
    </div>
  </div>
)

Select.propTypes = {
  // required props
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      isActive: PropTypes.bool,
      isDefault: PropTypes.bool,
    }),
  ).isRequired,
  toggleSelect: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  // container props

  // optional props
  style: PropTypes.shape({}),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  isRight: PropTypes.bool,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)),
  openDirection: PropTypes.string,
  color: PropTypes.string,
  isResponsiveLanguageSwitcher: PropTypes.bool,
}

Select.defaultProps = {
  // optional props
  placeholder: '',
  isDisabled: false,
  isRight: false,
  style: null,
  className: '',
  modifiers: [],
  openDirection: '',
  color: '',
  isResponsiveLanguageSwitcher: false,
}

export default container(Select)
