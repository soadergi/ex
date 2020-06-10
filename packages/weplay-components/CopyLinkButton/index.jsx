import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LoadableCopyToClipboard from 'react-copy-to-clipboard'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import LegacyButton from 'weplay-components/LegacyButton'

import Icon from '../Icon'

import styles from './styles.scss'

const VISIBILITY_DURATION = 2000

const CopyLinkButton = ({
  text,
  copyLink,
  tooltipIcon,
  className,
}) => {
  const t = useTranslation()
  const [isShown, toggleTooltip] = useState(false)

  useEffect(() => {
    if (isShown) {
      const timeoutId = setTimeout(() => toggleTooltip(false), VISIBILITY_DURATION)
      return () => { clearTimeout(timeoutId) }
    }
    return () => {}
  }, [isShown])

  return (
    <LoadableCopyToClipboard
      text={copyLink}
      onCopy={() => toggleTooltip(true)}
      className={classNames(
        styles.copyBtn,
        { [styles.isActive]: isShown },
        className,
      )}
    >
      <LegacyButton>
        {text}
        <span className={styles.tooltip}>
          {tooltipIcon && (
          <Icon
            iconName={tooltipIcon}
            className={styles.tooltipIcon}
          />
          )}
          {t('text.copied')}
        </span>
      </LegacyButton>
    </LoadableCopyToClipboard>
  )
}

CopyLinkButton.propTypes = {
  text: PropTypes.string.isRequired,
  copyLink: PropTypes.string.isRequired,
  className: PropTypes.string,
  tooltipIcon: PropTypes.string,
}

CopyLinkButton.defaultProps = {
  className: '',
  tooltipIcon: '',
}

export default CopyLinkButton
