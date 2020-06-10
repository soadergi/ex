import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Image from 'weplay-components/Image'

import firstElementBg from './img/1.png'
import secondElementBg from './img/2.png'
import thirdElementBg from './img/3.png'
import styles from './styles.scss'
import container from './container'

const DireParallax = ({
  // required props

  // container props

  // optional props
  tournamentTitle,
  backgroundUrl,
  backgroundDireSecUrl,
  saveParallaxRef,
}) => (
  <div className={styles.wrapParallaxElem}>
    <div
      ref={saveParallaxRef}
      className={styles.parallaxElemHeight}
    >

      <div
        data-depth="0.0"
      />
      <div
        className={styles.element}
        data-depth="0.1"
      >
        <div
          className={classNames(
            styles.backgroundUrl,
            styles[tournamentTitle],
          )}
          style={{ backgroundImage: `url(${backgroundUrl}` }}
        />
      </div>
      <div
        className={styles.element}
        data-depth="0.17"
      >
        <div
          className={classNames(
            styles.backgroundUrl,
            styles.backgroundUrlSecond,
            styles[tournamentTitle],
          )}
          style={{ backgroundImage: `url(${backgroundDireSecUrl}` }}
        />
      </div>
      <div
        className={classNames(
          styles.element,
          styles.leftTopElement,
        )}
        data-depth="0.3"
      >
        <Image
          className={styles.leftTopElem}
          src={firstElementBg}
          alt="decor"
        />
      </div>
      <div
        className={classNames(
          styles.element,
          styles.rightBottomElement,
        )}
        data-depth="0.27"
      >
        <Image
          className={styles.rightBottomElem}
          src={secondElementBg}
          alt="decor"
        />
      </div>
      <div
        className={classNames(
          styles.element,
          styles.rightCenterElement,
        )}
        data-depth="0.21"
      >
        <Image
          className={styles.rightCenterElem}
          src={thirdElementBg}
          alt="decor"
        />
      </div>
    </div>
  </div>
)

DireParallax.propTypes = {
  // required props

  // container props

  // optional props
  tournamentTitle: PropTypes.string,
  backgroundUrl: PropTypes.string,
  backgroundDireSecUrl: PropTypes.string,
  saveParallaxRef: PropTypes.func.isRequired,
}

DireParallax.defaultProps = {
  // optional props
  tournamentTitle: '',
  backgroundUrl: '',
  backgroundDireSecUrl: '',
}

export default container(DireParallax)
