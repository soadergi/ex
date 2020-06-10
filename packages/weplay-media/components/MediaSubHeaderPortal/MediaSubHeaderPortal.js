import React, { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { isLoggedInSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import { projectMenuItems } from 'weplay-media/config/projectMenuItems'
import { profileMenuItems } from 'weplay-media/config/profileMenuItems'
import Progressbar from 'weplay-media/components/Progressbar'
import { useLocalizedMenuItems } from 'weplay-media/hooks/useLocalizedMenuItems'

import Search from './Search'
import SubHeader from './SubHeader/SubHeader'

const MediaSubHeaderPortal = () => {
  const globalScope = useSelector(globalScopeSelector)
  const isTabletWidth = useSelector(isTabletWidthSelector)
  const isLoggedIn = useSelector(isLoggedInSelector)

  const projectMenuLocalized = useLocalizedMenuItems(projectMenuItems)
  const profileMenuLocalized = useLocalizedMenuItems(profileMenuItems)
  const profileMenu = useMemo(
    () => (isLoggedIn ? profileMenuLocalized : []),
    [isLoggedIn, profileMenuLocalized],
  )

  return createPortal(
    (
      <>
        {!isTabletWidth && (
          <SubHeader
            projectMenu={projectMenuLocalized}
            profileMenu={profileMenu}
          />
        )}
        <Progressbar />
        { isTabletWidth && <Search /> }
      </>
    ),
    globalScope.document.getElementById('StickySectionPortal'),
  )
}

export default React.memo(MediaSubHeaderPortal)
