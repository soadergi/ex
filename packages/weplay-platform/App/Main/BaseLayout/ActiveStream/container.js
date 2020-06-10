import { useMemo } from 'react'
import { NAMES } from 'weplay-core/routes'

import { AllowedPages } from './config'

export const useActiveStream = ({ routeInfo }) => {
  const isAllowedPage = useMemo(
    () => AllowedPages.includes(routeInfo.name),
    [routeInfo.name],
  )

  const modifiers = useMemo(
    () => (routeInfo.name === NAMES.MEDIA ? ['mediaPagePlayer'] : []),
    [routeInfo.name],
  )

  return {
    isAllowedPage,
    modifiers,
  }
}
