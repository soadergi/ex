import React from 'react'
import PropTypes from 'prop-types'

import styles from './GameBody.scss'
import Tile from './Tile/Tile'

const GameBody = ({
  board,
  sendTilePosition,
}) => (
  <div className={styles.block}>
    {board.map((row, x) => (
      <div className={styles.row}>
        {row.map((value, y) => (
          <Tile
            value={value}
            sendPosition={() => sendTilePosition(x, y)}
          />
        ))}
      </div>
    ))}
  </div>
)

GameBody.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number),
  ).isRequired,
  sendTilePosition: PropTypes.func.isRequired,
}

export default React.memo(GameBody)
