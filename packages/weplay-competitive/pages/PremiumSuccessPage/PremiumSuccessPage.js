import * as R from 'ramda'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { goTo, NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { isPremiumSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'
import { PROFILE_PATHS } from 'weplay-core/routes/core'

import UserAvatar from 'weplay-components/UserAvatar'
import PremiumSupportButton from 'weplay-components/PremiumSupportButton/PremiumSupportButton'
import Link from 'weplay-components/Link'
import Tip from 'weplay-components/Tip'
import IsomorphicHead from 'weplay-components/IsomorphicHead'
import Button, { BUTTON_COLOR } from 'weplay-components/Button'

import Wrapper from 'weplay-competitive/components/Wrapper'
import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'
import { defaultDisciplineSelector } from 'weplay-competitive/reduxs/defaultDiscipline/reducer'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

import avatarPlaceholder from './img/avatar-premium-placeholder.svg'
import styles from './styles.scss'

const PremiumSuccessPage = ({
  // required props

  // props from HOCs
  history,
}) => {
  const t = useTranslation()

  const isPremium = useSelector(isPremiumSelector)
  const currentMember = useSelector(currentMemberSelector)
  const defaultDiscipline = useSelector(defaultDisciplineSelector)

  const disciplineName = currentMember?.id === defaultDiscipline?.memberId
    ? defaultDiscipline.name
    : DISCIPLINES |> R.keys |> R.head

  useEffect(() => {
    if (!isPremium) {
      goTo({
        name: NAMES.PREMIUM,
        history,
        method: 'replace',
      })
    }
  }, [history, isPremium])

  return (
    <Wrapper
      className={classNames(
        styles.block,
        'u-text-center',
      )}
    >
      <IsomorphicHead>
        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </IsomorphicHead>
      <h1
        className={styles.title}
        data-qa-id={dataQaIds.pages[NAMES.PREMIUM_SUCCESS].container}
      >
        {t('competitive.premium.success.page.title')}
      </h1>
      <p className="u-mb-3 u-mb-sm-6">
        {t('competitive.premium.success.page.text')}
      </p>
      <div className="u-mb-3">
        <div className={styles.premium}>
          <UserAvatar
            avatar={currentMember?.user?.avatar ?? avatarPlaceholder}
            isPlaceholderDark
            isPremiumAccount
            size="128"
          />
        </div>
      </div>
      <div data-event-amplitude-source="Premium Success">
        {/* TODO: @Irina please add possibility to have white text inside without BUTTON_COLOR.BLACK */}
        <Button
          color={BUTTON_COLOR.BLACK}
          className={classNames(
            styles.btn,
            'u-mb-2',
            'u-mr-sm-2',
          )}
          href={pathWithParamsByRoute(
            NAMES.TOURNAMENTS,
            {
              discipline: disciplineName,
            },
          )}
        >
          {t('competitive.premium.success.page.button')}
        </Button>
        <PremiumSupportButton />
        <Tip>
          {t('competitive.premium.success.page.tip')}
          {' '}
          <Link to={pathWithParamsByRoute(NAMES.PROFILE, { section: PROFILE_PATHS.PREMIUM_SUBSCRIPTION })}>
            {t('competitive.premium.success.page.link')}
          </Link>
        </Tip>
      </div>
    </Wrapper>
  )
}

PremiumSuccessPage.propTypes = {
  // required props

  // props from HOCs
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

PremiumSuccessPage.defaultProps = {
  // optional props
}

export default PremiumSuccessPage
