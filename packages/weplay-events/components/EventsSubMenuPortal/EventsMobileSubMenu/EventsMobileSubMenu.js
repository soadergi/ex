import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import MenuItem from 'weplay-components/Header/MobileNavigation/MobileMenu/MenuList/MenuItem/MenuItem'

import headerMenu from '../config'

function EventsMobileSubMenu({ closeMobileMenu }) {
  const t = useTranslation()

  return headerMenu.map(({ text, ...restProps }) => (
    <MenuItem
      key={text}
      text={t(text)}
      onClick={closeMobileMenu}
      {...restProps}
    />
  ))
}

export default React.memo(EventsMobileSubMenu)
