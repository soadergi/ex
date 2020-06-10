import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const InviteNotification = ({
  closeNotification,
  matchLink,
}) => {
  const t = useTranslation()
  return (
    <>
      <p className={styles.title}>
        {t('Notification.matchCreated.title')}
      </p>
      <p className={classNames(
        styles.text,
        'u-mb-3',
      )}
      >
        {t('Notification.matchCreated.text')}
      </p>
      <Link
        className={styles.button}
        onClick={closeNotification}
        to={matchLink}
      >
        {t('Notification.matchCreated.button')}
      </Link>
    </>
  )
}

InviteNotification.propTypes = {
  closeNotification: PropTypes.func.isRequired,
  matchLink: PropTypes.string.isRequired,

  // optional
}
InviteNotification.defaultProps = {
  // optional
}

export default container(InviteNotification)
