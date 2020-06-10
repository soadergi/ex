import PropTypes from 'prop-types'

import container from './container'

const WithMember = ({
  // required props
  children,
  // container props
  member,

  // optional props
}) => children(member)

WithMember.propTypes = {
  // required props

  // container props
  member: PropTypes.shape({}).isRequired,
  children: PropTypes.func.isRequired,

  // props from HOCs

  // optional props

}

WithMember.defaultProps = {
  // optional props

}

export default container(WithMember)
