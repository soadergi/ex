import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'
import { dotaHeroes } from 'weplay-events/constants/dotaHeroes'

import container from './container'
import styles from './styles.scss'

const HeroesPick = ({
  // required props
  heroes,

  // container props
  i18nTexts,

  // optional props
  fullCardDeckUrl,
}) => (
  <div
    className={classNames(
      styles.block,
    )}
  >
    <div
      className={classNames(
        styles.imagesWrapper,
      )}
    >
      {heroes.map(hero => (
        <Image
          key={hero.heroId}
          src={dotaHeroes[hero.heroId]}
          alt=""
          className={classNames(
            'o-img-responsive',
            styles.image,
          )}
        />
      ))}
    </div>

    { fullCardDeckUrl && (
      <Link
        to={fullCardDeckUrl}
        className={classNames(
          styles.fullCardDeck,
        )}
      >
        {i18nTexts.tugOfWar.matchDetailsButton.mobaHeroesPick.linkName}
      </Link>
    )}
  </div>

)

HeroesPick.propTypes = {
  // required props
  heroes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
  fullCardDeckUrl: PropTypes.string,
}

HeroesPick.defaultProps = {
  // optional props
  fullCardDeckUrl: '',
}

export default container(HeroesPick)
