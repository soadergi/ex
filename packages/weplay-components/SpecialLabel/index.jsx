import React from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import container from './container'
import styles from './styles.scss'

const SpecialLabel = ({
  // required props
  // container props

  // optional props

}) => {
  const t = useTranslation()
  return (
    <div className={styles.block}>
      {t('article.specialProject')}
    </div>
  )
}

SpecialLabel.propTypes = {
  // required props
  // container props

  // optional props

}

SpecialLabel.defaultProps = {
  // optional props
}

export default container(SpecialLabel)
