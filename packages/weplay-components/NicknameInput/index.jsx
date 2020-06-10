import * as R from 'ramda'
import React from 'react'
import * as PropTypes from 'prop-types'
import FieldWrapper from 'weplay-components/FieldWrapper'
import Input from 'weplay-components/Input2'

import PossibleNicknames from './PossibleNicknames/PossibleNicknames'
import container from './container'

const NicknameInput = ({
  nicknameSuccess,
  successText,
  isTouched,
  i18nTexts,
  errors,
  handleNickNameBlur,
  possibleNicknames,
  getNicknameClickHandler,
  label,
  placeholder,
}) => (
  <>
    <FieldWrapper
      label={label}
      isTouched={isTouched}
      errors={errors}
      successText={successText}
      name="nickname"
      labelFor="nickname"
      hasSuccess={nicknameSuccess}
    >
      <Input
        placeholder={placeholder}
        name="nickname"
        isTouched={isTouched}
        errors={errors}
        id="nickname"
        onBlur={handleNickNameBlur}
        hasSuccess={nicknameSuccess}
        autocomplete="nickname"
      />
    </FieldWrapper>
    {!R.isNil(possibleNicknames) && (
      <PossibleNicknames
        possibleNicknames={possibleNicknames}
        onClick={getNicknameClickHandler}
        possibleText={i18nTexts.cabinet.howAbout}
      />
    )}
  </>

)

NicknameInput.propTypes = {
  // required props
  nicknameSuccess: PropTypes.bool.isRequired,
  successText: PropTypes.string.isRequired,
  isTouched: PropTypes.bool,
  i18nTexts: PropTypes.shape({}).isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  handleNickNameBlur: PropTypes.func.isRequired,
  possibleNicknames: PropTypes.arrayOf(PropTypes.shape({})),
  getNicknameClickHandler: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  // container props

  // optional props

}

NicknameInput.defaultProps = {
  // optional props
  isTouched: false,
  errors: null,
  possibleNicknames: [],
  placeholder: '',
}

export default container(NicknameInput)
