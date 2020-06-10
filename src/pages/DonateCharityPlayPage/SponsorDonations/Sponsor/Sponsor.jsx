import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'

import styles from './styles.scss'

// eslint-disable-next-line max-len
const anonymousLogo = 'https://static-prod.weplay.tv/2020-03-20/2e6b8787f98952bcef4873fb5f1ccc82.137CA5-44B0DE-2C9CC4.png'
const anonymousName = 'Anonymous'

const Partner = ({ sponsor }) => {
  const content = useMemo(() => (
    <>
      <p className={styles.name}>{sponsor.name ?? anonymousName}</p>
      <div className={styles.imgWrap}>
        <Image
          src={sponsor.logo ?? anonymousLogo}
          alt={sponsor.name ?? anonymousName}
          className={styles.img}
        />
      </div>
    </>
  ), [sponsor])

  return (
    <li className={styles.item}>
      {
        sponsor.url ? (
          <Link
            to={sponsor.url}
            isExternal
            className={styles.link}
            {...getAnalyticsAttributes({
              category: 'sponsor',
              action: `${sponsor.name ?? anonymousName} logo (bottom)`,
              label: LOOKUP,
            })}
          >
            {content}
          </Link>
        ) : (
          <div className={styles.link}>
            {content}
          </div>
        )
      }
      <p className={styles.amount}>{sponsor.amount ?? ' '}</p>
    </li>
  )
}

Partner.propTypes = {
  sponsor: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
}

export default React.memo(Partner)
