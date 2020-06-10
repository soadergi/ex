import React from 'react'
import PropTypes from 'prop-types'

import Image from 'weplay-components/Image'

import messageImg from './img/subscription-icon.png'
import styles from './styles.scss'
import container from './container'

const InfoMessage = ({
  // required props
  // container props
  // optional props
  text,
}) => (
  <div className={styles.block}>
    <Image
      src={messageImg}
      alt="Message Icon"
      className={styles.img}
      sizes="56px"
    />
    <span className={styles.text}>
      {text}
    </span>
  </div>

)

InfoMessage.propTypes = {
  // required props
  // container props
  // optional props
  text: PropTypes.string,
}

InfoMessage.defaultProps = {
  // optional props
  text: '',
}

export default container(InfoMessage)
