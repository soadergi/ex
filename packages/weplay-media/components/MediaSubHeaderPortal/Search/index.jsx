import React from 'react'
import PropTypes from 'prop-types'

import SearchModal from './SearchModal'
import SearchButton from './SearchButton/SearchButton'
import container from './container'

const Search = ({
  handleSearchModalOpen,
  handleClose,
  isSearchModalVisible,
}) => (
  <>
    <SearchModal
      isSearchModalVisible={isSearchModalVisible}
      closeSearchModal={handleClose}
    />
    <SearchButton openSearchModal={handleSearchModalOpen} />
  </>
)

Search.propTypes = {
  handleSearchModalOpen: PropTypes.func.isRequired,
  isSearchModalVisible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default container(Search)
