import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'
import BackgroundFullWidth from 'weplay-components/BackgroundFullWidth'

import container from './container'
import styles from './styles.scss'

const AdvertisementBanner = ({
  // required props
  i18nTexts,
  tournamentTitle,
  bannerImage,
  url,

  // container props

  // optional props
  backgroundBanner,
  bannerLogo,
  openQualifiersImage,
  decorationImage,
  innerLink,
}) => (
  <div
    className={classNames(
      styles.block,
      styles[tournamentTitle],
      {
        [styles.innerLink]: innerLink,
      },
    )}
  >
    <>
      {backgroundBanner && (
        <BackgroundFullWidth
          src={backgroundBanner}
        />
      )}

      {bannerLogo && (
        <Image
          className={classNames(
            'o-img-responsive',
            styles.bannerLogo,
            styles.image,
          )}
          src={bannerLogo}
          alt=""
        />
      )}

      {openQualifiersImage && (
        <Image
          className={classNames(
            'o-img-responsive',
            styles.openQualifiersImage,
            styles.image,
          )}
          src={openQualifiersImage}
          alt=""
        />
      )}

      {decorationImage && (
        <Image
          className={classNames(
            'o-img-responsive',
            styles.decorationImage,
            styles.image,
          )}
          src={decorationImage}
          alt=""
        />
      )}
    </>

    <Link
      to={url}
      target="_blank"
      className={styles.link}
    >
      {innerLink
        ? <span className={styles.text}>{i18nTexts.events.reshuffleMadness2019.heroSection.bannerLink}</span>
        : (
          <Image
            className="o-img-responsive"
            src={bannerImage}
            alt=""
          />
        )}
    </Link>
  </div>
)

AdvertisementBanner.propTypes = {
  // required props
  backgroundBanner: PropTypes.shape({}),
  bannerLogo: PropTypes.shape({}),
  openQualifiersImage: PropTypes.shape({}),
  decorationImage: PropTypes.shape({}),
  url: PropTypes.string.isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
  bannerImage: PropTypes.shape({}),
  tournamentTitle: PropTypes.string,
  innerLink: PropTypes.bool,
}

AdvertisementBanner.defaultProps = {
  backgroundBanner: null,
  bannerLogo: null,
  openQualifiersImage: null,
  decorationImage: null,
  bannerImage: null,
  tournamentTitle: '',
  innerLink: false,
}

export default container(AdvertisementBanner)
