import React, {
  useCallback,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import Tooltip from 'weplay-events/components/Tooltip'

import TooltipSwipeHorizontal from './TooltipSwipeHorizontal'
import styles from './Navigation.scss'

const NEW_NAVIGATION_TOOLTIP_KEY = 'newNavigationTooltipSeen'

const NavigationTooltip = ({ title, text }) => {
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const globalScope = useSelector(globalScopeSelector)

  const [isClosed, setClosed] = useState(globalScope.localStorage.getItem(NEW_NAVIGATION_TOOLTIP_KEY))

  const handleTooltipClose = useCallback(
    () => {
      globalScope.localStorage.setItem(NEW_NAVIGATION_TOOLTIP_KEY, '1')
      setClosed(true)
    },
    [globalScope],
  )

  return (
    <div>
      {!isClosed && (
        <Tooltip
          handleClick={handleTooltipClose}
          className={styles.tooltip}
          title={title}
          text={text}
        />
      )}

      {isMobileWidth && (
        <TooltipSwipeHorizontal />
      )}
    </div>
  )
}

NavigationTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default React.memo(NavigationTooltip)
