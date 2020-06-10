import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Link from 'weplay-components/Link'
import Image from 'weplay-components/Image'

import styles from './styles.scss'

const SectionEventHeader = ({
  // required props
  title,

  // optional props
  children,
  linkUrl,
  linkText,
  description,
  sponsorImage,
  linkImageUrl,
  className,
  customLinks,
}) => {
  const t = useTranslation()

  return (
    <div className={classNames(
      styles.block,
      className,
      { [styles.hasDescription]: description },
    )}
    >
      <div>
        <div className={styles.wrap}>
          <p className={styles.title}>{title}</p>

          <div className={styles.wrapSelect}>{children}</div>
        </div>

        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>

      <div className={styles.rightPart}>
        {customLinks.length > 0 && (
          <>
            <span className={styles.text}>{`${t('events.eventsRootPage.futureEventsBlock.body.rulesLink')}:`}</span>

            {customLinks.map(customLink => (
              <Link
                key={customLink.url}
                to={customLink.url}
                className={styles.link}
                target="_blank"
              >
                {customLink.label}
              </Link>
            ))}
          </>
        )}

        {(linkUrl && linkText) && (
          <Link
            to={linkUrl}
            className={styles.link}
            target="_blank"
          >
            {linkText}
          </Link>
        )}

        {sponsorImage && (
          <Link
            to={linkImageUrl}
            target="_blank"
          >
            <Image
              className={styles.sponsorImage}
              src={sponsorImage}
              alt=""
            />
          </Link>
        )}
      </div>
    </div>
  )
}

SectionEventHeader.propTypes = {
  // required props
  title: PropTypes.string.isRequired,

  // optional props
  className: PropTypes.string,
  children: PropTypes.node,
  linkUrl: PropTypes.string,
  linkText: PropTypes.string,
  linkImageUrl: PropTypes.string,
  description: PropTypes.string,
  sponsorImage: PropTypes.string,
  customLinks: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    label: PropTypes.string,
  })),
}

SectionEventHeader.defaultProps = {
  children: null,
  className: '',
  linkUrl: '',
  linkText: '',
  linkImageUrl: '',
  description: '',
  sponsorImage: '',
  customLinks: [],
}

export default React.memo(SectionEventHeader)
