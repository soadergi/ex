import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'
import PromoCodeForm from 'weplay-events/components/PromoCodeForm'
import Image from 'weplay-components/Image'

import container from './container'
import styles from './styles.scss'
import OrderedList from './OrderedList'
import { mods } from './mods'

const PromoCodesBanner = ({
  // required props
  promocodesCount,
  agreementUrls,
  i18nTexts,
  pageName,

  // props from container
  stepsList,

  // optional props
  isTabletWidth,
  registrationSource,
  modifiers,
  images,
}) => (
  <div className={classNames(
    styles.block,
    setCSSModifiers(modifiers, styles),
    styles[pageName],
  )}
  >
    <div className={styles.container}>
      <div
        style={{ backgroundImage: images.background }}
        className={styles.background}
      />

      <div className={styles.grid}>
        <div className={styles.descriptionBlock}>
          <p className={styles.title}>{i18nTexts[pageName].codes.titleList}</p>

          <OrderedList
            list={stepsList}
            modifiers={modifiers}
          />
        </div>

        <div className={styles.formBlock}>
          <p className={styles.formTitle}>
            <span>
              {`${promocodesCount} ${i18nTexts[pageName].codes.subTitleFirst}`}
            </span>

            {!isTabletWidth && (
              <a
                href={agreementUrls}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.rulesLink}
              >
                {i18nTexts[pageName].codes.ruleLink}
              </a>
            )}
          </p>

          <PromoCodeForm
            registrationSource={registrationSource}
          />

          <p className={styles.info}>{i18nTexts[pageName].codes.info}</p>

          {isTabletWidth && (
            <a
              href={agreementUrls}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rulesLink}
            >
              {i18nTexts[pageName].codes.ruleLink}
            </a>
          )}
        </div>
      </div>
    </div>

    {images.additional.map(image => (
      image.url && (
        <div
          key={image.url}
          className={
          classNames(
            styles.decorImage,
            styles[image.className],
          )
        }
        >
          <Image
            className="o-img-responsive"
            src={image.url}
            alt=""
          />
        </div>
      )
    ))}
  </div>
)

PromoCodesBanner.propTypes = {
  // required props
  promocodesCount: PropTypes.string.isRequired,
  agreementUrls: PropTypes.string.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,
  pageName: PropTypes.string.isRequired,
  images: PropTypes.shape({
    background: PropTypes.string.isRequired,
    additional: PropTypes.array.isRequired,
  }).isRequired,
  isTabletWidth: PropTypes.bool.isRequired,

  // props from container
  stepsList: PropTypes.arrayOf(PropTypes.string).isRequired,

  // optional props
  modifiers: PropTypes.arrayOf(
    PropTypes.oneOf(
      mods.map(mod => mod),
    ),
  ),
  registrationSource: PropTypes.string,
}

PromoCodesBanner.defaultProps = {
  modifiers: [],
  registrationSource: '',
}
export default container(PromoCodesBanner)
