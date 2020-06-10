import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import Icon from 'weplay-components/Icon'
import SvgIcon from 'weplay-components/SvgIcon'
import Avatar from 'weplay-components/Avatar'
import Image from 'weplay-components/Image'

import styles from './styles.scss'

const Participant = ({
  // required props
  nickname,
  pictureUrl,

  // optional props
  isInvited,
  children,
  modifiers,
  isAutoChess,
  countryUrl,
  countryName,
  hasNameWithStar,
}) => {
  const t = useTranslation()

  return (
    <div
      className={classNames(
        styles.block,
        setCSSModifiers(modifiers, styles),
        { [styles.alignItemsTop]: children },
        { [styles.isAutoChess]: isAutoChess },
      )}
    >
      <div className={styles.wrapAvatar}>
        <Avatar
          avatar={pictureUrl}
          className={styles.avatar}
          imageClassName={classNames(
            styles.figure,
            setCSSModifiers(modifiers, styles),
          )}
          isPlaceholderDark
          isObjectContain
        />

        {(countryUrl && countryName && isAutoChess) && (
          <p className={styles.flag}>
            <Image
              src={countryUrl}
              alt={countryName}
              className={styles.flagImage}
              title={countryName}
            />
          </p>
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.nickname}>
          {nickname || t('EVENTS.tba')}
        </span>

        {children}
      </div>

      {hasNameWithStar && (
        <Icon
          iconName="star"
          className={styles.iconBlue}
        />
      )}

      {(!hasNameWithStar && isInvited) && (
        <SvgIcon
          iconName="gold-star"
          className={styles.icon}
          type="color"
        />
      )}
    </div>
  )
}

Participant.propTypes = {
  // required props

  // optional props
  nickname: PropTypes.string,
  pictureUrl: PropTypes.string,
  countryUrl: PropTypes.string,
  countryName: PropTypes.string,
  isInvited: PropTypes.bool,
  isAutoChess: PropTypes.bool,
  hasNameWithStar: PropTypes.bool,
  // titleMvp: PropTypes.string,
  // votesCount: PropTypes.number,
  children: PropTypes.node,
  modifiers: PropTypes.arrayOf(PropTypes.string),
}

Participant.defaultProps = {
  nickname: '',
  pictureUrl: '',
  countryUrl: '',
  countryName: '',
  isInvited: false,
  isAutoChess: false,
  hasNameWithStar: false,
  // titleMvp: '',
  // votesCount: 0,
  children: null,
  modifiers: [],
}

export default Participant
