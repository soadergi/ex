import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import TableHeaderRow from 'weplay-competitive/components/TableHeaderRow'
import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const MatchHeader = ({
  // required props
  discipline,
  // props from container
  // optional props
}) => {
  const t = useTranslation()
  return (
    <TableHeaderRow isDefault>
      <th>{t('competitive.member.matchesSection.tableDateTitle')}</th>
      <th>{t('competitive.member.matchesSection.tableStatusTitle')}</th>
      <th>{t('competitive.member.matchesSection.tableModeTitle')}</th>
      <th>{t('competitive.member.matchesSection.tableScoreTitle')}</th>
      <th>{t(`competitive.member.matchesSection.${DISCIPLINES[discipline].pool}`)}</th>
      <th aria-label="th" />
    </TableHeaderRow>
  )
}

MatchHeader.propTypes = {
  // required props
  discipline: PropTypes.string.isRequired,
  // props from container

  // optional props
}

MatchHeader.defaultProps = {
  // optional props
}

export default MatchHeader
