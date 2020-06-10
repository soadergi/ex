import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

// eslint-disable-next-line max-len
import CustomMobileSubMenuItem from 'weplay-components/Header/MobileNavigation/MobileMenu/MenuList/MenuItem/CustomMobileSubMenuItem'

const MobileMenuItem = ({
  text,
}) => {
  const t = useTranslation()

  return (
    <CustomMobileSubMenuItem
      labelColor="magenta"
      labelText={t('events.header.submenu.label')}
      text={text}
    />
  )
}

MobileMenuItem.propTypes = {
  text: PropTypes.string.isRequired,
}

export default React.memo(MobileMenuItem)
