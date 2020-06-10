import React, { useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { globalScopeSelector } from 'weplay-core/reduxs/common/selectors'

import { formatPrizeSumWithComaAndCurrency } from '../../CharityPlayBlock/helpers'

import styles from './styles.scss'

const centsInDollar = 100

const ResultsTableItem = ({
  item,
  isTop,
}) => {
  const t = useTranslation()
  const globalScope = useSelector(globalScopeSelector)

  const isMyDonation = useMemo(
    () => globalScope.localStorage.getItem('charityNickname') === item.nickname,
    [globalScope],
  )

  return (
    <tr className={classNames(
      styles.block,
      {
        [styles.isMyDonation]: isMyDonation,
      },
    )}
    >
      <td className={classNames(
        styles.column,
      )}
      >
        <p className={styles.subText}>
          {item?.nickname ?? ''}
        </p>
      </td>
      <td className={classNames(
        styles.column,
      )}
      >
        {isTop && (
        <p className={styles.subText}>
          <span
            role="img"
            aria-label="heart"
          >
            💙
          </span>
          <span className={styles.topText}>
            {t('charity.resultTable.top')}
          </span>
        </p>
        )}
      </td>
      <td className={classNames(
        styles.column,
      )}
      >
        <p className={styles.main}>
          {formatPrizeSumWithComaAndCurrency(item.donatedMoney / centsInDollar) }
        </p>
      </td>
    </tr>
  )
}

ResultsTableItem.propTypes = {
  item: PropTypes.shape({
    nickname: PropTypes.string,
    donatedMoney: PropTypes.number,
  }).isRequired,
  isTop: PropTypes.bool.isRequired,
}

ResultsTableItem.defaultProps = {
  // optional props
}

export default ResultsTableItem
