import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Image from 'weplay-components/Image'

import { CLOSED_TILE_VALUE } from 'weplay-mini-games/pages/GameMatchUpPage/GameSection/config'

import styles from './Tile.scss'
import { images } from './config'
import cover from './img/question.svg'

const CLEAR_IMAGE_TIMEOUT = 500

const Tile = ({
  value,
  sendPosition,
}) => {
  const [image, setImage] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  const handleTileClick = () => {
    if (!image) sendPosition()
  }

  const handleCloseTile = () => {
    setIsClosing(true)
    setTimeout(() => {
      setImage(null)
      setIsClosing(false)
    }, CLEAR_IMAGE_TIMEOUT)
  }

  useEffect(() => {
    if (value === CLOSED_TILE_VALUE && image) {
      handleCloseTile()
    }
  }, [value, image])

  useEffect(() => {
    if (value !== CLOSED_TILE_VALUE && !image) {
      setImage(images[value])
    }
  }, [value, image])

  return (
    <div
      className={classNames(
        styles.block,
        (image && !isClosing) && styles.opened,
      )}
      onClick={handleTileClick}
    >
      <div className={styles.inner}>
        <div className={styles.front}>
          <Image
            className={styles.cover}
            src={cover}
          />
        </div>
        <div className={styles.back}>
          {image && (
            <Image
              className={styles.image}
              src={image}
            />
          )}
        </div>
      </div>
    </div>
  )
}

Tile.propTypes = {
  value: PropTypes.number.isRequired,
  sendPosition: PropTypes.func.isRequired,
}

export default Tile
