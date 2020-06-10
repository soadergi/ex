import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'weplay-components/Icon'

import styles from './styles.scss'
import container from './container'

const DotaUnderlordsGroupTableFooter = ({
  // required props

  // container props
  pointsDistribution,
  i18nTexts,

  // optional props
}) => (
  <div className={styles.block}>

    <div className={styles.column}>
      <span className={styles.description}>{i18nTexts.tournamentStages.dotaUnderlords.pointsDistribution}</span>
    </div>

    {pointsDistribution.map(point => (
      <div
        key={point.place}
        className={styles.column}
      >
        <span className={styles.place}>
          {point.iconCup && (
            <Icon
              iconName="cup"
              size="small"
              className={styles.iconCup}
            />
          )}
          {point.place}
        </span>
        <span className={styles.point}>
          {point.point}
        </span>
      </div>
    ))}
  </div>
)

DotaUnderlordsGroupTableFooter.propTypes = {
  // required props
  pointsDistribution: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,

  // container props

  // optional props
}

DotaUnderlordsGroupTableFooter.defaultProps = {
  // optional props
}

export default container(DotaUnderlordsGroupTableFooter)
