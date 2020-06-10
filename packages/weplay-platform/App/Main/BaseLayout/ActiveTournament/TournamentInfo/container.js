import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { NAMES } from 'weplay-core/routes'

export const useStrokeVisible = ({
  routeInfo,
  isScrolledTop,
}) => {
  const isMobileWidth = useSelector(isMobileWidthSelector)

  const isStrokeVisible = useMemo(
    () => isMobileWidth || (routeInfo.name === NAMES.ROOT && !isScrolledTop),
    [isMobileWidth, isScrolledTop, routeInfo.name],
  )

  return { isStrokeVisible }
}
