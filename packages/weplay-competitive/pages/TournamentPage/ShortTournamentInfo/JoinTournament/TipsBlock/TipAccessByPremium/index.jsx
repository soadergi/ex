import React from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import Link from 'weplay-components/Link'

import styles from '../styles.scss'

const TipAccessByPremium = () => {
  const t = useTranslation()

  return (
    t(
      'competitive.tournament.tips.tipAccessByPremium',
      {
        premium: (
          <Link
            to={pathWithParamsByRoute(NAMES.PREMIUM)}
            className={styles.link}
          >
            {t('competitive.tournament.info.premium')}
          </Link>
        ),
      },
    )
  )
}

TipAccessByPremium.propTypes = {
  // required props
  // container props
  // optional props
}

TipAccessByPremium.defaultProps = {
  // optional props
}

export default TipAccessByPremium
