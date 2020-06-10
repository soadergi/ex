import React from 'react'
import PropTypes from 'prop-types'
import Image from 'weplay-components/Image'
import { dotaHeroes } from 'weplay-events/constants/dotaHeroes'

import styles from './styles.scss'

const teamHeroesAmountMiddle = 5
const teamHeroesAmountFull = 10

const HeroesPictures = ({
  allHeroes,
  isRadiantHeroes,
  isDireHeroes,
}) => {
  const sliceStartIndex = isRadiantHeroes ? 0 : teamHeroesAmountMiddle
  const sliceEndIndex = isDireHeroes ? teamHeroesAmountFull : teamHeroesAmountMiddle
  const heroes = allHeroes.slice(sliceStartIndex, sliceEndIndex)

  return heroes.map(hero => (
    <Image
      key={hero.heroId}
      className={styles.image}
      src={dotaHeroes[hero.heroId]}
      alt="dota-2 hero picture"
    />
  ))
}

HeroesPictures.propTypes = {
  allHeroes: PropTypes.arrayOf(
    PropTypes.shape({}),
  ),
  isRadiantHeroes: PropTypes.bool.isRequired,
  isDireHeroes: PropTypes.bool.isRequired,
}

HeroesPictures.defaultProps = {
  allHeroes: [],
}

export default HeroesPictures
