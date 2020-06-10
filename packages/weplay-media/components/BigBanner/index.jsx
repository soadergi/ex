import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'
import bigBannerPropType from 'weplay-media/customPropTypes/bigBannerPropType'
import Link from 'weplay-components/Link'
import Icon from 'weplay-components/Icon'
import useAction from 'weplay-core/helpers/useAction'
import { getBannerAccessKey } from 'weplay-media/reduxs/banners/actions'

import styles from './styles.scss'

const BigBanner = ({
  // required props
  banner,
  // optional props
  className,
}) => {
  const { sendAccessKey } = useAction({ sendAccessKey: getBannerAccessKey.request })
  const backgroundStyle = useMemo(() => ({ backgroundImage: `url(${banner.media[0]?.path})` }), [banner.media])
  const textStyle = useMemo(() => ({ color: banner.textColor }), [banner.textColor])
  const handleClick = useCallback(() => sendAccessKey(banner.accessKey), [sendAccessKey, banner.accessKey])

  return (
    <div
      className={classNames(
        styles.block,
        className,
      )}
      style={backgroundStyle}
    >
      <div className={styles.content}>
        <p
          style={textStyle}
          className={styles.title}
        >
          {banner.title}
        </p>
        {banner.text && (
        <p
          style={textStyle}
          className={styles.text}
        >
          {banner.text}
        </p>
        )}
        <Link
          className={styles.button}
          onClick={handleClick}
          {...getAnalyticsAttributes({
            category: 'сontent',
            action: 'bigbanner click',
            label: banner.id,
          })}
        >
          {banner.callToActionText}
          <Icon
            size="small"
            iconName="arrow-link"
            className="u-ml-1"
          />
        </Link>
      </div>
    </div>
  )
}

BigBanner.propTypes = {
  // required props
  banner: bigBannerPropType.isRequired,
  // optional props
  className: PropTypes.string,
}
BigBanner.defaultProps = {
  // optional props
  className: '',
}

export default React.memo(BigBanner)
