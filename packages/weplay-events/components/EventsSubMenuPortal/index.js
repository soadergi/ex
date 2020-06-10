import React from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import EventsSubMenu from './EventsSubMenu/EventsSubMenu'

const EventsSubMenuPortal = () => {
  const globalScope = useSelector(globalScopeSelector)
  const isTabletWidth = useSelector(isTabletWidthSelector)

  if (isTabletWidth) return null

  return createPortal(
    <EventsSubMenu />,
    globalScope.document.getElementById('StickySectionPortal'),
  )
}

export default React.memo(EventsSubMenuPortal)
