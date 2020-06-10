import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'
import { $hasData } from 'weplay-core/$utils/$hasData'
import { transformUrl } from 'weplay-core/helpers/transformUrl'
import { getWriterUrl } from 'weplay-core/helpers/getWriterUrl'
import { getWriterTitle } from 'weplay-core/reduxs/helpers'
import { createColumnistLastArticleSelector } from 'weplay-core/reduxs/news/reducer'
import UserAvatar from 'weplay-components/UserAvatar'
import Skeleton from 'weplay-components/Skeleton'
import Link from 'weplay-components/Link'
import columnistPropType from 'weplay-media/customPropTypes/columnistPropType'

import styles from './styles.scss'

const ColumnistCard = ({
  columnist,
  modifier,
  isCompact,
  isSubheader,
}) => {
  const lastArticle = useSelector(createColumnistLastArticleSelector(columnist.authorId))

  const t = useTranslation()
  const title = useMemo(() => getWriterTitle(columnist), [columnist])
  const isLastArticleVisible = useMemo(() => $hasData(lastArticle) && isCompact, [lastArticle, isCompact])

  return (
    <div className={classNames(
      styles.block,
      { [styles[modifier]]: modifier },
    )}
    >
      <div className={styles.meta}>
        <div className={styles.picture}>
          <UserAvatar
            avatar={columnist.avatar?.path}
            className={styles.avatar}
          />
          <span className={styles.label}>{t('mediaCore.columnistCard.label')}</span>
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{title || <Skeleton width="100px" />}</h1>
          <span className={styles.description}>{columnist.regalia || <Skeleton width="80px" />}</span>

          {isLastArticleVisible && (
            <div className={styles.annotationBlock}>
              <p className={styles.annotation}>
                {`${t('mediaCore.columnistCard.article')}:`}
                <Link
                  to={`/news/${transformUrl(lastArticle)}`}
                  className={styles.link}
                >
                  {` ${lastArticle.description}`}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {!isCompact && (
        <div className={styles.content}>
          <p className={styles.text}>{columnist.shortDescription || <Skeleton />}</p>
          {!isSubheader && (
            <Link
              className={styles.link}
              to={`/columnists/${getWriterUrl(title, columnist.authorId)}`}
            >
              {t('mediaCore.columnistCard.readAll')}
              {title}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

ColumnistCard.propTypes = {
  columnist: columnistPropType,
  modifier: PropTypes.string,
  isCompact: PropTypes.bool,
  isSubheader: PropTypes.bool,
}

ColumnistCard.defaultProps = {
  columnist: {},
  modifier: '',
  isCompact: false,
  isSubheader: false,
}

export default ColumnistCard
