import React, { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Headline from 'weplay-components/HeadLine'
import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'

import classes from './WeplayPressMaterials.scss'

const WeplayPressMaterials = () => {
  const t = useTranslation()
  const title = t('pressRoomPage.weplayPressMaterials.title')
  const description = t('pressRoomPage.weplayPressMaterials.description')
  const weplayPressMaterialCards = useMemo(() => [
    {
      iconName: t('pressRoomPage.weplayPressMaterials.pressKit.icon'),
      title: t('pressRoomPage.weplayPressMaterials.pressKit.title'),
      url: t('pressRoomPage.weplayPressMaterials.pressKit.url'),
    },
    {
      iconName: t('pressRoomPage.weplayPressMaterials.brandLogos.icon'),
      title: t('pressRoomPage.weplayPressMaterials.brandLogos.title'),
      url: t('pressRoomPage.weplayPressMaterials.brandLogos.url'),
    },
    {
      iconName: t('pressRoomPage.weplayPressMaterials.corporateFactSheets.icon'),
      title: t('pressRoomPage.weplayPressMaterials.corporateFactSheets.title'),
      url: t('pressRoomPage.weplayPressMaterials.corporateFactSheets.url'),
    },
  ], [t])
  return (
    <div className={classes.block}>
      <Headline
        className="u-text-center"
        title={title}
        text={description}
      />

      <ul className={classes.cards}>
        {weplayPressMaterialCards.map(card => (
          <li
            className={classes.card}
            key={card.title}
          >
            <Icon
              iconName={card.iconName}
              className={classes.icon}
            />
            <h3 className={classes.title}>{card.title}</h3>
            <Link
              to={card.url}
              className={classes.link}
            >
              {t('pressRoomPage.weplayMaterialCard.button.text')}
              <Icon
                size="small"
                iconName="arrow-link"
                className="u-ml-1"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WeplayPressMaterials
