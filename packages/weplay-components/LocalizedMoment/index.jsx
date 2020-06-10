import PropTypes from 'prop-types'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import container from './container'

const LocalizedMoment = ({
  // required props
  dateTime,

  // container props
  moment,
  locale,
  // optional props
  fromNow,
  formatKey,
}) => {
  const t = useTranslation()
  const format = formatKey && t(`date.formats.${formatKey}`)
  const localizedMoment = moment(dateTime).locale(locale)
  return fromNow
    ? localizedMoment.fromNow()
    : localizedMoment.format(format)
}

LocalizedMoment.propTypes = {
  // required props
  dateTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,

  // container props
  moment: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,

  // optional props
  fromNow: PropTypes.bool,
  formatKey: PropTypes.string,
}

LocalizedMoment.defaultProps = {
  // optional props
  fromNow: false,
  formatKey: undefined,
}

export default container(LocalizedMoment)
