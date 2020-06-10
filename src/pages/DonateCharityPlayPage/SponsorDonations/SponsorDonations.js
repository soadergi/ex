import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { pluralTextName } from 'weplay-core/helpers/isSingular'

import Sponsor from './Sponsor/Sponsor'
import styles from './styles.scss'

const SponsorDonations = ({ sponsorDonations }) => {
  const t = useTranslation()
  const count = sponsorDonations.length

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>
        {t('charity.sponsorDonations.title')}
      </h2>
      <p className={styles.indicator}>
        {`${count} ${t(`charity.sponsorDonations.countSponsors.${pluralTextName(count)}`)}`}
      </p>
      <div
        className={classNames(
          styles.block,
        )}
      >
        <ul className={styles.list}>
          {sponsorDonations.map(sponsor => (
            <Sponsor
              key={sponsor.name}
              sponsor={sponsor}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

SponsorDonations.propTypes = {
  sponsorDonations: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
}

export default React.memo(SponsorDonations)
