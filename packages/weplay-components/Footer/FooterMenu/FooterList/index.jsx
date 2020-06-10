import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import NotConnectedLink from 'weplay-components/Link/NotConnectedLink'

import container from './container'
import styles from './styles.scss'

const FooterList = ({
  // required props
  list,
  currentLanguage,
  // container props
  // optional props
  className,
}) => (
  <ul className={classNames(
    styles.block,
    className,
  )}
  >
    {list.map(link => (
      <li key={link.id}>
        <NotConnectedLink
          to={link.localizations.url}
          className={classNames(
            styles.link,
            link.isHighlighted && styles.highlight,
          )}
          locale={currentLanguage}
          {...getAnalyticsAttributes(link.analyticsAttributes)}
        >
          {link.localizations.text}
        </NotConnectedLink>
      </li>
    ))}
  </ul>
)

FooterList.propTypes = {
  // required props
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    localizations: PropTypes.shape({
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  })).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  // container props
  // optional props
  className: PropTypes.string,
}

FooterList.defaultProps = {
  className: '',
}

export default container(FooterList)
