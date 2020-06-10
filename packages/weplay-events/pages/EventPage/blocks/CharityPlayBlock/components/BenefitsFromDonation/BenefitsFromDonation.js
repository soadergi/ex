import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Scrollbars } from 'react-custom-scrollbars'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Icon from 'weplay-components/Icon'

import PrizeSum from '../PrizeSum'

import styles from './BenefitsFromDonation.scss'

const BenefitsFromDonation = ({ milestones, totalAmount }) => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)

  const list = useMemo(() => milestones.map(milestone => (
    <div
      key={milestone.title}
      className={classNames(
        { [styles.hasDone]: milestone.amount !== 0 && milestone.amount <= totalAmount },
      )}
    >
      {
        milestone.amount === 0 ? (
          <p className={styles.sum}>TBA</p>
        ) : (
          <PrizeSum
            className={styles.sum}
            value={milestone.amount}
          >
            {milestone.amount !== 0 && milestone.amount <= totalAmount && (
              <Icon
                size="small"
                iconName="check"
                className={styles.icon}
              />
            )}
          </PrizeSum>
        )
      }

      <p className={styles.title}>{t(milestone.title)}</p>
      <p className={styles.text}>{t(milestone.description)}</p>
    </div>
  )), [milestones, totalAmount, t])

  return (
    <div className={classNames(
      styles.block,
      { [styles.isDesktopWidth]: !isMobileWidth },
    )}
    >
      {isMobileWidth ? (
        <Scrollbars
          autoHide
          autoHeight
          autoHeightMin={145}
          autoHeightMax={574}
        >
          <div className={styles.wrap}>
            {list}
          </div>
        </Scrollbars>
      ) : list}
    </div>
  )
}

BenefitsFromDonation.propTypes = {
  milestones: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  })).isRequired,
  totalAmount: PropTypes.number.isRequired,
}

export default React.memo(BenefitsFromDonation)
