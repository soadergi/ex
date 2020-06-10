import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const Seo2v2 = ({ localizationText }) => {
  const t = useTranslation()
  return (
    <>
      <h2>{t(`${localizationText}.h2`)}</h2>
      <p>{t(`${localizationText}.p1`)}</p>
      <p>{t(`${localizationText}.p2`)}</p>
      <p>{t(`${localizationText}.p3`)}</p>
      <p>{t(`${localizationText}.p4`)}</p>
      <p>
        <strong>{t(`${localizationText}.p5strong`)}</strong>
        {' '}
        {t(`${localizationText}.p5start`)}
        {' '}
        <a href={t(`${localizationText}.href`)}>{t(`${localizationText}.p5link`)}</a>
        {'. '}
        {t(`${localizationText}.p5end`)}
      </p>
    </>
  )
}

Seo2v2.propTypes = {
  localizationText: PropTypes.string.isRequired,
}

export default Seo2v2
