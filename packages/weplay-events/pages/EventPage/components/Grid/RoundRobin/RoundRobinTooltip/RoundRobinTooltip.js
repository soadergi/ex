import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import Tooltip from 'weplay-events/components/Tooltip'

import styles from './RoundRobinTooltip.scss'

const ROUND_ROBIN_TOOLTIP_KEY = 'roundRobinTooltipSeen'

const RoundRobinTooltip = () => {
  const t = useTranslation()
  const globalScope = useSelector(globalScopeSelector)

  const [isClosed, setClosed] = useState(globalScope.localStorage.getItem(ROUND_ROBIN_TOOLTIP_KEY))

  const handleTooltipClose = useCallback(
    () => {
      globalScope.localStorage.setItem(ROUND_ROBIN_TOOLTIP_KEY, '1')
      setClosed(true)
    },
    [globalScope],
  )

  if (isClosed) {
    return null
  }

  return (
    <Tooltip
      handleClick={handleTooltipClose}
      className={styles.tooltip}
      title={t('events.roundRobin.crossTable.howToTooltip.title')}
      text={t('events.roundRobin.crossTable.howToTooltip.text')}
    />
  )
}

export default React.memo(RoundRobinTooltip)
