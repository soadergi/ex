import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import CustomSubMenuItem from '../CustomSubMenuItem'

const SubmenuItem = ({
  text,
}) => {
  const t = useTranslation()

  return (
    <CustomSubMenuItem
      labelColor="magenta"
      labelText={t('events.header.submenu.label')}
      text={text}
    />
  )
}

SubmenuItem.propTypes = {
  text: PropTypes.string.isRequired,
}

export default React.memo(SubmenuItem)
