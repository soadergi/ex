import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'weplay-components/Link'
import LegacyButton from 'weplay-components/LegacyButton'
import Image from 'weplay-components/Image'

import runeBounty from './img/promocode-rune-bounty.png'
import runePurple from './img/promocode-rune-purple.png'
import styles from './styles.scss'
import container from './container'

const PromocodesBanner = ({ i18n, goToCodes }) => (
  <div className={styles['c-promocode-banner']}>
    <div className={styles['c-promocode-banner__container']}>
      <h2 className={styles['c-promocode-banner__title']}>
        {i18n.promocodeBanner.title}
      </h2>

      <ol className={styles['c-promocode-banner-steps']}>
        <li className={styles['c-promocode-banner-steps__item']}>
          <span className={styles['c-promocode-banner-steps__text']}>
            {i18n.promocodeBanner.listItemOne}
          </span>
        </li>
        <li className={styles['c-promocode-banner-steps__item']}>
          <span className={styles['c-promocode-banner-steps__text']}>
            {i18n.promocodeBanner.listItemTwo}
          </span>
        </li>
        <li className={styles['c-promocode-banner-steps__item']}>
          <span className={styles['c-promocode-banner-steps__text']}>
            {i18n.promocodeBanner.listItemThree}
          </span>
        </li>
      </ol>

      <LegacyButton
        onClick={goToCodes}
        className="c-promocode-banner__btn"
      >
        {i18n.promocodeBanner.button}
      </LegacyButton>
      <Link
        className={styles['c-promocode-banner__link']}
        to="/news/-10654"
      >
        {i18n.promocodeBanner.link}
      </Link>
    </div>

    <span className={classNames(
      styles['c-promocode-banner__rune'],
      styles['c-promocode-banner__rune--purple'],
    )}
    >
      <Image
        src={runePurple}
        alt=""
      />
    </span>

    <span className={classNames(
      styles['c-promocode-banner__rune'],
      styles['c-promocode-banner__rune--bounty'],
    )}
    >
      <Image
        src={runeBounty}
        alt=""
      />
    </span>
  </div>
)

PromocodesBanner.propTypes = {
  i18n: PropTypes.shape({
    promocodeBanner: PropTypes.shape({
      title: PropTypes.string.isRequired,
      listItemOne: PropTypes.string.isRequired,
      listItemTwo: PropTypes.string.isRequired,
      listItemThree: PropTypes.string.isRequired,
      button: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  goToCodes: PropTypes.func.isRequired,
}

export default container(PromocodesBanner)
