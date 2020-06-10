import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import Image from 'weplay-components/Image'
import Avatar from 'weplay-components/Avatar'
import BetProviderPlayerCoefficient from 'weplay-events/components/BetProviderPlayerCoefficient'

import avatar from './img/ava_generic_onboarding.png'
import container from './container'
import styles from './styles.scss'

const Participant = ({
  // required props

  // container props
  betProviderImg,
  // optional props
  betProvider,
  isLose,
}) => (
  <div className={classNames(
    styles.block,
    {
      [styles.isLose]: isLose,
    },
  )}
  >
    <div className={styles.userAvatar}>
      <Avatar
        avatar={avatar}
        className={styles.avatar}
      />
      <p className={styles.name}>Dreamteam</p>
    </div>
    <div className={styles.stats}>
      {betProvider ? (
        <>
          <Image
            className={classNames(
              styles.image,
              styles[betProvider],
            )}
            src={betProviderImg}
            alt=""
          />
          <BetProviderPlayerCoefficient
            gameUrl={betProvider}
            coefficient="1.654"
            className={classNames(
              styles.coefficient,
              styles[betProvider],
            )}
          />
        </>
      ) : (
        <span className={styles.hyphenCoefficient}>
          -
        </span>
      )}
      <p className={styles.score}>
        0
      </p>
    </div>
  </div>
)

Participant.propTypes = {
  // required props
  // container props
  // optional props
  betProviderImg: imgPropType,
  betProvider: PropTypes.string,
  isLose: PropTypes.bool,
}

Participant.defaultProps = {
  // optional props
  betProviderImg: null,
  betProvider: '',
  isLose: false,
}

export default container(Participant)
