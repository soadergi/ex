import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

import WidgetHead from './WidgetHead'
import MatchesBlock from './MatchesBlock'
import container from './container'
import styles from './styles.scss'

const WidgetBlock = ({
  // required props

  // container props
  handleScrollbarsMount,
  // optional props
}) => (
  <div
    className={styles.block}
  >
    <WidgetHead />

    <div className={styles.wrap}>
      <Scrollbars
        ref={(s) => { handleScrollbarsMount(s) }}
      >
        <MatchesBlock
          className={styles.matches}
          isSetReminder
          isGrandFinal
        />
      </Scrollbars>
    </div>
  </div>
)

WidgetBlock.propTypes = {
  // required props
  // container props
  handleScrollbarsMount: PropTypes.func.isRequired,

  // optional props
}

WidgetBlock.defaultProps = {
  // optional props
}

export default container(WidgetBlock)
