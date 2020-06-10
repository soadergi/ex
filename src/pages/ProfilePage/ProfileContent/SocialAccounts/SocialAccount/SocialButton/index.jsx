import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'

import styles from './styles.scss'
import container from './container'

const SocialButton = ({
  config,
  handleClick,
  isActive,
}) => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      <span>
        <Icon
          className={classNames(
            styles.icon,
            styles[config.socialClass],
          )}
          iconName={config.socialIcon}
        />
        <span className={styles.name}>
          {config.socialName}
        </span>
      </span>
      <label
        htmlFor={`s-${config.socialClass}`}
        className={classNames(
          styles.label,
          { [styles.isActive]: isActive },
        )}
      >
        <input
          type="checkbox"
          id={`s-${config.socialClass}`}
          className={styles.input}
          checked={isActive}
          onChange={handleClick}
        />
        {isActive === false
          ? t('mediaCore.profile.accountSettings.linkSocial')
          : t('mediaCore.profile.accountSettings.unlinkSocial')}
      </label>
    </div>
  )
}

SocialButton.propTypes = {
  config: PropTypes.shape({
    socialClass: PropTypes.string.isRequired,
    socialIcon: PropTypes.string.isRequired,
    socialName: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
}

SocialButton.defaultProps = {
  isActive: false,
}

export default container(SocialButton)
