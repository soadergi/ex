import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import SvgIcon from 'weplay-components/SvgIcon'
import Button, { BUTTON_COLOR, BUTTON_SIZE } from 'weplay-components/Button'

import styles from './TooltipBubble.scss'
import TooltipContent from './TooltipContent/TooltipContent'

const TooltipBubble = ({
  // required props
  tooltip,
  position,
  onCloseButtonClick,
  onLinkClick,
  // container props
  // optional props
}) => {
  const t = useTranslation()
  const [category, name] = tooltip.path.split('/')
  return (
    <div className={classNames(
      styles.tooltip,
      styles[position],
      styles.isActive,
    )}
    >
      {t(`tooltips.${category}.${name}.title`) && (
        <p className={styles.title}>
          {t(`tooltips.${category}.${name}.title`)}
        </p>
      )}

      <p className={styles.text}>
        <TooltipContent
          tooltip={tooltip}
          onLinkClick={onLinkClick}
        />
      </p>

      <div className={classNames(
        styles.footer,
        { [styles.oneBtn]: !tooltip.hasBottomLink }, // Use this class when there is no another link in the .footer
      )}
      >
        {tooltip.hasBottomLink && (
          <Link
            to={t(`tooltips.${category}.${name}.bottomLink.url`)}
            className={styles.link}
          >
            {t(`tooltips.${category}.${name}.bottomLink.text`)}
          </Link>
        )}

        {tooltip.confirmBtn && (
          <Button
            className={styles.button}
            color={BUTTON_COLOR.WHITE}
            size={BUTTON_SIZE.SM}
            onClick={onCloseButtonClick}
          >
            {t('tooltips.commons.ok')}
          </Button>
        )}
      </div>

      <SvgIcon
        className={styles.arrow}
        iconName="triangle"
      />
    </div>
  )
}

TooltipBubble.propTypes = {
  // required props
  tooltip: PropTypes.shape({
    hasBottomLink: PropTypes.bool.isRequired,
    confirmBtn: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  position: PropTypes.oneOf([
    'topStart',
    'topEnd',
    'bottomStart',
    'bottomEnd',
    'leftTop',
    'rightTop',
    'bottomCenter',
  ]).isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  // container props
  // optional props
}

export default React.memo(TooltipBubble)
