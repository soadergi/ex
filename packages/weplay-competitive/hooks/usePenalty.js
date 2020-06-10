import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import useAction from 'weplay-core/helpers/useAction'
import { pluralTextName } from 'weplay-core/helpers/isSingular'

import { penaltiesActions, penaltiesSelectors } from 'weplay-competitive/reduxs/penalties'

const usePenalty = (name) => {
  const t = useTranslation()
  const penalties = useSelector(penaltiesSelectors.allRecordsSelector)
  const { queryPenaltiesRequest } = useAction({ queryPenaltiesRequest: penaltiesActions.queryRecords.request })

  const currentPenalty = useMemo(
    () => penalties.find(penalty => penalty.penaltyName === name),
    [penalties],
  )
  // TODO: @Tetiana refactore code below
  const penaltyTimeText = useMemo(() => {
    const penaltyMonthsText = currentPenalty?.months
      ? `${currentPenalty.months} ${t(`competitive.months.${pluralTextName(currentPenalty.months)}`)} `
      : ''
    const penaltyDaysText = currentPenalty?.days
      ? `${currentPenalty.days} ${t(`competitive.days.${pluralTextName(currentPenalty.days)}`)} `
      : ''
    const penaltyHoursText = currentPenalty?.hours
      ? `${currentPenalty.hours} ${t(`competitive.hours.${pluralTextName(currentPenalty.hours)}`)} `
      : ''
    const penaltyMinutesText = currentPenalty?.minutes
      ? `${currentPenalty.minutes} ${t(`competitive.minutes.${pluralTextName(currentPenalty.minutes)}`)} `
      : ''
    const penaltySecondsText = currentPenalty?.seconds
      ? `${currentPenalty.seconds} ${t(`competitive.seconds.${pluralTextName(currentPenalty.seconds)}`)} `
      : ''
    return `${penaltyMonthsText}${penaltyDaysText}${penaltyHoursText}${penaltyMinutesText}${penaltySecondsText}`
  },
  [currentPenalty])

  useEffect(() => {
    if (!penalties?.length) {
      queryPenaltiesRequest({
        filter__penalty_name__eq: name,
      })
    }
  }, [])

  return { currentPenalty, penaltyTimeText }
}

export default usePenalty
