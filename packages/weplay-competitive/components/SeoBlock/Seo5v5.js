import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { DISCIPLINE_NAME_CSGO, DISCIPLINE_NAME_DOTA } from 'weplay-competitive/config/disciplines'

const Seo5v5 = ({ localizationText, discipline }) => {
  const t = useTranslation()
  switch (discipline) {
    case DISCIPLINE_NAME_CSGO:
      return (
        <>
          <h2>{t(`${localizationText}.h2`)}</h2>
          <p>
            {t(`${localizationText}.p1start`)}
            {' '}
            <a href={t(`${localizationText}.href`)}>{t(`${localizationText}.p1link`)}</a>
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
          <p>{t(`${localizationText}.p5`)}</p>
        </>
      )
    case DISCIPLINE_NAME_DOTA:
      return (
        <>
          <h2>{t(`${localizationText}.h2`)}</h2>
          <p>
            {t(`${localizationText}.p1`)}
          </p>
          <p>
            {t(`${localizationText}.p2start`)}
            <a href={t(`${localizationText}.href`)}>{t(`${localizationText}.p2link`)}</a>
            {t(`${localizationText}.p2end`)}
          </p>
          <p>{t(`${localizationText}.p3`)}</p>
        </>
      )
    default:
      return null
  }
}

Seo5v5.propTypes = {
  localizationText: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
}

export default Seo5v5
