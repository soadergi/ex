import React from 'react'
import PropTypes from 'prop-types'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import HeadLine from 'weplay-components/HeadLine'
import Image from 'weplay-components/Image'

import container from './container'
import styles from './styles.scss'

const HeadLineWrapper = ({
  // required props
  // container props
  // optional props
  title,
  text,
  linkUrl,
  linkText,
  imgAlt,
  img,
}) => {
  const { locale } = useLocale()

  return (
    <div className={styles.block}>
      <HeadLine
        linkUrl={linkUrl}
        linkText={linkText}
        title={title}
        text={text}
      />
      {img && (
        <div className={styles.imgBlock}>
          <Image
            src={img[locale]}
            alt={imgAlt}
            className={styles.image}
          />
        </div>
      )}
    </div>
  )
}

HeadLineWrapper.propTypes = {
  // required props
  // container props
  // optional props
  title: PropTypes.string,
  text: PropTypes.string,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string,
  imgAlt: PropTypes.string,
  img: PropTypes.shape({}),
}

HeadLineWrapper.defaultProps = {
  // optional props
  title: '',
  text: '',
  linkUrl: '',
  linkText: '',
  imgAlt: '',
  img: null,
}

export default container(HeadLineWrapper)
