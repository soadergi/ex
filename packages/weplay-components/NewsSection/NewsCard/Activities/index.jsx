import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LocalizedMoment from 'weplay-components/LocalizedMoment'
import { setCSSModifiers } from 'weplay-core/helpers/setCSSModifiers'

import container from './container'
import styles from './styles.scss'

const mods = [
  'white',
]

const Activities = ({
  className,
  modifiers,
  publishedDate,
  // optional props
}) => (
  <ul className={classNames(
    styles.block,
    className,
    setCSSModifiers(modifiers, styles),
  )}
  >
    {Boolean(publishedDate) && (
      <li className={styles.item}>
        <LocalizedMoment
          dateTime={publishedDate}
          formatKey="short"
        />
      </li>
    )}
  </ul>
)

Activities.propTypes = {
  // optional props
  className: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.oneOf(mods)),
  publishedDate: PropTypes.string,
}

Activities.defaultProps = {
  // optional props
  className: '',
  modifiers: [],
  publishedDate: null,
}

export default container(Activities)
