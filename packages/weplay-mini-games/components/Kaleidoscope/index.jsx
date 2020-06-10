import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Image from 'weplay-components/Image'

import styles from './styles.scss'

const Kaleidoscope = ({
  img,
  page,
}) => {
  const isTabletWidth = useSelector(isTabletWidthSelector)
  return (
    <>
      <Image
        src={img}
        alt="kaleidoscope"
        className={classNames(
          styles.image,
          styles[page],
        )}
      />
      {!isTabletWidth && (
        <Image
          src={img}
          alt="kaleidoscope"
          className={classNames(
            styles.image,
            styles[page],
            styles.rightImage,
          )}
        />
      )}
    </>
  )
}

Kaleidoscope.propTypes = {
  // required props
  img: PropTypes.shape({}).isRequired,
  // optional props
  page: PropTypes.string,
}

Kaleidoscope.defaultProps = {
  // optional props
  page: '',
}

export default Kaleidoscope
