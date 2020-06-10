import React from 'react'
import PropTypes from 'prop-types'
import Image from 'weplay-components/Image'

import logo from './logo.png'
import TournamentData from './TournamentData'
import styles from './styles.scss'
import container from './container'

const BannerHeader = ({
  i18nTexts,
}) => (
  <div
    className={styles.bannerHeader}
  >
    <TournamentData
      title={i18nTexts.artifact.mainBanner.periodTitle}
      description={i18nTexts.artifact.mainBanner.periodDescription}
    />

    <TournamentData
      isTextAlignRight

      title={i18nTexts.artifact.mainBanner.prizeTitle}
      description={i18nTexts.artifact.mainBanner.prizeDescription}
    />

    <div className={styles.bannerLogo}>
      <figure className={styles.bannerLogoImage}>
        <Image
          src={logo}
          alt="Artifact"
          className="o-img-responsive"
        />
      </figure>
    </div>
  </div>
)

BannerHeader.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
}

export default container(BannerHeader)
