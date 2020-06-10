import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import Button from 'weplay-components/Button'

import container from 'weplay-competitive/pages/ZenDeskVerifyPage/container'

import styles from './styles.scss'

const ZenDeskVerifyPage = ({
  // required props

  // container props
  handleClickLoginButton,
  background,
  // optional props

}) => {
  const t = useTranslation()

  return (
    <div
      className={styles.block}
      style={background}
      data-qa-id={dataQaIds.pages[NAMES.ZENDESK_VERIFY].container}
    >
      <p className={styles.title}>{t('competitive.zenDesk.title')}</p>
      <p className={styles.subTitle}>{t('competitive.zenDesk.description')}</p>
      <Button
        onClick={handleClickLoginButton}
      >
        {t('competitive.zenDesk.buttonText')}
      </Button>
    </div>
  )
}

ZenDeskVerifyPage.propTypes = {
  // required props

  // container props
  handleClickLoginButton: PropTypes.func.isRequired,
  background: PropTypes.shape({}).isRequired,

  // optional props
}

export default container(ZenDeskVerifyPage)
