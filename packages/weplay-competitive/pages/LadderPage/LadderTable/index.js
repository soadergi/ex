import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { currentMemberSelector } from 'weplay-competitive/reduxs/members/selectors'

import LadderTableRow from './LadderTableRow'
import { useLadderScores } from './useLadderScores'
import { useIsMyScoreInScores } from './useIsMyScoreInScores'
import { useQueryLadderMembersInfo } from './useQueryLadderMembersInfo'
import styles from './styles.scss'

const LadderTable = ({
  prizes,
}) => {
  const t = useTranslation()
  const currentMember = useSelector(currentMemberSelector)
  const ladderTableConfig = useMemo(
    () => ({
      columns: [
        {
          title: 'No.',
        },
        {
          title: t('competitive.ladders.table.nickname'),
        },
        {
          title: t('competitive.ladders.table.points'),
        },
        // TODO: @rbogdanov #ladder uncomment on backend ready
        // {
        //   title: t('competitive.ladders.table.matches'),
        // },
        {
          title: t('competitive.ladders.table.prizes'),
        },
      ],
    }),
    [t],
  )

  const { userScore, sortedScores } = useLadderScores()

  const isMyScoreInScores = useIsMyScoreInScores()

  useQueryLadderMembersInfo()

  return (
    <>
      <table className={styles.ladderTable}>
        <thead className={styles.header}>
          <tr>
            {ladderTableConfig.columns.map(column => (
              <td
                key={column.title}
                className={styles.item}
              >
                {column.title}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {
            sortedScores.map((score, index) => (
              <LadderTableRow
                key={score.userId}
                prizes={prizes}
                score={score}
                memberId={score.userId}
                isCurrentMember={score.userId === currentMember.id}
                place={index + 1}
              />
            ))
          }
          {(userScore.isFetched && !isMyScoreInScores) && (
            <LadderTableRow
              prizes={prizes}
              score={userScore}
              isCurrentMember
              memberId={currentMember.id}
              place={userScore.place}
            />
          )}
        </tbody>
      </table>
    </>
  )
}

LadderTable.propTypes = {
  // required props
  prizes: PropTypes.arrayOf(
    PropTypes.shape({
      place: PropTypes.number,
      description: PropTypes.string,
    }),
  ),
  // optional props
}

LadderTable.defaultProps = {
  // optional props
  prizes: [],
}

export default LadderTable
