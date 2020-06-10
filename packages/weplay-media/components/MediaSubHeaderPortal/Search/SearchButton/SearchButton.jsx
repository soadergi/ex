import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'
import withRouteInfo from 'weplay-core/routes/withRouteInfo'

import Icon from 'weplay-components/Icon'

import styles from './SearchButton.scss'

const SearchButton = ({
  // required props
  // container props
  // optional props
  openSearchModal,
}) => {
  const t = useTranslation()
  const isTabletWidth = useSelector(isTabletWidthSelector)
  return (
    <button
      type="button"
      className={classNames(
        styles.block,
        { [styles.mobile]: isTabletWidth },
      )}
      onClick={openSearchModal}
    >
      <div className={styles.search}>
        {isTabletWidth && (
          <span className={styles.text}>{t('mediaCore.modals.search.button')}</span>
        )}

        <Icon
          iconName="search"
          size="small"
          className={styles.icon}
        />
      </div>
    </button>
  )
}

SearchButton.propTypes = {
  // required props

  // container props
  // optional props
  openSearchModal: PropTypes.func.isRequired,
}

SearchButton.defaultProps = {
  // optional props
}

export default withRouteInfo(SearchButton)
