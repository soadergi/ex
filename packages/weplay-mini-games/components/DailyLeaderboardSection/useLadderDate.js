import moment from 'moment'
import { useMemo, useState } from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'

const DATE_STRING_FORMAT = 'YYYY-MM-DD'
const DATE_TEXT_FORMAT = 'MMMM, DD, YYYY'

const todayDate = moment(Date.now()).format(DATE_STRING_FORMAT)

export const useLadderDate = ({
  startDate,
  endDate,
}) => {
  const [date, setDate] = useState(todayDate)

  const { locale } = useLocale()

  const decrementDay = () => {
    setDate(moment(date).subtract(1, 'days').format(DATE_STRING_FORMAT))
  }

  const incrementDay = () => {
    setDate(moment(date).add(1, 'days').format(DATE_STRING_FORMAT))
  }

  const dateFetchParams = useMemo(() => ({
    date,
  }), [date])

  const dateLocalizedText = useMemo(() => (moment(date)
    .locale(locale)
    .format(DATE_TEXT_FORMAT)
  ), [date, locale])

  const isStartDate = moment(startDate).isSame(date)
  const isEndDate = moment(endDate ?? todayDate).isSame(date)

  return {
    decrementDay,
    incrementDay,
    dateFetchParams,
    dateLocalizedText,
    isStartDate,
    isEndDate,
  }
}
