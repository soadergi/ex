import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Avatar from 'weplay-components/Avatar'

import styles from './Participant.scss'

const avatarResponsive = {
  md: '48',
}

const Participant = ({
  isMarked,
  participant,
  className,
}) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)

  return (
    <div
      className={classNames(
        styles.block,
        className,
      )}
    >
      {!isMobileWidth && (
        <Avatar
          className={styles.avatar}
          imageClassName={styles.figure}
          avatar={participant.profileImageUrl}
          size="48"
          responsive={avatarResponsive}
          isObjectContain
        />
      )}

      <div className={styles.wrap}>
        <span className={styles.name}>
          {participant.displayName}

          {isMarked && (
            <span className={styles.label}>
              {t('events.predictionsMainBlock.leaderboard.leaderboardParticipant.participant.labelText')}
            </span>
          )}
        </span>

        {!isMobileWidth && (
          <span className={styles.fullName}>
            {participant.login}
          </span>
        )}
      </div>
    </div>
  )
}

Participant.propTypes = {
  participant: PropTypes.shape({
    displayName: PropTypes.string,
    login: PropTypes.string,
    profileImageUrl: PropTypes.string,
  }).isRequired,
  isMarked: PropTypes.bool,
  className: PropTypes.string,
}

Participant.defaultProps = {
  isMarked: false,
  className: '',
}

export default Participant
