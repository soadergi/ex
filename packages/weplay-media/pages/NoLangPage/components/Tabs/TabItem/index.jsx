import React from 'react'
import PropTypes from 'prop-types'
import Link from 'weplay-components/Link'
import { getIdFromUrl } from 'weplay-core/helpers/getIdFromUrl'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import container from './container'
import styles from './styles'

const TabItem = ({
  tab,
  logTabClick,
  isActive,
  match,
}) => {
  const t = useTranslation()
  const itemId = getIdFromUrl(match.params.itemId)
  if (isActive) {
    return <strong className={styles.text}>{t(`mediaCore.tabs.${tab}`)}</strong>
  }
  return (
    <li className={styles.block}>
      <Link
        to={`/${match.params.pathNamePrefix}/no-language-page-${itemId}/${tab}`}
        className={styles.link}
        onClick={logTabClick}
      >
        {t(`mediaCore.tabs.${tab}`)}
      </Link>
    </li>
  )
}

TabItem.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      itemId: PropTypes.string,
      pathNamePrefix: PropTypes.string,
    }).isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  tab: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  logTabClick: PropTypes.func.isRequired,
}

export default container(TabItem)
