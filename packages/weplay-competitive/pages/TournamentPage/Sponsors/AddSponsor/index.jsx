import React from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import SvgIcon from 'weplay-components/SvgIcon'

import styles from './styles.scss'

const AddSponsor = () => {
  const t = useTranslation()

  return (
    <li className={styles.item}>
      <button
        type="button"
        className={styles.button}
      >
        <SvgIcon
          iconName="badge"
          className={styles.icon}
        />
        <span
          className={styles.buttonText}
        >
          {t('competitive.tournament.becomeSponsor')}
        </span>
      </button>
    </li>
  )
}

AddSponsor.propTypes = {
  // required props
  // container props
  // optional props
}

AddSponsor.defaultProps = {
  // optional props
}

export default AddSponsor
