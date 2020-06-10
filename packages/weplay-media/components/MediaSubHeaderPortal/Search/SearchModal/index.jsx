import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// TODO: @artem remove
import { DebounceInput } from 'react-debounce-input'

import Icon from 'weplay-components/Icon'
import Link from 'weplay-components/Link'
import Logo from 'weplay-components/Logo'

import SearchResults from './SearchResults'
import container from './container'
import styles from './styles.scss'

const SearchModal = ({
  // required props
  isSearchModalVisible,
  // container props
  t,
  handleInputRef,
  // optional props
  handleClose,
  handleSearchInput,
  searchQuery,
  handleSearchQueryReset,
}) => (
  <div
    className={classNames(
      styles.block,
      {
        [styles.isShown]: isSearchModalVisible,
      },
    )}
  >
    {' '}
    <div className={styles.header}>
      <Link
        to="/"
        className={styles.link}
        onClick={handleClose}
      >
        <Logo />
      </Link>
      <button
        type="button"
        className={styles.close}
        onClick={handleClose}
      >
        <Icon
          iconName="close"
          size="small"
        />
      </button>
    </div>
    <div className={styles.body}>
      <div className={styles.inputWrap}>
        <DebounceInput
          className={styles.input}
          inputRef={handleInputRef}
          minLength={3}
          debounceTimeout={3000}
          onChange={handleSearchInput}
          id="searchInput"
          placeholder={t('mediaCore.modals.search.input.placeholder')}
          value={searchQuery}
          maxLength="128"
        />
        <Icon
          className={styles.searchIcon}
          iconName="search"
        />
        {searchQuery && (
          <button
            type="button"
            className={styles.clear}
            onClick={handleSearchQueryReset}
          >
            <Icon
              iconName="close"
              size="small"
            />
          </button>
        )}
      </div>
      <SearchResults
        searchQuery={searchQuery}
        handleClose={handleClose}
      />
    </div>
  </div>
)

SearchModal.propTypes = {
  // required props
  // container props
  handleInputRef: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  // optional props
  isSearchModalVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSearchInput: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  handleSearchQueryReset: PropTypes.func.isRequired,
}

SearchModal.defaultProps = {
  // optional props
  searchQuery: '',
}

export default container(SearchModal)
