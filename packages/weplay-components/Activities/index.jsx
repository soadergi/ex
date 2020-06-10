import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import LocalizedMoment from 'weplay-components/LocalizedMoment'

import Activity from './Activity'
import styles from './styles.scss'

const Activities = ({
  publishedDate,
  modifications,
  className,
}) => (
  <ul
    className={classNames(
      styles.activities,
      className,
      modifications.map(modification => styles[modification]),
    )}
  >
    <Activity
      activityIcon="clock"
      className={styles.item}
      modifications={modifications}
    >
      <LocalizedMoment
        dateTime={publishedDate}
        formatKey="short"
      />
    </Activity>
  </ul>
)

Activities.propTypes = {
  publishedDate: PropTypes.string.isRequired,
  modifications: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
}

Activities.defaultProps = {
  modifications: [],
  className: '',
}

export default React.memo(Activities)
