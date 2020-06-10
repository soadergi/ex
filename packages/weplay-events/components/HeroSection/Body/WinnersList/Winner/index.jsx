import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SvgIcon from 'weplay-components/SvgIcon'
import Icon from 'weplay-components/Icon'
import Participant from 'weplay-events/components/Participant'
import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'

import styles from './styles.scss'
import container from './container'

const Winner = ({
  // props from container
  isMobileWidth,

  // optional props
  winner,
  label,
  iconName,
  iconClassName,
  labelSuffix,
  labelIconName,
  tournamentTitle,
}) => (
  <div
    className={classNames(
      styles.winner,
      styles[tournamentTitle],
    )}
  >
    {(isMobileWidth && iconName === 'noIcon') && (
      <Icon
        className={styles.icon}
        iconName={labelIconName}
        size="small"
      />
    )}
    <div className={styles.prize}>

      {iconName !== 'noIcon' && (
        <SvgIcon
          iconName={iconName}
          type="color"
          className={iconClassName}
        />
      )}

      <p className={styles.label}>
        {`${label} ${labelSuffix}`}
      </p>
    </div>

    <div className={styles.participant}>
      <Participant
        nickname={winner.nickname}
        pictureUrl={winner.picture}
      />
    </div>

    {Boolean(winner.prize) && (
      <div className={styles.sumWrapper}>
        <span className={styles.sum}>
          {formatPrizeWithDigit(winner.prize)}
          {'$'}
        </span>
      </div>
    )}

    {(Boolean(labelIconName) && !isMobileWidth) && (
      <Icon
        className={styles.icon}
        iconName={labelIconName}
        size="large"
      />
    )}
  </div>
)

Winner.propTypes = {
  isMobileWidth: PropTypes.bool.isRequired,
  winner: PropTypes.shape({
    nickname: PropTypes.string,
    picture: PropTypes.string,
    prize: PropTypes.number,
  }).isRequired,
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
  labelSuffix: PropTypes.string.isRequired,

  // optional props
  labelIconName: PropTypes.string,
  tournamentTitle: PropTypes.string,
}

Winner.defaultProps = {
  // optional props
  labelIconName: '',
  tournamentTitle: '',
}

export default container(Winner)
