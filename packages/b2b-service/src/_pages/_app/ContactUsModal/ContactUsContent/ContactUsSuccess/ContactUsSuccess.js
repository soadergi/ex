import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import classes from './ContactUsSuccess.scss'

const ContactUsSuccess = ({
  onClick,
  isInModal,
}) => {
  const t = useTranslation()
  return (
    <div className={classNames(
      classes.block,
      {
        [classes.borderLess]: isInModal,
      },
    )}
    >
      <h4 className={classes.title}>{t('ContactUsSuccess.title')}</h4>
      <p className={classes.text}>{t('ContactUsSuccess.text')}</p>
      <button
        type="button"
        onClick={onClick}
        className={classes.button}
      >
        {t('ContactUsSuccess.button')}
      </button>
    </div>
  )
}

export default React.memo(ContactUsSuccess)
