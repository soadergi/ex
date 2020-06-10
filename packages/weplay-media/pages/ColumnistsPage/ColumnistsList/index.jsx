import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import ColumnistCard from 'weplay-media/components/ColumnistCard'
import columnistPropType from 'weplay-media/customPropTypes/columnistPropType'

import styles from './styles.scss'

const ColumnistsList = ({
  columnists,
  onClick,
  hasMore,
}) => {
  const t = useTranslation()

  return (
    <div className={styles.block}>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>
          {t('mediaCore.columnists.mostReadable')}
        </h3>

        <div className={styles.grid}>
          {columnists.map((columnist, index) => (
            <div
              className={styles.cards}
              key={columnist?.authorId ?? index}
            >
              <ColumnistCard
                columnist={columnist}
                modifier="cardLight"
                isCompact
              />
            </div>
          ))}
        </div>

        <div className={classNames(
          styles.showMore,
          styles.isShown,
          'u-pb-0',
        )}
        >
          {hasMore && (
            <Button
              onClick={onClick}
              icon="load-more"
              priority={BUTTON_PRIORITY.SECONDARY}
              className={styles.loadMore}
            >
              {t('button.loadMore')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

ColumnistsList.propTypes = {
  columnists: PropTypes.arrayOf(columnistPropType).isRequired,
  onClick: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
}

export default ColumnistsList
