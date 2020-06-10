import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import Image from 'weplay-components/Image'

import styles from './AbilitiesTab.scss'

const AbilitiesTab = ({
  handleClick,
  activeTab,
  tab,
  image,
}) => (
  (
    <li className={styles.item}>
      <button
        type="button"
        onClick={handleClick}
        className={classNames(
          styles.button,
          {
            [styles.active]: activeTab,
          },
        )}
      >
        <Image
          src={image}
          alt={tab}
          className={styles.image}
        />
      </button>
      {activeTab && (
        <span className={styles.dot} />
      )}
    </li>
  )
)

AbilitiesTab.propTypes = {
  tab: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  activeTab: PropTypes.bool.isRequired,
}

export default AbilitiesTab
