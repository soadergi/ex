import React, { useEffect, useRef } from 'react'

import backgroundBack from './img/bg-back.png'
import backgroundFront from './img/bg-front.png'
import styles from './ParallaxBackground.scss'

const ParallaxBackground = () => {
  const blockRef = useRef(null)

  useEffect(() => {
    const parallaxInstance = import('parallax-js').then(({ default: Parallax }) => new Parallax(blockRef.current))
    return () => parallaxInstance.destroy()
  }, [blockRef])

  return (
    <div
      className={styles.block}
      ref={blockRef}
    >
      <div
        data-depth="0.05"
        className={styles.parallaxHolder}
      >
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${backgroundBack}` }}
        />
      </div>

      <div
        data-depth="0.15"
        className={styles.parallaxHolder}
      >
        <div
          className={styles.imageContainer}
          style={{ backgroundImage: `url(${backgroundFront}` }}
        />
      </div>
    </div>
  )
}

export default ParallaxBackground
