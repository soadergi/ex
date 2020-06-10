import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LoadableCopyToClipboard from 'react-copy-to-clipboard'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from '../Icon'

import container from './container'
import styles from './styles.scss'

const CopyLink = ({
  text,
  children,
  modification,
  showTooltip,
  isShown,
  tooltipIcon,
  className,
}) => {
  const t = useTranslation()

  return (
    <span
      className={classNames(
        styles.copyLink,
        styles[modification],
        { [styles.isActive]: isShown },
        className,
      )}
    >
      <LoadableCopyToClipboard
        text={text}
        onCopy={showTooltip}
      >
        <span className={styles.item}>
          {children}
        </span>
      </LoadableCopyToClipboard>

      <span className={styles.tooltip}>
        {tooltipIcon && (
        <Icon
          iconName={tooltipIcon}
          className={styles.tooltipIcon}
        />
        )}
        {t('text.copied')}
      </span>
    </span>
  )
}

CopyLink.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
  modification: PropTypes.oneOf(['', 'copyLinkArticle']),
  showTooltip: PropTypes.func.isRequired,
  isShown: PropTypes.bool.isRequired,
  tooltipIcon: PropTypes.string,
  className: PropTypes.string,
}

CopyLink.defaultProps = {
  tooltipIcon: '',
  modification: '',
  children: null,
  className: '',
}

export default container(CopyLink)
