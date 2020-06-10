import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import gridPropType from 'weplay-events/customPropTypes/gridPropType'

import CrossTable from './CrossTable/CrossTable'
import styles from './CrossTableSection.scss'

const CrossTableSection = ({
  matchMatrix,
  participants,
  grid,
  isDuplicatesVisible,
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <p className={styles.title}>
        {`${grid.name} ${t('events.roundRobin.crossTableSectionTitle')}`}
      </p>

      <CrossTable
        participants={participants}
        matchMatrix={matchMatrix}
        withDuplicates={isDuplicatesVisible}
      />
    </div>
  )
}

CrossTableSection.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
  matchMatrix: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  grid: gridPropType.isRequired,
  isDuplicatesVisible: PropTypes.bool.isRequired,
}

export default React.memo(CrossTableSection)
