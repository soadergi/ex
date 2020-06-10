import React from 'react'

import MenuItem from 'weplay-components/Header/MobileNavigation/MobileMenu/MenuList/MenuItem/MenuItem'

import { projectMenuItems } from 'weplay-media/config/projectMenuItems'
import { useLocalizedMenuItems } from 'weplay-media/hooks/useLocalizedMenuItems'

const MediaMobileMenu = ({ closeMobileMenu }) => {
  const items = useLocalizedMenuItems(projectMenuItems)

  return items.map(({
    text,
    label,
    ...restProps
  }) => (
    <MenuItem
      key={text}
      text={text}
      onClick={closeMobileMenu}
      {...restProps}
    />
  ))
}

export default React.memo(MediaMobileMenu)
