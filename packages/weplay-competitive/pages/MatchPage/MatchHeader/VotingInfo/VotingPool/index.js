import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Label from 'weplay-components/Label'

import lobbyMapPropType from 'weplay-competitive/customPropTypes/lobbyMapPropType'
import CoinFlip from 'weplay-competitive/components/CoinFlip'

import VotingItem from './VotingItem'
import styles from './styles.scss'

const VotingPool = ({
  // required props
  lobbyMaps,
  // optional props
  isReverse,
  hasCoin,
  isServer,
}) => {
  const t = useTranslation()

  return (
    <>
      <p className={styles.title}>
        {isServer
          ? t('competitive.match.matchInfo.serverPick')
          : t('competitive.match.matchInfo.pickAndBan')}
      </p>
      <ul className={classNames(
        styles.block,
        {
          [styles.isReverse]: isReverse,
          [styles.isServer]: isServer,
        },
      )}
      >
        {hasCoin && (
        <li className={styles.item}>
          <CoinFlip />
        </li>
        )}
        {lobbyMaps.length
          ? lobbyMaps.map(lobbyMap => (
            <li
              key={lobbyMap.id}
              className={styles.item}
            >
              <VotingItem lobbyMap={lobbyMap} />
            </li>
          ))
          : (
            <li className={styles.item}>
              <Label color="white">
                {t('competitive.match.matchInfo.tip')}
              </Label>
            </li>
          )}
      </ul>
    </>
  )
}

VotingPool.propTypes = {
  // required props
  // container props
  lobbyMaps: PropTypes.arrayOf(lobbyMapPropType),
  // optional props
  isReverse: PropTypes.bool,
  hasCoin: PropTypes.bool,
  isServer: PropTypes.bool,
}

VotingPool.defaultProps = {
  // optional props
  lobbyMaps: [],
  isReverse: false,
  hasCoin: false,
  isServer: false,
}

export default VotingPool
