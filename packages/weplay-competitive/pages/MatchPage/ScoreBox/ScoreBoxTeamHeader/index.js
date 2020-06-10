import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import TableHeaderRow from 'weplay-competitive/components/TableHeaderRow'
import container from 'weplay-competitive/pages/MatchPage/ScoreBox/ScoreBoxTeamHeader/container'

const ScoreBoxTeamHeader = ({
  // required props

  // props from container
  scoreBoxCells,
  discipline,
  // optional props
}) => {
  const t = useTranslation()

  return (
    <TableHeaderRow isDefault>
      <th>{t('competitive.scorebox.common.playerTitle')}</th>
      {scoreBoxCells.map(
        cell => (
          <th
            title={t(`competitive.scorebox.${[discipline][cell.name]}`)}
            key={cell.name}
          >
            {cell.shortName.toUpperCase()}
          </th>
        ),
      )}
    </TableHeaderRow>
  )
}

ScoreBoxTeamHeader.propTypes = {
  // required props
  discipline: PropTypes.string.isRequired,
  scoreBoxCells: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  // props from container

  // optional props
}

ScoreBoxTeamHeader.defaultProps = {
  // optional props
}

export default container(ScoreBoxTeamHeader)
