import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Select from '../Select'

import styles from './styles.scss'
import container from './container'

const selectMods = ['dropdown']

const LanguageSwitcher = ({
  locale,
  setLang,
  languageOptions,
  openDirection,
  className,
  isResponsiveLanguageSwitcher,
  color,
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    <Select
      onChange={setLang}
      value={locale}
      options={languageOptions}
      modifiers={selectMods}
      openDirection={openDirection}
      isResponsiveLanguageSwitcher={isResponsiveLanguageSwitcher}
      color={color}
    />
  </div>
)

LanguageSwitcher.propTypes = {
  locale: PropTypes.string.isRequired,
  setLang: PropTypes.func.isRequired,
  languageOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  openDirection: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  isResponsiveLanguageSwitcher: PropTypes.bool,
}

LanguageSwitcher.defaultProps = {
  // default props
  openDirection: '',
  className: '',
  color: '',
  isResponsiveLanguageSwitcher: false,
}

export default container(LanguageSwitcher)
