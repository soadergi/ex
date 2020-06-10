import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'

const RulesItem = ({
  rule,
}) => (
  <li className={styles.item}>
    <span className={styles.text}>
      <span className={styles.digit}>{rule.index}</span>
      { rule.title }
    </span>
    <span className={styles.subtext}>
      { rule.text }
    </span>
    {rule.note && (
      <span className={styles.noteText}>
        {rule.note}
      </span>
    )}
  </li>
)

RulesItem.propTypes = {
  rule: PropTypes.shape({
    index: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
}

export default container(RulesItem)
