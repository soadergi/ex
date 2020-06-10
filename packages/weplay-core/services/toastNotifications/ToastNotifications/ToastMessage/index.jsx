import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

import Icon from '../ToastIcon'

import container from './container'
import styles from './styles.scss'
// TODO: think about moving this to components, but how to leave service in core in this case?
const ToastMessage = ({
  // required props
  content,
  type,
  // container props
  i18nTexts,
  moment,
  currentLanguage,
  categoryText,
  dateTime,
  // optional props
}) => (
  <div
    className={classNames(
      styles.block,
      styles[type],
    )}
  >
    <Icon
      iconName="weplay"
      className={styles.icon}
    />
    <p className={styles.text}>
      {content}
    </p>
    <div className={styles.infoWrap}>
      <span className="u-text-bold">
        {categoryText}
      </span>
      <ul className={styles.date}>
        <li>
          {moment(dateTime)
            .locale(currentLanguage)
            .format(i18nTexts.date.formats.dateMonthYear)
          }
        </li>
        <li>
          {moment(dateTime)
            .locale(currentLanguage)
            .format(i18nTexts.date.formats['24h'])
          }
        </li>
      </ul>
    </div>
  </div>
)

ToastMessage.propTypes = {
  // required props
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  // container props
  i18nTexts: PropTypes.shape({}).isRequired,
  moment: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  categoryText: PropTypes.string.isRequired,
  dateTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  // optional props
}

export default container(ToastMessage)
