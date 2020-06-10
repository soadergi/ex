import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Icon from 'weplay-components/Icon'
import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import container from 'weplay-competitive/components/SeoText/container'

import styles from './styles.scss'

const SeoText = ({
  // required props
  children,
  // container props
  isOpened,
  clickHandler,
  // optional props
}) => {
  const t = useTranslation()
  return (
    <div className={classNames(
      styles.block,
      {
        [styles.isOpened]: isOpened,
      },
    )}
    >
      <div className={styles.text}>
        {children}
      </div>

      <Button
        priority={BUTTON_PRIORITY.LINK}
        className={styles.trigger}
        onClick={clickHandler}
        {...isOpened && getAnalyticsAttributes({
          'amplitude-action': LOOKUP,
        })}
      >
        {
          isOpened
            ? t('competitive.seo.titleOpen')
            : t('competitive.seo.titleClose')
        }
        <Icon
          className={styles.icon}
          iconName="arrow-expand"
        />
      </Button>
    </div>
  )
}

SeoText.propTypes = {
  // required props
  children: PropTypes.node.isRequired,
  // container props
  isOpened: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
  // optional props
}

SeoText.defaultProps = {
  // optional props
}

export default container(SeoText)
