import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'
import { TUG_OF_WAR_STAGE_NAMES } from 'weplay-events/pages/TugOfWarPage/consts'

import styles from './styles.scss'
import container from './container'

const CustomFirstPlacePrize = ({
  // required props
  label,
  sum,
  // container props
  i18nTexts,
  tournamentTitle,

  // optional props
}) => (
  <li className={styles.prize}>
    <span className={styles.label}>
      {label}
    </span>

    <p className={styles.sumWrap}>
      {tournamentTitle === TUG_OF_WAR_STAGE_NAMES.RADIANT && (
        <>
          <span className={styles.sum}>{`${sum}$`}</span>
          <span className={styles.plus}>+</span>
        </>
      )}

      <Icon
        iconName="invite"
        className={styles.icon}
        size="large"
      />

      {tournamentTitle === TUG_OF_WAR_STAGE_NAMES.DIRE && (
        <span>{i18nTexts[tournamentTitle].heroSection.prize.firstPlacePrize}</span>
      )}
    </p>

    {tournamentTitle === TUG_OF_WAR_STAGE_NAMES.RADIANT && (
      <p className={styles.description}>{i18nTexts[tournamentTitle].heroSection.prize.description}</p>
    )}
  </li>

)

CustomFirstPlacePrize.propTypes = {
  // required props
  label: PropTypes.string.isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  tournamentTitle: PropTypes.string.isRequired,

  // optional props
  sum: PropTypes.string,
}

CustomFirstPlacePrize.defaultProps = {
  sum: '',
}

export default container(CustomFirstPlacePrize)
