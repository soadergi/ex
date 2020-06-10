import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const SubscribeModal = ({
  // required props
  closeModal,
  // container props
  link,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <p className={styles.title}>
        {t('mediaCore.modals.subscribe.title')}
      </p>
      <p className={styles.text}>{t('mediaCore.modals.subscribe.text')}</p>
      <Link
        to={link}
        onClick={closeModal}
        className={styles.button}
      >
        {t('mediaCore.modals.subscribe.button')}
      </Link>
    </div>
  )
}

SubscribeModal.propTypes = {
  // required props
  closeModal: PropTypes.func.isRequired,
  // container props
  link: PropTypes.string.isRequired,
  // optional props
}

SubscribeModal.defaultProps = {
  // optional props
}

export default container(SubscribeModal)
