import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import NewspaperCard from 'weplay-components/NewspaperCard'

import Similar from './Similar'
import container from './container'
import styles from './styles.scss'

const SIMPLE_BLOCK = 'Similar Simple Block'
const EXTEND_BLOCK = 'Similar Cards Block'

const Similars = ({
  // required props
  // container props
  similarNews,
  logSimilarClickWithParams,
  // optional props
  isFullCard,
  isBottom,
  hasTitle,
  title,
}) => (
  <div className={styles.block}>
    <div className={styles.wrapper}>
      {hasTitle && (
      <p className={styles.title}>{title}</p>
      )}
      <div className={classNames(
        styles.list,
        { [styles.bottom]: isBottom },
      )}
      >
        {similarNews.map((newspaper, index) => (
          <Fragment key={newspaper?.newsId ?? index}>
            {isFullCard ? (
              <NewspaperCard
                newspaper={newspaper}
                handleClick={logSimilarClickWithParams(EXTEND_BLOCK, index)}
                isBordered
              />
            ) : (
              <Similar
                newspaper={newspaper}
                handleClick={logSimilarClickWithParams(SIMPLE_BLOCK, index)}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  </div>
)

Similars.propTypes = {
  // required props
  // container props
  similarNews: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  logSimilarClickWithParams: PropTypes.func.isRequired,
  // optional props
  isFullCard: PropTypes.bool,
  isBottom: PropTypes.bool,
  hasTitle: PropTypes.bool,
  title: PropTypes.string.isRequired,
}

Similars.defaultProps = {
  isFullCard: false,
  isBottom: false,
  hasTitle: true,
}

export default container(Similars)
