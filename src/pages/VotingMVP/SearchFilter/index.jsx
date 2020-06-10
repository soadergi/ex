import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Select from 'weplay-components/Select'
import Icon from 'weplay-components/Icon'
import MessageBanner from 'weplay-components/MessageBanner'

import messageImage from './img/no-search-results-icon.svg'
import container from './container'
import styles from './styles.scss'

const SearchFilter = ({
  // required props
  inputValue,
  changedHandler,
  handleReverse,
  isReversed,
  sortByDropdownOptions,
  chooseByDropdownOptions,
  sortType,
  setSortType,
  chooseBy,
  setChooseBy,
  hasNoResults,
  handleClearSearch,

  // container props
  isSearchFiledEmpty,
  i18nTexts,

  // optional props
}) => (
  <>
    <div className={styles.block}>
      <div className={styles.container}>
        <div className={styles.searchField}>
          <input
            type="search"
            placeholder="Search..."
            value={inputValue}
            onChange={changedHandler}
            className={styles.input}
          />

          <button
            type="button"
            className={classNames(
              styles.inputBtn,
              { [styles.isEmpty]: isSearchFiledEmpty },
            )}
            onClick={handleClearSearch}
          >
            {isSearchFiledEmpty && (
              <Icon
                iconName="search"
                className={styles.icon}
              />
            )}

            {!isSearchFiledEmpty && (
              <Icon
                iconName="close"
                className={styles.icon}
              />
            )}
          </button>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.teamsFilter}>
            <Select
              value={chooseBy}
              options={chooseByDropdownOptions}
              onChange={setChooseBy}
              isRight
            />
          </div>

          <div className={styles.sortGroup}>
            <div className={styles.sorting}>
              <Select
                value={sortType}
                options={sortByDropdownOptions}
                onChange={setSortType}
                isRight
              />
            </div>

            <button
              type="button"
              onClick={handleReverse}
              className={classNames(
                styles.sortBtn,
                { [styles.isActive]: isReversed },
              )}
            >
              <span className={styles.arrow} />
            </button>
          </div>
        </div>
      </div>
    </div>

    {hasNoResults && (
      <div className={classNames(
        styles.container,
        'u-mt-5',
      )}
      >
        <MessageBanner
          title={i18nTexts.votingMVP.noResultsBanner.title}
          imageUrl={messageImage}
        >
          <p className={styles.bannerMessage}>{i18nTexts.votingMVP.noResultsBanner.message}</p>
        </MessageBanner>
      </div>
    )}
  </>
)

SearchFilter.propTypes = {
  // required props
  inputValue: PropTypes.string.isRequired,
  handleReverse: PropTypes.func.isRequired,
  isReversed: PropTypes.bool.isRequired,
  sortByDropdownOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  chooseByDropdownOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sortType: PropTypes.string.isRequired,
  setSortType: PropTypes.func.isRequired,
  chooseBy: PropTypes.string.isRequired,
  setChooseBy: PropTypes.func.isRequired,
  hasNoResults: PropTypes.bool.isRequired,
  handleClearSearch: PropTypes.func.isRequired,

  // container props
  isSearchFiledEmpty: PropTypes.bool.isRequired,
  changedHandler: PropTypes.func.isRequired,
  i18nTexts: PropTypes.shape({}).isRequired,

  // optional props
}

SearchFilter.defaultProps = {
  // optional props
}

export default container(SearchFilter)
