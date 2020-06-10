import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Wrapper from 'weplay-competitive/components/Wrapper'

import styles from './styles.scss'

const EmptyStatistics = ({
  // required props
  // optional props
}) => {
  const t = useTranslation()

  return (
    <Wrapper>
      <div className={styles.block}>
        <img
          src="https://static-prod.weplay.tv/2020-03-05/7180ff952f7762f73d9c2141087f458d.465260-E3E3F2-ABBAC4.png"
          alt=""
        />
        <p className={styles.title}>
          {t('competitive.matchmaking.emptyStatistics')}
        </p>
      </div>
    </Wrapper>
  )
}

EmptyStatistics.propTypes = {
  // required props
  // optional props
}

EmptyStatistics.defaultProps = {
  // optional props
}

export default EmptyStatistics
