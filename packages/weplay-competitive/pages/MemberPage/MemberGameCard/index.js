import React from 'react'
import PropTypes from 'prop-types'

import Select from 'weplay-components/Select'
import Button from 'weplay-components/Button'

import TableRowTwoColumns from 'weplay-competitive/components/TableRowTwoColumns'
import GameStats from 'weplay-competitive/components/GameStats'

import styles from '../styles.scss'

import container from './container'

const MemberGameStats = ({
  // from container
  t,
  statistic,
  showSelect,
  showRole,
  selectOptions,
  activeRole,
  setActiveRole,
  placeholder,
  handlerSaveRole,
  isButtonDisabled,
}) => (
  <div className="u-mb-8">
    <p className={styles.subTitle}>
      {t('competitive.member.overview.discipline')}
    </p>
    <GameStats
      statistic={statistic}
    >
      {showRole && (
        <TableRowTwoColumns
          icon="mask"
          text={t('competitive.member.tournamentSection.gameStats.role')}
          value={showSelect ? '' : activeRole}
        >
          {showSelect && (
            <Select
              className={styles.select}
              placeholder={placeholder}
              options={selectOptions}
              value={activeRole}
              onChange={setActiveRole}
            />
          )}
        </TableRowTwoColumns>
      )}
    </GameStats>
    {showSelect && (
    <Button
      onClick={handlerSaveRole}
      disabled={isButtonDisabled}
    >
      {t('competitive.member.tournamentSection.submit')}
    </Button>
    )}
  </div>
)

MemberGameStats.propTypes = {
  t: PropTypes.func.isRequired,
  statistic: PropTypes.shape({}).isRequired,
  showSelect: PropTypes.bool.isRequired,
  showRole: PropTypes.bool.isRequired,
  selectOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  setActiveRole: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  handlerSaveRole: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  // optional props
  activeRole: PropTypes.string,
}

MemberGameStats.defaultProps = {
  // optional props
  activeRole: '',
}

export default container(MemberGameStats)
