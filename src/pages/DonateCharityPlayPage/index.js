import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useLocation } from 'weplay-singleton/RouterProvider/useLocation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'
import { NAMES, goTo } from 'weplay-core/routes'
import withPageViewAnalytics from 'weplay-core/HOCs/withPageViewAnalytics'
import { LOCAL_STORAGE_KEYS, DONATE_SUCCESS_VALUE } from 'weplay-core/consts/localStorageKeys'

import PageHelmet from 'weplay-components/PageHelmet'
import Section from 'weplay-components/_wrappers/Section'

import Wrapper from 'weplay-events/components/Wrapper'

import ResultsTable from './ResultsTable'
import CharityPlayBlock from './CharityPlayBlock/CharityPlayBlock'

const ogImage = 'https://static-prod.weplay.tv/2020-03-19/b6b399896ade43194c7083a30f82c7f4.0B325B-39A7D7-5C7894.jpeg'

const SUCCESS_DONATE_PAGE_PATH = 'donate-we-save/success-donate'

const DonateCharityPlayPage = ({ history }) => {
  const globalScope = useSelector(globalScopeSelector)
  const location = useLocation()
  const { pathname } = location

  const isSuccessPage = useMemo(() => pathname.includes(SUCCESS_DONATE_PAGE_PATH), [pathname])

  const hasMakeDonationAlready = useMemo(
    () => globalScope.localStorage.getItem(LOCAL_STORAGE_KEYS.DONATE_SUCCESS) === DONATE_SUCCESS_VALUE,
    [globalScope],
  )

  useEffect(() => {
    if (isSuccessPage && !hasMakeDonationAlready) {
      goTo({
        name: NAMES.DONATE_CHARITY_PLAY,
        history,
        method: 'replace',
      })
    }
  }, [])

  if (isSuccessPage && !hasMakeDonationAlready) {
    return null
  }

  return (
    <div>
      <PageHelmet
        localiseProject="mediaCore"
        ogImage={ogImage}
      />

      <CharityPlayBlock
        shareButtonsImage={ogImage}
        isSuccessPage={isSuccessPage}
      />
      <Wrapper
        className="u-pb-8"
        hasDisableFlexbox
      >
        <Section
          id="charity"
          className="u-pt-3"
          data-qa-id={dataQaIds.pages[NAMES.DONATE_CHARITY_PLAY].container}
        >
          <ResultsTable />
        </Section>
      </Wrapper>
    </div>
  )
}

DonateCharityPlayPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
}

export default withPageViewAnalytics()(React.memo(DonateCharityPlayPage))
