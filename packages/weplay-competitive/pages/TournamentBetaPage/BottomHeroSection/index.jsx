import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import Image from 'weplay-components/Image'
import BackgroundImg from 'weplay-components/BackgroundImg'
import { AT__LP_TOURNAMENTS_LIST } from 'weplay-competitive/analytics/amplitude'

import container from './container'
import styles from './styles.scss'

const SMALL_SIZE = 1280
const MEDIUM_SIZE = 2048
const BIG_SIZE = 1690
const widths = [
  SMALL_SIZE,
  MEDIUM_SIZE,
  BIG_SIZE,
]
const BottomHeroSection = ({
  // required props
  handleDisciplineClick,
  // container props
  disciplines,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      {disciplines.map(discipline => (
        <Link
          onClick={handleDisciplineClick}
          key={discipline.name}
          className={styles.content}
          to={pathWithParamsByRoute(NAMES.TOURNAMENTS, { discipline: discipline.url })}
          {...getAnalyticsAttributes({
            'amplitude-action': AT__LP_TOURNAMENTS_LIST,
            'amplitude-discipline': discipline.url,
          })}
        >
          <BackgroundImg
            src={discipline.backgrounds.heroSectionButton}
            className={styles.background}
            sizes="(max-width: 40em) 1280px, (max-width: 64em) 2048px, 1690px"
            widths={widths}
            alt="logo"
          />
          <Image
            className={styles.logo}
            src={discipline.backgrounds.logo}
            alt="logo"
          />
          <span className={styles.link}>
            {t('competitive.tournamentLanding.heroSection.linkText')}
            <Icon
              size="small"
              className={styles.arrowIcon}
              iconName="arrow-link"
            />
          </span>
        </Link>
      ))}
    </div>
  )
}

BottomHeroSection.propTypes = {
  // required props
  handleDisciplineClick: PropTypes.func.isRequired,

  // container props
  disciplines: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  // optional props
}

BottomHeroSection.defaultProps = {
  // optional props
}

export default container(BottomHeroSection)
