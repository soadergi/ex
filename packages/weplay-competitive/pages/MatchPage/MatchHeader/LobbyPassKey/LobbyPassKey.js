import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { matchesSelectors } from 'weplay-competitive/reduxs/matches'

import styles from './LobbyPassKey.scss'

const LobbyPassKey = ({
  matchId,
}) => {
  const t = useTranslation()
  const match = useSelector(matchesSelectors.createRecordByIdSelector(matchId))
  const { matchPasskey } = match

  return (
    <div className={styles.block}>
      {matchPasskey && (
        <>
          <div className={styles.name}>
            <p className={styles.title}>
              {`${t('competitive.match.matchInfo.lobbyName')}:`}
            </p>
            <p className={styles.data}>{`TNM:${matchId}`}</p>
          </div>
          <div className={styles.pass}>
            <p className={styles.title}>
              {`${t('competitive.match.matchInfo.lobbyPassword')}:`}
            </p>
            <p className={styles.data}>{matchPasskey}</p>
          </div>
        </>
      )}
    </div>
  )
}

LobbyPassKey.propTypes = {
  matchId: PropTypes.number.isRequired,
}

export default LobbyPassKey
