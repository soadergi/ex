import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from 'weplay-competitive/components/Wrapper'
import Game from 'weplay-competitive/components/GameRouter/Game/Game'
import disciplinePropType from 'weplay-competitive/customPropTypes/disciplinePropType'

import styles from './GameRouter.scss'
import container from './container'

const GameRouter = ({
  // required props
  discipline,
  // container props
  tournamentDisciplines,
}) => (
  <div className={styles.block}>
    <Wrapper>
      <ul className={styles.list}>
        {tournamentDisciplines.map(tournamentDiscipline => tournamentDiscipline.isShowInGamesProfile && (
          <Game
            key={tournamentDiscipline.name}
            tournamentDiscipline={tournamentDiscipline}
            discipline={discipline}
          />
        ))}
      </ul>
    </Wrapper>
  </div>
)

GameRouter.propTypes = {
  // required props
  discipline: PropTypes.string.isRequired,
  // container props
  tournamentDisciplines: PropTypes.arrayOf(disciplinePropType).isRequired,
}

export default container(GameRouter)
