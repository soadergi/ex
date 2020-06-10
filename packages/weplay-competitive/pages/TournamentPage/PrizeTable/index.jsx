import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import CollapsibleTable from 'weplay-competitive/components/CollapsibleTable'
import TableRowTwoColumns from 'weplay-competitive/components/TableRowTwoColumns'
import Wrapper from 'weplay-competitive/components/Wrapper'

import container from './container'
import styles from './styles.scss'

const wrapperModification = ['content']

const PrizeTable = ({
  // required props

  // container props
  t,
  clickHandler,
  prizesRecords,
  prizes,
  isOpen,
  minPrizesCountForSpoiler,
  // optional props
  className,
}) => (
  <Wrapper className={className}>
    <Wrapper modifiers={wrapperModification}>
      <CollapsibleTable
        title={t('competitive.tournament.prizePool.tableTitle')}
        isOpen={isOpen}
        hasSpoilerTrigger={prizes.length >= minPrizesCountForSpoiler}
        isSectionTitle
        clickHandler={clickHandler}
      >
        {prizesRecords.map((record, index) => (
          <TableRowTwoColumns
            key={record.text}
            value={record.value}
            text={record.text}
            icon={index <= 2 ? 'cup' : ''}
            iconClassName={classNames(
              {
                [styles.gold]: index === 0,
                [styles.silver]: index === 1,
                [styles.bronze]: index === 2,
              },
            )}
          />
        ))}
        {(!isOpen && prizes.length >= minPrizesCountForSpoiler) && (
          <>
            <div onClick={clickHandler}>
              <TableRowTwoColumns
                text="..."
              />
            </div>

            <TableRowTwoColumns
              text={prizes[prizes.length - 1].text}
              value={prizes[prizes.length - 1].value}
            />
          </>
        )}

      </CollapsibleTable>
    </Wrapper>
  </Wrapper>
)

PrizeTable.propTypes = {
  // required props
  prizesRecords: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string]),
    value: PropTypes.string,
  })).isRequired,
  prizes: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string]),
    value: PropTypes.string,
  })).isRequired,
  // container props
  clickHandler: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  minPrizesCountForSpoiler: PropTypes.number.isRequired,
  // optional props
  className: PropTypes.string,
}

PrizeTable.defaultProps = {
  // optional props
  className: '',
}

export default container(PrizeTable)
