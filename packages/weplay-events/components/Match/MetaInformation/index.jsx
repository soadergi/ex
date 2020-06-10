import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import roundPropType from 'weplay-events/customPropTypes/roundPropType'

import styles from './styles.scss'

const MetaInformation = ({ round, className }) => (
  <div className={classNames([styles.root, className])}>
    {!round.isHidden && (
      <p className={styles.text}>
        {round.name}
      </p>
    )}
  </div>
)

MetaInformation.propTypes = {
  round: roundPropType.isRequired,
  className: PropTypes.string,
}

MetaInformation.defaultProps = {
  className: '',
}

export default React.memo(MetaInformation)
