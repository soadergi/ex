import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import config from 'weplay-core/config'

import container from './container'
import styles from './styles.scss'

const LanguageSwitch = ({
  // required props

  // container props
  locale,
  getOnChange,

  // optional props
}) => (
  <div className={styles.block}>
    {config.languages.map(language => (
      <button
        type="button"
        className={classNames(
          styles.button,
          { [styles.isActive]: language === locale },
        )}
        key={language}
        onClick={getOnChange(language)}
      >
        {language}
      </button>
    ))}
  </div>
)

LanguageSwitch.propTypes = {
  // required props

  // container props
  locale: PropTypes.string.isRequired,
  getOnChange: PropTypes.func.isRequired,

  // optional props
}

LanguageSwitch.defaultProps = {
  // optional props
}

export default container(LanguageSwitch)
