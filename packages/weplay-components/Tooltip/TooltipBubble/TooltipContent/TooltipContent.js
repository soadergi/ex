import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

const TooltipContent = ({
  // required props
  tooltip,
  // container props
  // optional props
}) => {
  const t = useTranslation()
  const [category, name] = tooltip.path.split('/')
  return t(`tooltips.${category}.${name}.content.0`)
}

TooltipContent.propTypes = {
  // required props
  tooltip: PropTypes.shape({
    hasBottomLink: PropTypes.bool.isRequired,
    confirmBtn: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  onLinkClick: PropTypes.func.isRequired,
  // container props
  // optional props
}

export default React.memo(TooltipContent)
