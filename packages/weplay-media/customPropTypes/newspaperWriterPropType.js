import PropTypes from 'prop-types'

import authorPropType from 'weplay-core/customPropTypes/authorPropType'

import columnistPropType from './columnistPropType'

export default PropTypes.oneOfType([columnistPropType, authorPropType])
