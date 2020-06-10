import React, { useMemo } from 'react'
import TextTile from 'components/TextTile/TextTile'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import classes from './ServiceSubMenu.scss'

const ServiceSubMenu = ({
  services,
  actionButton,
}) => {
  const t = useTranslation()
  const translatedServices = useMemo(() => services.map(service => ({
    linkPath: service.linkPath,
    title: t(service.serviceTitleKey),
    text: t(service.serviceDescriptionKey),
  })), [services, t])
  return (
    <ul className={classes.block}>
      {translatedServices.map(service => (
        <TextTile
          key={service.serviceTitleKey}
          item={service}
        />
      ))}
      {actionButton}
    </ul>
  )
}

export default React.memo(ServiceSubMenu)
