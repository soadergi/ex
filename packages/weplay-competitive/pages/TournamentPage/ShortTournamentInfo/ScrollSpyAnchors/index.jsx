import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { HashLink as Link } from 'react-router-hash-link'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import { AT__TOURNAMENTS_DETAILS_NAVIGATION } from 'weplay-competitive/analytics/amplitude'

import container from './container'
import styles from './styles.scss'

const ScrollSpyAnchors = ({
  // required props
  // links,
  scrollSpySections,
  location,
  // container props
  activeSection,
  handleScrollToSection,

  // optional props
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <p className={styles.title}>
        {t('competitive.tournament.scrollSpy.title')}
      </p>
      <ul className={styles.list}>
        {scrollSpySections.map(section => section.rendered && (
        <li
          key={section.name}
          className={classNames(
            styles.item,
            {
              [styles.isActive]: section.href === activeSection,
            },
          )}
        >
          <Link
            scroll={el => handleScrollToSection(el)}
            to={`${location.pathname}#${section.href}`}
            className={styles.link}
            {...getAnalyticsAttributes({
              'amplitude-action': AT__TOURNAMENTS_DETAILS_NAVIGATION,
              'amplitude-option': section.name,
            })}
          >
            {t(`competitive.tournament.scrollSpy.sections.${section.name}`)}
          </Link>
        </li>
        ))}
      </ul>
    </div>

  )
}

ScrollSpyAnchors.propTypes = {
  // required props
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  // container props
  handleScrollToSection: PropTypes.func.isRequired,
  scrollSpySections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
      amplitudeName: PropTypes.string,
      rendered: PropTypes.bool,
    }),
  ).isRequired,
  // optional props
  activeSection: PropTypes.string,
}

ScrollSpyAnchors.defaultProps = {
  // optional props
  activeSection: null,
}

export default container(ScrollSpyAnchors)
