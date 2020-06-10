import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.scss'
import container from './container'
import RulesItem from './RulesItem'

const RulesList = ({
  rulesList,
}) => (
  <ul className={styles.list}>
    {rulesList.map(rule => (
      <RulesItem
        key={rule.id}
        rule={rule}
      />
    ))}
  </ul>
)

RulesList.propTypes = {
  rulesList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default container(RulesList)
