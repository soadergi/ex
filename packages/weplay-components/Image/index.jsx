import React, { useCallback, useState } from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'
import { LazyImage } from 'react-lazy-images'

import IsomorphicHead from 'weplay-components/IsomorphicHead'

import container from './container'
import styles from './styles.scss'

// TODO: think about ref support here
export const ImageMarkup = ({
  // required props

  // container props
  placeholderSrc,
  widths,
  srcSet,
  originalSrc,
  isInBuild,
  placeholderStyle,

  // optional props
  onLoad,
  sizes,
  alt,
  className,
  ...props
}) => {
  const [actualStyle, setStyle] = useState(placeholderStyle)
  const removeStyle = useCallback(() => setStyle({}), [setStyle])
  const handleImageLoad = useCallback(() => {
    removeStyle()
    onLoad()
  }, [onLoad, removeStyle])
  return (
    <>
      <IsomorphicHead>
        {widths.map(width => (
          <link
            key={width}
            rel="preload"
            href={`${originalSrc}?w=${width}`}
            as="image"
            media={`(min-width: ${width}px)`} // this only for all wide images
          />
        ))}
      </IsomorphicHead>
      <LazyImage
        src={originalSrc}
        srcSet={srcSet}
        sizes={sizes}
        placeholder={({ ref }) => (
          <img
            {...props}
            alt={alt}
            ref={ref}
            src={placeholderSrc}
            className={classNames(
              className,
              { [styles.placeholder]: isInBuild },
            )}
            style={placeholderStyle}
          />
        )}
        actual={({ ref }) => (
          <img
            {...props}
            ref={ref}
            srcSet={srcSet}
            sizes={sizes}
            style={actualStyle}
            alt={alt}
            src={originalSrc}
            className={className}
            onLoad={handleImageLoad}
          />
        )}
      />
    </>
  )
}

ImageMarkup.propTypes = {
  // required props
  // container props
  placeholderSrc: PropTypes.string.isRequired,
  srcSet: PropTypes.string.isRequired,
  originalSrc: PropTypes.string.isRequired,
  isInBuild: PropTypes.bool.isRequired,
  placeholderStyle: PropTypes.shape({
    background: PropTypes.string.isRequired,
  }).isRequired,
  widths: PropTypes.arrayOf(PropTypes.number).isRequired,
  // optional props
  sizes: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  onLoad: PropTypes.func,
}

ImageMarkup.defaultProps = {
  // optional props
  sizes: '',
  alt: '',
  className: '',
  onLoad: () => {},
}

const Image = container(ImageMarkup)
export default Image
