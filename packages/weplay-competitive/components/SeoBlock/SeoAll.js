import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'

import Link from 'weplay-components/Link'

import {
  DISCIPLINE_NAME_CSGO,
  DISCIPLINE_NAME_DOTA,
  DISCIPLINE_NAME_UNDERLORDS,
  DISCIPLINE_NAME_TFT,
} from 'weplay-competitive/config/disciplines'

const SeoAll = ({ discipline, localizationText }) => {
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
          <p>{t(`${localizationText}.p4`)}</p>
          <p>
            {t(`${localizationText}.p5start`)}
            {' '}
            <strong>{t(`${localizationText}.p5strong`)}</strong>
            {' '}
            {t(`${localizationText}.p5end`)}
          </p>
          <p>{t(`${localizationText}.p6`)}</p>
          <h4>{t(`${localizationText}.p7`)}</h4>
          <p>
            {t(`${localizationText}.p8`)}
          </p>
          <h4>{t(`${localizationText}.p9`)}</h4>
          <p>{t(`${localizationText}.p10`)}</p>
          <h4>{t(`${localizationText}.p11`)}</h4>
          <p>
            {t(`${localizationText}.p12`, {
              link1v1: (
                <Link
                  key="link1v1"
                  to={`${pathWithParamsByRoute(
                    NAMES.TOURNAMENTS,
                    {
                      discipline,
                    },
                  )}?gameMode=2`}
                >
                  1v1
                </Link>
              ),
              link2v2: (
                <Link
                  key="link2v2"
                  to={`${pathWithParamsByRoute(
                    NAMES.TOURNAMENTS,
                    {
                      discipline,
                    },
                  )}?gameMode=3`}
                >
                  2v2
                </Link>
              ),
              link5v5: (
                <Link
                  key="link5v5"
                  to={`${pathWithParamsByRoute(
                    NAMES.TOURNAMENTS,
                    {
                      discipline,
                    },
                  )}?gameMode=1`}
                >
                  5v5
                </Link>
              ),
            })}
          </p>
          <h4>{t(`${localizationText}.p13`)}</h4>
          <p>{t(`${localizationText}.p14`)}</p>
        </>
      )
    case DISCIPLINE_NAME_DOTA:
      return (
        <>
          <h2>{t(`${localizationText}.h2`)}</h2>
          <p>
            {t(`${localizationText}.p1`)}
          </p>
          <p>{t(`${localizationText}.p2`)}</p>
          <p>
            {t(`${localizationText}.p3start`)}
            {' '}
            <a href={t(`${localizationText}.href`)}>{t(`${localizationText}.p3link`)}</a>
            {' '}
            {t(`${localizationText}.p3end`)}
          </p>
          <p>{t(`${localizationText}.p4`)}</p>
        </>
      )
    case DISCIPLINE_NAME_UNDERLORDS:
      return (
        <>
          <p>{t(`${localizationText}.p1`)}</p>
          <p>{t(`${localizationText}.p2`)}</p>
          <p>{t(`${localizationText}.p3`)}</p>
        </>
      )
    case DISCIPLINE_NAME_TFT:
      return (
        <>
          <p>{t(`${localizationText}.p1`)}</p>
          <p>{t(`${localizationText}.p2`)}</p>
          <p>{t(`${localizationText}.p3`)}</p>
          <p>{t(`${localizationText}.p4`)}</p>
        </>
      )
    default:
      return null
  }
}

SeoAll.propTypes = {
  localizationText: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
}

export default SeoAll
