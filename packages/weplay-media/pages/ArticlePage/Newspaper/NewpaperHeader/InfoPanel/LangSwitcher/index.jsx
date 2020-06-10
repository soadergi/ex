import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import getFlagURLByCountryCode from 'weplay-core/helpers/getFlagURLByCountryCode'

import Image from 'weplay-components/Image'

import container from './container'
import styles from './styles.scss'

const LangSwitcher = ({
  translates,
  setLang,
  className,
}) => (
  <div className={classNames(
    styles.block,
    className,
  )}
  >
    {translates.map(lang => (
      <button
        className={styles.button}
        type="button"
        key={lang}
        onClick={() => {
          setLang(lang)
        }}
      >
        <Image
          src={getFlagURLByCountryCode(lang)}
          alt={lang}
          className={styles.icon}
        />
      </button>
    ))}
  </div>
)

LangSwitcher.propTypes = {
  translates: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLang: PropTypes.func.isRequired,
  className: PropTypes.string,
}

LangSwitcher.defaultProps = {
  className: '',
}

export default container(LangSwitcher)
