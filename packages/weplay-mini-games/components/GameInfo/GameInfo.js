import React from 'react'
import PropTypes from 'prop-types'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import LanguageSwitcher from 'weplay-components/LanguageSwitcher'

import Hint from '../Hint/Hint'

import styles from './GameInfo.scss'

const GameInfo = ({
  HintPopup,
  hintLabel,
}) => {
  const { locale } = useLocale()

  return (
    <div className={styles.block}>
      <Hint label={hintLabel}>
        <HintPopup />
      </Hint>
      <div className={styles.langSelector}>
        <LanguageSwitcher
          openDirection="up"
          currentLanguage={locale}
        />
      </div>
    </div>
  )
}

GameInfo.propTypes = {
  HintPopup: PropTypes.func.isRequired,
  hintLabel: PropTypes.string.isRequired,
}

export default React.memo(GameInfo)
