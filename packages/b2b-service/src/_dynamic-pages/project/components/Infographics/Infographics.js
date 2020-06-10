import React from 'react'
import classNames from 'classnames'

import HeadLine from 'weplay-components/HeadLine'
import Image from 'weplay-components/Image'

import classes from './Infographics.scss'

const Infographics = ({
  title,
  images,
}) => (
  <>
    <HeadLine
      className="u-text-center"
      title={title}
    />
    <div className={(images.length > 3) ? classes.column : classes.inline}>
      {images.map(infoImg => (
        <div
          className={classes.imageWrap}
          key={infoImg}
        >
          <Image
            src={infoImg}
            className={classNames(
              classes.image,
              'o-img-responsive',
            )}
          />
        </div>
      ))}
    </div>
  </>
)

export default React.memo(Infographics)
