import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'
import UserAvatar from 'weplay-components/UserAvatar'
import Wrapper from 'weplay-competitive/components/Wrapper'
import WrapperOverflowX from 'weplay-competitive/components/WrapperOverflowX'
import TableHeaderRow from 'weplay-competitive/components/TableHeaderRow'
import TableRow from 'weplay-competitive/components/TableRow'
import MatchParticipant from 'weplay-competitive/components/MatchParticipant'

import Legend from '../Legend'

import container from './container'
import GroupCell from './GroupCell'
import WithMember from './WithMember'
import styles from './styles.scss'

const GroupBlock = ({
  // required props

  // container props
  bracketMatrix,
  tournamentMembersIds,
  tournamentId,
  tournamentName,
  isSingleGameMode,
  scoreArray,
  // optional props

  // props from HOCs
  discipline,

}) => {
  const t = useTranslation()

  return (
    tournamentMembersIds.length
      ? (
        <>
          <Wrapper>
            <header className={styles.header}>
              <div className={styles.title}>
                <p className={styles.titleText}>{t('competitive.tournament.brackets.title')}</p>
              </div>
              <Legend />
            </header>
          </Wrapper>

          <WrapperOverflowX>
            <table className={styles.table}>
              <TableHeaderRow className={styles.tableHeader}>
                <th className={styles.cell}>№</th>
                <th className={styles.cell}>
                  {isSingleGameMode
                    ? t('competitive.tournament.brackets.player')
                    : t('competitive.tournament.brackets.team')}
                </th>
                <th className={styles.cell}>
                  {t('competitive.tournament.brackets.score')}
                </th>
                {tournamentMembersIds.map((id, index) => (
                  <th
                    key={id}
                    className={styles.cell}
                  >
                    {index + 1}
                    {' '}
                    <WithMember
                      tournamentMemberId={id}
                      tournamentMembersIds={tournamentMembersIds}
                      tournamentId={tournamentId}
                    >
                      {member => member.isFetched
                        && (
                        <UserAvatar
                          avatar={isSingleGameMode ? R.pathOr('', ['user', 'avatar'])(member) : member.avatar}
                          className={styles.avatar}
                          isPremiumAccount={R.pathOr(false, ['user', 'isPremiumAccount'])(member)}
                          size="32"
                        />
                        )}
                    </WithMember>

                  </th>
                ))}
              </TableHeaderRow>
              <tbody>
                {tournamentMembersIds.map((id, index) => (
                  <TableRow
                    className={styles.tableRow}
                    key={id}
                  >
                    <td className={styles.cell}>{index + 1}</td>
                    <td className={styles.cell}>
                      <WithMember
                        tournamentMemberId={id}
                        tournamentMembersIds={tournamentMembersIds}
                        tournamentId={tournamentId}
                      >
                        {member => member.isFetched && (
                        <MatchParticipant
                          name={isSingleGameMode ? R.pathOr('', ['user', 'nickname'], member) : member.name}
                          avatar={isSingleGameMode ? R.pathOr('', ['user', 'avatar'], member) : member.avatar}
                          link={pathWithParamsByRoute(
                            NAMES[member.type.toUpperCase()],
                            {
                              memberId: member.id,
                              memberName: transliterate(R.pathOr('', ['user', 'nickname'], member)),
                              teamId: member.id,
                              teamName: transliterate(member.name || ''),
                              discipline,
                            },
                          )}
                        />
                        )}
                      </WithMember>
                    </td>
                    <td className={styles.cell}>{scoreArray[index]}</td>
                    {bracketMatrix[index].map(match => (
                      <GroupCell
                        key={`${id}_${match.id}`}
                        currentMatch={match}
                        currentMemberId={id}
                        className={styles.cell}
                        discipline={discipline}
                        tournamentId={tournamentId}
                        tournamentName={tournamentName}
                      />
                    ))}
                  </TableRow>
                ))}
              </tbody>
            </table>
          </WrapperOverflowX>
        </>
      )
      : null)
}

GroupBlock.propTypes = {
  // required props

  // container props
  bracketMatrix: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({}),
    ),
  ).isRequired,
  tournamentMembersIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  tournamentId: PropTypes.number.isRequired,
  tournamentName: PropTypes.string.isRequired,
  isSingleGameMode: PropTypes.bool.isRequired,
  scoreArray: PropTypes.arrayOf(
    PropTypes.number,
  ).isRequired,

  // optional props

  // props from HOCs
  discipline: PropTypes.string.isRequired,
}

GroupBlock.defaultProps = {
  // optional props
}

export default container(GroupBlock)
