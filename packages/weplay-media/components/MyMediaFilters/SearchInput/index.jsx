import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import Icon from 'weplay-components/Icon'
import ButtonClose from 'weplay-components/ButtonClose'

import styles from './styles.scss'
import container from './container'

const SearchInput = ({
  // required props
  isSearchFilterActive,
  // props from container
  isFocused,
  onSearchSubmit,
  focusHandler,
  blurHandler,
  searchInputValue,
  searchInputChange,
  setInputRef,
  handleClearSearchButton,
  // optional props
}) => {
  const t = useTranslation()
  return (
    <>
      <div className={classNames(
        styles.wrapper,
        {
          [styles.focus]: isFocused,
        },
      )}
      >
        <form
          className={styles.search}
          onSubmit={onSearchSubmit}
        >
          <input
            type="search"
            placeholder={t('mediaCore.profile.sortingTitle')}
            className={styles.input}
            onFocus={focusHandler}
            onBlur={blurHandler}
            value={searchInputValue}
            onChange={searchInputChange}
            ref={setInputRef}
          />
          {isSearchFilterActive
            ? (
              <ButtonClose
                modification="searchInput"
                onButtonClick={handleClearSearchButton}
              />
            )
            : (
              <button
                type="submit"
                className={styles.button}
              >
                <Icon
                  iconName="search"
                  className={styles.icon}
                  size="small"
                />
              </button>
            )}
        </form>
      </div>
    </>
  )
}

SearchInput.propTypes = {
  // required props
  isSearchFilterActive: PropTypes.bool.isRequired,
  // props from container
  isFocused: PropTypes.bool.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  blurHandler: PropTypes.func.isRequired,
  searchInputValue: PropTypes.string.isRequired,
  searchInputChange: PropTypes.func.isRequired,
  setInputRef: PropTypes.func.isRequired,
  handleClearSearchButton: PropTypes.func.isRequired,
  // optional props
}

SearchInput.defaultProps = {
  // optional props
}

export default container(SearchInput)
