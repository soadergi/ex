import React, { useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { NAMES, pathWithParamsByRoute } from 'weplay-core/routes'
import transliterate from 'weplay-core/helpers/translit'
import { $propEq } from 'weplay-core/$utils/$propEq'

import Link from 'weplay-components/Link'
import UserAvatar from 'weplay-components/UserAvatar'
import Icon from 'weplay-components/Icon'

import { memberInfoSelectors } from 'weplay-competitive/reduxs/memberInfoV3'
import TableRow from 'weplay-competitive/components/TableRow'
import useDiscipline from 'weplay-competitive/hooks/useDiscipline'

import styles from './styles.scss'

const highlightPlacesFrom = 3

const LadderTableRow = ({
  score,
  place,
  isCurrentMember,
  prizes,
  memberId,
}) => {
  const t = useTranslation()
  const { tournamentDiscipline } = useDiscipline()

  const member = useSelector(
    memberInfoSelectors.createRecordByIdSelector(memberId),
  )

  const prize = useMemo(
    () => prizes.find($propEq('place', place)),
    [prizes, place],
  )

  const userAvatarResponsive = {
    sm: '40',
  }

  const pathToMember = pathWithParamsByRoute(
    NAMES.MEMBER,
    {
      memberId: member?.id ?? '',
      memberName: transliterate(member?.nickname ?? ''),
      discipline: tournamentDiscipline.url,
    },
  )

  const defaultPrizeDescription = isCurrentMember
    ? t('competitive.ladders.table.getToTop')
    : ''

  return (
    <TableRow className={classNames(
      styles.block,
      {
        [styles.isCurrentMember]: place > highlightPlacesFrom && isCurrentMember,
      },
    )}
    >
      <td className={classNames(
        styles.column,
        styles.header,
        styles.num,
      )}
      >
        <Icon
          size="24"
          iconName="tournaments"
          className={styles.iconCup}
        />
        {place}
      </td>
      <td className={classNames(
        styles.column,
        styles.header,
      )}
      >
        <div className={styles.headerWrapper}>
          <Link to={pathToMember}>
            <UserAvatar
              avatar={member.avatar}
              isPremiumAccount={member.isPremiumAccount}
              size="32"
              responsive={userAvatarResponsive}
            />
          </Link>
          <div className={styles.headerText}>
            <Link
              to={pathToMember}
              className={styles.title}
            >
              {member?.nickname ?? ''}
            </Link>
          </div>
        </div>
      </td>
      <td className={classNames(
        styles.column,
        styles.header,
        styles.points,
      )}
      >
        <p className={styles.subText}>
          {score.score}
        </p>
      </td>
      {/* TODO: @rbogdanov #ladder uncomment on backend ready */}
      {/* <td className={classNames( */}
      {/*  styles.column, */}
      {/*  styles.header, */}
      {/*  styles.points, */}
      {/* )} */}
      {/* > */}
      {/*  <p className={styles.subText}> */}
      {/*    {score?.matches ?? 'matchi?'} */}
      {/*  </p> */}
      {/* </td> */}
      <td className={classNames(
        styles.column,
        styles.header,
        styles.footer,
      )}
      >
        <p className={classNames(
          styles.subText,
          styles.prize,
        )}
        >
          {prize?.description || defaultPrizeDescription}
        </p>
      </td>
    </TableRow>
  )
}

LadderTableRow.propTypes = {
  score: PropTypes.number.isRequired,
  place: PropTypes.number.isRequired,
  isCurrentMember: PropTypes.bool.isRequired,
  memberId: PropTypes.number.isRequired,
  prizes: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
    }),
  ).isRequired,
}

LadderTableRow.defaultProps = {
  // optional props
}

export default LadderTableRow
