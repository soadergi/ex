import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { DISCIPLINE_NAME_CSGO, DISCIPLINE_NAME_DOTA } from 'weplay-competitive/config/disciplines'

const Seo1v1 = ({ localizationText, discipline }) => {
  const t = useTranslation()
  switch (discipline) {
    case DISCIPLINE_NAME_CSGO:
      return (
        <>
          <h2>{t(`${localizationText}.h2`)}</h2>
          <p>
            <strong>{t(`${localizationText}.p1strong`)}</strong>
            {' '}
            {t(`${localizationText}.p1end`)}
          </p>
          <p>{t(`${localizationText}.p2`)}</p>
          <p>{t(`${localizationText}.p3`)}</p>
          <p>
            {t(`${localizationText}.p4start`)}
            {' '}
            <strong>{t(`${localizationText}.p4strong`)}</strong>
            {' '}
            {t(`${localizationText}.p4end`)}
          </p>
          <p>
            {t(`${localizationText}.p5start`)}
            {' '}
            <a href={t(`${localizationText}.href`)}>{t(`${localizationText}.p5link`)}</a>
            {' '}
            {t(`${localizationText}.p5end`)}
          </p>
        </>
      )
    case DISCIPLINE_NAME_DOTA:
      return (
        <>
          <h2>{t(`${localizationText}.h2`)}</h2>
          <p>{t(`${localizationText}.p1`)}</p>
          <p>{t(`${localizationText}.p2`)}</p>
          <p>
            {t(`${localizationText}.p3start`)}
            {' '}
            <a href={t(`${localizationText}.href`)}>{t(`${localizationText}.p3link`)}</a>
            {' '}
            {t(`${localizationText}.p3end`)}
          </p>
        </>
      )
    default:
      return null
  }
}

Seo1v1.propTypes = {
  localizationText: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
}

export default Seo1v1
