import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import Header from 'weplay-components/_modal-components/Header'

const ChangeEmailHeader = ({
  step,
}) => {
  const t = useTranslation()

  return (
    <Header
      title={t(`mediaCore.modals.changeEmailModal.${step}.title`)}
      subtitle={t(`mediaCore.modals.changeEmailModal.${step}.subTitle`)}
    />
  )
}

ChangeEmailHeader.propTypes = {
  step: PropTypes.string.isRequired,
}

export default ChangeEmailHeader
