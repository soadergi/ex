import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import container from './container'
import { SORT } from './consts'
import styles from './styles.scss'

const Filters = ({
  i18nTexts,
  handlerSortPoplar,
  handlerSortAll,
  value,
}) => (
  <ul className={styles.block}>
    <li className={styles.item}>
      <a
        onClick={handlerSortPoplar}
        data-qa-id={dataQaIds.pages.articlePage.comments.filters[value === SORT.POPULAR ? 'linkActive' : 'link']}
        className={classNames(
          styles.button,
          {
            [styles.isActive]: value === SORT.POPULAR,
          },
        )}
      >
        {i18nTexts.comments.popular}
      </a>
    </li>
    <li className={styles.item}>
      <a
        onClick={handlerSortAll}
        data-qa-id={dataQaIds.pages.articlePage.comments.filters[value === SORT.ALL ? 'linkActive' : 'link']}
        className={classNames(
          styles.button,
          {
            [styles.isActive]: value === SORT.ALL,
          },
        )}
      >
        {i18nTexts.comments.all}
      </a>
    </li>
  </ul>
)

Filters.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  handlerSortAll: PropTypes.func.isRequired,
  handlerSortPoplar: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
}

export default container(Filters)
