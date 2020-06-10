import React from 'react'
import PropTypes from 'prop-types'
import LocalizedMoment from 'weplay-components/LocalizedMoment'

import container from './container'
import styles from './styles.scss'

const Period = ({
  i18n,
  monthStart,
  monthEnd,
  dateStart,
  dateEnd,
}) => (
  <div className={styles.container}>
    <div className={styles.tile}>
      <LocalizedMoment
        dateTime={monthStart}
        formatKey="MMMM"
      />
&nbsp;
      <LocalizedMoment
        dateTime={dateStart}
        formatKey="MMMM"
      />
    </div>
    <span className={styles.delimeter}>{i18n.voting.periodDelimeter}</span>
    <div className={styles.tile}>
      <LocalizedMoment
        dateTime={monthEnd}
        formatKey="D"
      />
&nbsp;
      <LocalizedMoment
        dateTime={dateEnd}
        formatKey="D"
      />
    </div>
  </div>
)

Period.propTypes = {
  i18n: PropTypes.shape({
    voting: PropTypes.shape({
      periodDelimeter: PropTypes.string.isRequired,
    }),
  }).isRequired,
  monthStart: PropTypes.string.isRequired,
  monthEnd: PropTypes.string.isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
}

export default container(Period)
