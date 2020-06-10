import React from 'react'
import PropTypes from 'prop-types'
import { NavHashLink } from 'react-router-hash-link'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'

import Section from 'weplay-competitive/components/Section'

import styles from './styles.scss'

const Banner = ({
  discipline,
}) => {
  const t = useTranslation()
  const sectionModification = ['textWhite']
  const scrollHandler = (el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <Section
      modifiers={sectionModification}
      title={t('competitive.dotaUnderlordsLanding.banner.title')}
      subtitle={t('competitive.dotaUnderlordsLanding.banner.text')}
      className="u-pt-3 u-pb-4"
      hasSectionButtonsGroup
    >
      <div className={styles.banner}>
        <NavHashLink
          to={`#${discipline}-tournaments`}
          scroll={scrollHandler}
          className={styles.button}
        >
          <span className={styles.text}>
            {t('competitive.dotaUnderlordsLanding.banner.point')}
          </span>
          <Icon iconName="arrow-down-second" />
        </NavHashLink>
      </div>
    </Section>
  )
}
Banner.propTypes = {
  discipline: PropTypes.string.isRequired,
}

export default Banner
