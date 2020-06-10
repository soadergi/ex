import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Select from 'weplay-components/Select'

import styles from './styles.scss'
import container from './container'
import MediaCounter from './MediaCounter'
import SearchInput from './SearchInput'

const dropdownStyle = { width: '170px', height: '2rem' }

const MyMediaFilters = ({
  // required props
  // props from container
  handleDropdownChange,
  handleToggleDirection,
  handleClearButtonClick,
  dropdownOptions,
  viewOptions,
  isSearchFilterActive,
  asyncSearchTimeout,
  onChange,
  hasCounter,
  hasClearButton,
  userArticlesCount,
  pageName,
  userArticlesLoading,
}) => {
  const t = useTranslation()
  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <div className={styles.form}>
          <SearchInput
            viewOptions={viewOptions}
            isSearchFilterActive={isSearchFilterActive}
            asyncSearchTimeout={asyncSearchTimeout}
            onChange={onChange}
          />
        </div>
        {hasCounter && (
          <MediaCounter
            isSearchFilterActive={isSearchFilterActive}
            userArticlesCount={userArticlesCount}
            pageName={pageName}
            userArticlesLoading={userArticlesLoading}
          />
        )}
      </div>
      <div className={classNames(
        styles.selectors,
        { [styles.alignRight]: !hasClearButton },
      )}
      >
        {hasClearButton && (
          <button
            type="button"
            className={styles.reset}
            onClick={handleClearButtonClick}
          >
            {t(`mediaCore.profile.sorting.${pageName}.clear`)}
          </button>
        )}
        <div className={styles.filterPopular}>
          <Select
            value={viewOptions.sortType}
            options={dropdownOptions}
            onChange={handleDropdownChange}
            style={dropdownStyle}
          />
          <button
            type="button"
            onClick={handleToggleDirection}
            className={classNames(
              styles.toggle,
              { [styles.active]: viewOptions.sortDesc },
            )}
          >
            <span className={styles.arrow} />
          </button>
        </div>
      </div>
    </div>
  )
}

MyMediaFilters.propTypes = {
  // required props
  viewOptions: PropTypes.shape({
    sortType: PropTypes.string.isRequired,
    sortDesc: PropTypes.bool.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  // props from container
  handleDropdownChange: PropTypes.func.isRequired,
  handleToggleDirection: PropTypes.func.isRequired,
  handleClearButtonClick: PropTypes.func.isRequired,
  dropdownOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  isSearchFilterActive: PropTypes.bool.isRequired,
  asyncSearchTimeout: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  // optional props
  hasCounter: PropTypes.bool,
  hasClearButton: PropTypes.bool,
  userArticlesCount: PropTypes.number,
  pageName: PropTypes.string,
  userArticlesLoading: PropTypes.bool,
}

MyMediaFilters.defaultProps = {
  // optional props
  hasCounter: false,
  hasClearButton: false,
  userArticlesCount: 0,
  pageName: '',
  userArticlesLoading: false,
}

export default container(MyMediaFilters)
