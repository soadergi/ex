import React from 'react'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'

import styles from './TournamentsListPage.scss'
import SeoFAQScript from './SeoFAQScript/SeoFAQScript'
import TournamentsListHero from './TournamentsListHero/TournamentsListHero'
import TournamentsListMain from './TournamentsListMain/TournamentsListMain'
import TournamentsListSeoTexts from './TournamentsListSeoTexts/TournamentsListSeoTexts'

// // TODO: pass filter with params
// // TODO: parse filters object and apply to selector
// // TODO: handle pagination
// // TODO: move components from prev page
// const useTournamentsByFilter = () => {
//   const dispatch = useDispatch()
//   useEffect(() => {
//     dispatch(newTPTournamentsActions.queryRecords.request())
//   }, [dispatch])
//   return useSelector(newTPTournamentsSelectors.createRecordsByFilterSelector(() => () => true))
// }

export const TournamentsListPage = ({}) => (
  <div
    className={styles.page}
    data-qa-id={dataQaIds.pages[NAMES.TOURNAMENT].container}
  >
    {/* TODO: PageHelmet */}

    <SeoFAQScript />

    <TournamentsListHero />

    <TournamentsListMain />

    <TournamentsListSeoTexts />
  </div>
)

export default React.memo(TournamentsListPage)
