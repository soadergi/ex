import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgIcon from 'weplay-components/SvgIcon'

import styles from './styles.scss'
import container from './container'


const docIds = {
  ru: 'https://weplayhelp.zendesk.com/hc/ru/requests/new',
  en: 'https://weplayhelp.zendesk.com/hc/en-us/requests/new',
}

const getDocLink = (locale, isOld, pressRoom) => {
  if (isOld) {
    return 'https://old.weplay.tv'
  }

  if (pressRoom) {
    return `https://press.weplay.tv/${locale === 'ru' ? '' : locale}`
  }

  return `${docIds[locale]}`
}

const FooterNavItem = ({
  item,
  i18nTexts,
  handleClick,
  currentLanguage,
  currentLanguagePrefix,
}) => (
  <li className={classNames(
    styles.block,
    {
      [styles.feedback]: (item.feedback || item.pressRoom || item.oldWeplay),
    },
  )}
  >
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={
        !item.feedback && !item.oldWeplay && !item.pressRoom
          ? `${currentLanguagePrefix}${item.path}`
          : getDocLink(currentLanguage, item.oldWeplay, item.pressRoom)
      }
      className={classNames(
        styles.link,
      )}
      onClick={handleClick}
    >
      { item.icon && (
        <SvgIcon
          iconName={item.icon}
          className={classNames(
            styles.icon,
            'js-footer-nav-icon-animated',
          )}
        />
      )}
      <span className={classNames(
        styles.text,
        'js-footer-nav-text-animated',
      )}
      >
        { i18nTexts.sidebar[`${item.label}`] }
      </span>
    </a>
  </li>
)

FooterNavItem.propTypes = {
  item: PropTypes.shape({
    feedback: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    oldWeplay: PropTypes.string.isRequired,
    pressRoom: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  handleClick: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  currentLanguagePrefix: PropTypes.string.isRequired,
}

export default container(FooterNavItem)
