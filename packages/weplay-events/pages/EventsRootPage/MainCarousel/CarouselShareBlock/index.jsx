import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'
import ShareBlock from 'weplay-components/ShareBlock/ShareBlock'
import Link from 'weplay-components/Link'

import container from './container'
import styles from './styles.scss'

const CarouselShareBlock = ({
  // required props

  // container props
  i18nTexts,
  url,

  // optional props
  hasDescription,
}) => (
  <div>
    {!hasDescription && (
      <p className={styles.description}>{i18nTexts.events.eventsRootPage.mainSection.description}</p>
    )}

    <div className={styles.wrapContent}>
      <ShareBlock
        url={url}
        position="TopSlider"
        color="hasBorderMultiColored"
      />

      {url && (
        <div className={styles.buttonWrap}>
          <span className={styles.grayLine} />

          <Link
            to={url}
            rel="noreferrer noopener"
            target="_blank"
            className={styles.link}
          >
            <span className={styles.text}>{i18nTexts.events.eventsRootPage.mainSection.linkText}</span>

            <Icon
              size="small"
              iconName="arrow-link"
              className={styles.iconArrow}
            />
          </Link>
        </div>
      )}
    </div>
  </div>

)

CarouselShareBlock.propTypes = {
  // required props

  // container props
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
  url: PropTypes.string,
  hasDescription: PropTypes.bool,
}

CarouselShareBlock.defaultProps = {
  // optional props
  url: '',
  hasDescription: false,
}

export default container(CarouselShareBlock)
