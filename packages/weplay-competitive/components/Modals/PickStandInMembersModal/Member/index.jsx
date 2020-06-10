import React from 'react'
import PropTypes from 'prop-types'
import imgPropType from 'weplay-core/customPropTypes/imgPropType'
import Checkbox from 'weplay-components/Checkbox'
import UserAvatar from 'weplay-components/UserAvatar'

import styles from './styles.scss'

const bordered = ['bordered']

const Member = ({
  // required props
  name,
  id,
  toggleCheckbox,
  isPremiumAccount,
  // container props
  // optional props
  avatar,
}) => (
  <li>
    <Checkbox
      className={styles.item}
      id={`member-${id}`}
      onChange={() => toggleCheckbox(id)}
      modifiers={bordered}
    >
      <UserAvatar
        className={styles.avatar}
        avatar={avatar}
        isPremiumAccount={isPremiumAccount}
      />
      <span className={styles.name}>
        {name}
      </span>
    </Checkbox>
  </li>
)

Member.propTypes = {
  // required props
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
  isPremiumAccount: PropTypes.bool.isRequired,
  // container props

  // optional props
  avatar: imgPropType,
}

Member.defaultProps = {
  // optional props
  avatar: '',
}

export default Member
