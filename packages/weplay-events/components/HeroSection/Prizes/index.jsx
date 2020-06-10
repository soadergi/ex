import React from 'react'
import PropTypes from 'prop-types'
import i18n from 'i18n-react'
import { formatPrizeWithDigit } from 'weplay-core/helpers/formatPrizeWithDigits'

import Prize from './Prize'
import container from './container'
import styles from './styles.scss'

const Prizes = ({
  // required props
  tournamentTitle,

  // props from container
  i18nTexts,
  specialPrizePool,
  firstPlacePrize,
  otherPlacesPrizes,
  FirstPlacePrizeComponent,
  hasGroupStagePrizes,
  // optional props
}) => (
  <ul className={styles.prizeList}>
    {firstPlacePrize && (
    <FirstPlacePrizeComponent
      tournamentTitle={tournamentTitle}
      key={firstPlacePrize[0]}
      label={i18n.translate(i18nTexts.prizePool.place, { place: firstPlacePrize[0][0] })}
      sum={formatPrizeWithDigit(firstPlacePrize[0][1])}
    />
    )}
    {otherPlacesPrizes.map(prize => (
      <Prize
        key={prize[0]}
        label={i18n.translate(i18nTexts.prizePool.place, { place: prize[0][0] })}
        sum={formatPrizeWithDigit(prize[0][1])}
      />
    ))}
    {!hasGroupStagePrizes && specialPrizePool.map(prize => (
      prize[1] && (
        <Prize
          key={prize[0]}
          label={i18nTexts.prizePool[prize[0]]}
          sum={formatPrizeWithDigit(prize[1])}
        />
      )
    ))}
  </ul>
)

Prizes.propTypes = {
  // required props
  tournamentTitle: PropTypes.string.isRequired,

  // props from container
  i18nTexts: PropTypes.shape({}).isRequired,
  firstPlacePrize: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  otherPlacesPrizes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array)).isRequired,
  specialPrizePool: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  FirstPlacePrizeComponent: PropTypes.shape({}).isRequired,
  hasGroupStagePrizes: PropTypes.bool,
  // optional props
}

Prizes.defaultProps = {
  // optional props
  hasGroupStagePrizes: false,
}

export default container(Prizes)
