import React from 'react'
import { createPortal } from 'react-dom'
import TournamentsSubMenu from 'weplay-competitive/components/TournamentsSubMenu'

import container from './container'

const TournamentsSubMenuPortal = ({
  // required props
  // container props
  globalScope,
  isTablet,
  // optional props
}) => !isTablet && createPortal(
  <TournamentsSubMenu />,
  globalScope.document.getElementById('StickySectionPortal'),
)

export default container(TournamentsSubMenuPortal)
