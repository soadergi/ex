import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Image from 'weplay-components/Image'

import poolItemPropType from 'weplay-competitive/customPropTypes/poolItemPropType'

import container from './container'
import styles from './styles.scss'

const allHero = 'https://static-prod.weplay.tv/2020-03-16/2a2f2bcbceeeb95b20ba943a7b076164.291E18-D27343-70BC60.jpeg'

const ListPool = ({
  // required props

  // container props
  poolItems,
  isAllPool,

  // optional props
  className,
}) => {
  const t = useTranslation()
  return (
    <ul
      className={classNames(
        styles.block,
        className,
      )}
    >
      {isAllPool && (
        <li>
          <div className={styles.wrapper}>
            <Image
              className="o-img-responsive"
              src={allHero}
              alt={t('competitive.tournament.pool.allHeroes')}
            />
          </div>
          <p className={styles.name}>
            {t('competitive.tournament.pool.allHeroes')}
          </p>
        </li>
      )}
      {poolItems.map(poolItem => poolItem.isFetched && (
        <li key={poolItem.id}>
          <div className={styles.wrapper}>
            <img
              className="o-img-responsive"
              src={poolItem.logo}
              alt={poolItem.name}
            />
          </div>
          <p className={styles.name}>
            {poolItem.name}
          </p>
        </li>
      ))}
    </ul>
  )
}

ListPool.propTypes = {
  // required props

  // container props
  isAllPool: PropTypes.bool.isRequired,
  poolItems: PropTypes.arrayOf(poolItemPropType).isRequired,
  // optional props
  className: PropTypes.string,
}

ListPool.defaultProps = {
  // optional props
  className: '',
}

export default container(ListPool)
