import React, { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Headline from 'weplay-components/HeadLine'
import Icon from 'weplay-components/Icon'
import Image from 'weplay-components/Image'

import classes from './PressContact.scss'

const PressContact = () => {
  const t = useTranslation()
  const title = t('pressRoomPage.pressContact.title')
  const description = t('pressRoomPage.pressContact.description')
  const contacts = useMemo(() => [
    {
      photo: t('pressRoomPage.pressContact.person1.photo'),
      name: t('pressRoomPage.pressContact.person1.name'),
      position: t('pressRoomPage.pressContact.person1.position'),
      email: t('pressRoomPage.pressContact.person1.email'),
    },
    {
      photo: t('pressRoomPage.pressContact.person2.photo'),
      name: t('pressRoomPage.pressContact.person2.name'),
      position: t('pressRoomPage.pressContact.person2.position'),
      email: t('pressRoomPage.pressContact.person2.email'),
    },
    {
      photo: t('pressRoomPage.pressContact.person3.photo'),
      name: t('pressRoomPage.pressContact.person3.name'),
      position: t('pressRoomPage.pressContact.person3.position'),
      email: t('pressRoomPage.pressContact.person3.email'),
    },
  ], [t])
  return (
    <div>
      <Headline
        className="u-text-center"
        title={title}
        text={description}
      />

      <ul className={classes.cards}>
        {contacts.map(card => (
          <li
            className={classes.card}
            key={card.name}
          >
            <Image
              className={classes.image}
              src={card.photo}
              alt={card.name}
            />

            <h3 className={classes.title}>{card.name}</h3>

            <p className={classes.text}>{card.position}</p>

            <a
              href={`mailto:${card.email}`}
              rel="noreferrer noopener"
              className={classes.link}
            >
              <Icon
                iconName="email-filled"
                className="u-mr-1"
              />
              {card.email}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default React.memo(PressContact)
