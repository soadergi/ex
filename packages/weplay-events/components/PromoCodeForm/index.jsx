import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isCyrillic } from 'weplay-core/helpers/isCyrillic'
import Input from 'weplay-components/Input'

import container from './container'
import styles from './styles.scss'

const PromoCodeForm = ({
  i18nTexts,
  handleChange,
  isCodeValid,
  handleBlur,
  handleKeyDown,
  code,
  activateCode,
}) => (
  <div className={styles.promocodeForm}>
    <div className={styles.promocodeFormWrapper}>
      <Input
        className={classNames(
          styles.promocodeFormInput,
          {
            [styles.hasError]: code && !isCodeValid,
          },
        )}
        placeholder={i18nTexts.promocodes.placeholderText}
        onChange={handleChange}
        onBlur={handleBlur}
        value={code}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className={styles.promocodeFormButton}
        onClick={activateCode}
      >
        <span className={styles.promocodeFormButtonText}>{i18nTexts.artifact.codes.btnText}</span>
      </button>
    </div>
    <span
      className={classNames(
        styles.promocodeFormMessage,
        {
          [styles.hasError]: code && !isCodeValid,
        },
      )}
    >
      {isCyrillic(code)
        ? i18nTexts.cyrillicError.useLatin
        : i18nTexts.text.codeIsNotValid
    }
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
}

PromoCodeForm.defaultProps = {
}
export default container(PromoCodeForm)
