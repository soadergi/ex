import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import disciplinePropType from 'weplay-competitive/customPropTypes/disciplinePropType'

import styles from './Game.scss'
import container from './container'

const Game = ({
  // required props
  tournamentDiscipline,
  // container props
  isActive,
  handleClick,
  isDisabledForPlayer,
  // optional props
}) => {
  const t = useTranslation()
  return (
    <li
      className={classNames(
        styles.block,
        {
          [styles.isDisabled]: isDisabledForPlayer,
          [styles.isActive]: isActive,
        },
      )}
    >
      <img
        className={classNames(
          styles.image,
          'o-img-responsive',
          {
            [styles.isDisabled]: isDisabledForPlayer,
          },
        )}
        src={tournamentDiscipline.backgrounds.iconMemberPage}
        alt={tournamentDiscipline.name}
      />
      <div className={styles.content}>
        {!isActive && (
          <button
            type="button"
            className={styles.launcher}
            onClick={handleClick}
          >
            {tournamentDiscipline.name}
          </button>
        )}

        {isDisabledForPlayer && (
          <span className={styles.message}>{t('competitive.member.profile.soon')}</span>
        )}
      </div>
    </li>
  )
}

Game.propTypes = {
  // required props
  tournamentDiscipline: disciplinePropType.isRequired,
  // container props
  isActive: PropTypes.bool.isRequired,
  isDisabledForPlayer: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  // optional props

}

Game.defaultProps = {
  // optional props
}

export default container(Game)
