import React from 'react'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import GameStats from 'weplay-competitive/components/GameStats'
import warehouseStatisticPropType from 'weplay-competitive/customPropTypes/warehouseStatisticPropType'
import container from 'weplay-competitive/pages/TeamPage/TeamGameCard/container'
import styles from 'weplay-competitive/pages/TeamPage/TeamGameCard/styles'

const TeamGameCard = ({
  statistic,
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <p className={styles.subTitle}>
        {t('competitive.member.overview.performance')}
      </p>
      <GameStats
        statistic={statistic}
      />
    </div>
  )
}

TeamGameCard.propTypes = {
  statistic: warehouseStatisticPropType.isRequired,
}

export default container(TeamGameCard)
