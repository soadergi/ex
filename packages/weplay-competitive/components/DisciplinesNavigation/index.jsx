import React from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Wrapper from 'weplay-competitive/components/Wrapper'
import TournamentsRouter from 'weplay-competitive/components/TournamentsRouter'

import styles from './styles.scss'

const DisciplinesNavigation = (
  // required props

  // container props

  // optional props
) => {
  const t = useTranslation()
  return (
    <section className={styles.block}>
      <Wrapper>
        <p className={styles.title}>
          {t('competitive.tournaments.route.title')}
        </p>
        <TournamentsRouter />
      </Wrapper>
    </section>
  )
}

DisciplinesNavigation.propTypes = {
  // required props

  // container props

  // optional props
}

DisciplinesNavigation.defaultProps = {
  // optional props
}

export default DisciplinesNavigation
