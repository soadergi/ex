import React from 'react'
import classNames from 'classnames'
import BookmarkIcon from 'weplay-components/BookmarkIcon'
import PropTypes from 'prop-types'
import SocialShareButton from 'weplay-components/SocialShareButton/loadable'
import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

import { socials } from '../config'

import styles from './styles.scss'

const buttonModification = ['article']

const NewspaperSocialShareBlock = ({
  // required props
  newspaperId,
  isBookmarked,
  // container props
  // optional props
  isHorizontal,
  className,
}) => {
  const { locale } = useLocale()
  return (
    <div>
      <ul className={classNames(
        styles.block,
        className,
        {
          [styles.horizontal]: isHorizontal,
        },
      )}
      >
        <li className={classNames(
          styles.item,
          styles.bookmark,
        )}
        >
          <BookmarkIcon
            color="blue"
            newspaperId={newspaperId}
            isBookmarked={isBookmarked}
          />
        </li>
        {socials[locale].map(social => (
          <li
            className={styles.item}
            key={social}
          >
            <SocialShareButton
              social={social}
              modifiers={buttonModification}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

NewspaperSocialShareBlock.propTypes = {
  // required props
  newspaperId: PropTypes.number.isRequired,
  isBookmarked: PropTypes.bool.isRequired,
  // container props
  // optional props
  isHorizontal: PropTypes.bool,
  className: PropTypes.string,
}

NewspaperSocialShareBlock.defaultProps = {
  // optional props
  isHorizontal: false,
  className: '',
}

export default React.memo(NewspaperSocialShareBlock)
