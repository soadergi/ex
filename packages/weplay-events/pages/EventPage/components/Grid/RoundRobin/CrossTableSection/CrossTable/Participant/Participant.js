import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Avatar from 'weplay-components/Avatar'

import styles from './Participant.scss'

const Participant = ({
  isMarked,
  hasName,
  participant,
  className,
  classNameAvatar,
  classNameNickname,
  isHidden,
}) => {
  const t = useTranslation()

  return (
    <div
      className={classNames(
        styles.block,
        className,
        { [styles.isHidden]: isHidden },
      )}
    >
      <Avatar
        className={classNames(
          styles.avatar,
          classNameAvatar,
        )}
        imageClassName={styles.figure}
        avatar={participant.logoUrl}
        size="32"
        isObjectContain
      />

      {hasName && (
        <div className={styles.wrap}>
          <span className={classNames(
            styles.name,
            classNameNickname,
          )}
          >
            {participant.name ?? 'TBA'}

            {isMarked && (
              /* eslint-disable-next-line max-len */
              <span className={styles.label}>{t('events.predictionsMainBlock.leaderboard.leaderboardParticipant.participant.labelText')}</span>
            )}
          </span>
        </div>
      )}
    </div>
  )
}

Participant.propTypes = {
  participant: PropTypes.shape({
    name: PropTypes.string,
    fullName: PropTypes.string,
    logoUrl: PropTypes.string,
  }).isRequired,
  isMarked: PropTypes.bool,
  hasName: PropTypes.bool,
  className: PropTypes.string,
  classNameAvatar: PropTypes.string,
  classNameNickname: PropTypes.string,
  isHidden: PropTypes.bool,
}

Participant.defaultProps = {
  isHidden: false,
  isMarked: false,
  hasName: false,
  className: '',
  classNameAvatar: '',
  classNameNickname: '',
}

export default React.memo(Participant)
