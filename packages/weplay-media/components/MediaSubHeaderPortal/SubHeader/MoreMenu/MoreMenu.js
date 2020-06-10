import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { useToggle } from 'weplay-core/hooks/useModalVisibitity'

import Icon from 'weplay-components/Icon'
import PopupMenu from 'weplay-components/PopupMenu/PopupMenu'

import styles from './styles.scss'

const MoreMenu = ({ items }) => {
  const t = useTranslation()
  const {
    isVisible,
    toggle: toggleMenu,
    close: closeMenu,
  } = useToggle()

  return (
    <button
      type="button"
      className={styles.block}
      onClick={toggleMenu}
    >
      <span>{t('header.moreButton')}</span>
      <span
        className={classNames(
          styles.icon,
          isVisible && styles.isArrowUp,
        )}
      >
        <Icon
          iconName="arrow-down-second"
          size="small"
          className={styles.arrow}
        />
      </span>

      <PopupMenu
        items={items}
        isOpen={isVisible}
        handleClick={closeMenu}
      />
    </button>
  )
}

MoreMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default MoreMenu
