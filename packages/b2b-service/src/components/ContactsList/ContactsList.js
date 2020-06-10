import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import classes from './ContactsList.scss'

const ContactsList = ({
  list,
}) => {
  const t = useTranslation()
  return list.map(item => (
    <div className={classes.block}>
      <h3 className={classes.officesTitle}>{t(item.titleKey)}</h3>
      {item.adressKey && (
      <p className={classes.text}>{t(item.adressKey)}</p>
      )}
      {item.phoneKey && (
      <p className={classes.text}>{t(item.phoneKey)}</p>
      )}
      <p>
        <a
          href={`mailto:${t(item.emailKey)}`}
          rel="noreferrer noopener"
          className={classes.link}
        >
          {t(item.emailKey)}
        </a>
      </p>
    </div>
  ))
}

export default React.memo(ContactsList)
