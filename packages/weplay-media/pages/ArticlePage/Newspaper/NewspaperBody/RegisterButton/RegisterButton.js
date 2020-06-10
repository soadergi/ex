import React, { useCallback } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import useAction from 'weplay-core/helpers/useAction'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { triggerSignUpModal } from 'weplay-core/reduxs/_legacy/modals/actions'

import Button, { BUTTON_COLOR, BUTTON_PRIORITY } from 'weplay-components/Button'

function RegisterButton() {
  const t = useTranslation()
  const { triggerSignUpModalAction } = useAction({ triggerSignUpModalAction: triggerSignUpModal })
  const handleClick = useCallback(triggerSignUpModalAction, [])

  return (
    <div
      {...getAnalyticsAttributes({
        category: 'InfoGraphic',
        action: 'Register',
      })}
    >
      <Button
        color={BUTTON_COLOR.CTA}
        priority={BUTTON_PRIORITY.SECONDARY}
        onClick={handleClick}
      >
        {t('registration.signUpStep1.title')}
      </Button>
    </div>
  )
}

export default React.memo(RegisterButton)
