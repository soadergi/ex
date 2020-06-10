import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactResizeDetector from 'react-resize-detector'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'

import container from './container'
import styles from './styles.scss'

const CookiesPolicyPopup = ({
  // props from container
  isPopupVisible,
  closeCookiesPolicyPopup,
  cookiePolicyLink,
  onResize,
}) => {
  const t = useTranslation()

  return (
    <div
      className={classNames(
        styles.cookiesPopup,
        {
          [styles.isShown]: isPopupVisible,
        },
      )}
      id="CookiesPolicyPopup"
    >
      <div className={styles.container}>
        <p className={styles.text}>
          {t('mediaCore.modals.alertPolicy.message')}
          {' '}

          <a
            href={cookiePolicyLink}
            className="u-text-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('mediaCore.modals.alertPolicy.link')}
          </a>
        </p>

        <button
          className={styles.close}
          type="button"
          onClick={closeCookiesPolicyPopup}
          aria-label="close button"
        >
          <Icon
            iconName="close"
            className={styles.closeIcon}
          />
        </button>
      </div>
      <ReactResizeDetector
        handleHeight
        onResize={onResize}
      />
    </div>
  )
}

CookiesPolicyPopup.propTypes = {
  isPopupVisible: PropTypes.bool.isRequired,
  closeCookiesPolicyPopup: PropTypes.func.isRequired,
  cookiePolicyLink: PropTypes.string.isRequired,
  onResize: PropTypes.func.isRequired,
}

export default container(CookiesPolicyPopup)
