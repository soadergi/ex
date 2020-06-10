import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { isCyrillic } from 'weplay-core/helpers/isCyrillic'
import LegacyButton from 'weplay-components/LegacyButton'
import Input from 'weplay-components/Input'

import styles from './styles.scss'
import container from './container'

const PromoCodeForm = ({
  i18nTexts,
  handleChange,
  isCodeValid,
  handleBlur,
  handleKeyDown,
  code,
  activateCode,
  readOnly,
}) => (
  <div className="c-code-data__form">
    <div className="c-code-data__form-wrapper">
      <Input
        className="c-code-data__input"
        placeholder={i18nTexts.promocodes.placeholderText}
        onChange={handleChange}
        onBlur={handleBlur}
        readOnly={readOnly}
        value={code}
        onKeyDown={handleKeyDown}
      />
      <LegacyButton
        className={classNames(
          styles.gradientButton,
          'c-code-data__btn',
        )}
        onClick={activateCode}
        text={i18nTexts.promocodes.btnText}
      />
    </div>
    <span className={`c-code-data__message ${code && !isCodeValid ? 'has-error' : ''}`}>
      {isCyrillic(code) ? i18nTexts.cyrillicError.useLatin : i18nTexts.text.codeIsNotValid}
    </span>
  </div>
)
PromoCodeForm.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  handleChange: PropTypes.func.isRequired,
  isCodeValid: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  activateCode: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,

  readOnly: PropTypes.bool,
}

PromoCodeForm.defaultProps = {
  readOnly: false,
}
export default container(PromoCodeForm)
