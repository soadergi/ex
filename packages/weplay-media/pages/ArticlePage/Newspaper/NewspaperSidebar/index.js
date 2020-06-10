import * as R from 'ramda'
import React, { useMemo } from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import newspaperPropType from 'weplay-core/customPropTypes/newsPaperPropType'
import { createEmptyArray } from 'weplay-core/helpers/createEmptyArray'

import SubscriptionBlock from 'weplay-components/SubscriptionBlock'

import ColumnistCard from 'weplay-media/components/ColumnistCard'
import TournamentsBanner from 'weplay-media/components/TournamentsBanner'
import Similars from 'weplay-media/components/Similars'
import bgImage from 'weplay-media/components/TournamentsBanner/tournaments-banner.png'

import styles from './styles.scss'

const DEFAULT_SIDE_LIST_COUNT = 5
const DEFAULT_BOTTOM_LIST_COUNT = 2
const FORM_MODIFIER = ['vertical']
const tournamentLink = 'https://weplay.tv/ru/tournaments'

const NewspaperSidebar = ({
  newspaper,
}) => {
  const t = useTranslation()
  const similarSideList = useMemo(
    () => (newspaper.similar?.sideBlock || createEmptyArray(DEFAULT_SIDE_LIST_COUNT)),
    [newspaper],
  )
  const similarBottomList = useMemo(
    () => (newspaper.similar?.bottomBlock || createEmptyArray(DEFAULT_BOTTOM_LIST_COUNT)),
    [newspaper],
  )

  return (
    <div
      className={styles.block}
      data-qa-id={dataQaIds.pages.articlePage.sideBar}
    >
      <div className={styles.top}>
        {newspaper.columnist && (
          <div className="u-mb-4">
            <ColumnistCard
              columnist={newspaper.columnist}
              columnistId={newspaper.authorId}
              modifier="cardTight"
            />
          </div>
        )}
        {!R.isEmpty(similarSideList) && (
          <div className={styles.sticky}>
            <Similars
              similarNews={similarSideList}
              title={t('title.similar')}
            />
            <TournamentsBanner
              className="u-my-3"
              title={t('mediaCore.banner.tournamentBanner.title')}
              buttonUrl={tournamentLink}
              background={bgImage}
              btnText={t('mediaCore.banner.tournamentBanner.button')}
            />
            <SubscriptionBlock modifiers={FORM_MODIFIER} />
          </div>
        )}
      </div>
      {!R.isEmpty(similarBottomList) && (
        <Similars
          similarNews={similarBottomList}
          isFullCard
          hasTitle={false}
          title={t('title.similar')}
        />
      )}
    </div>
  )
}

NewspaperSidebar.propTypes = {
  newspaper: newspaperPropType.isRequired,
}

export default React.memo(NewspaperSidebar)
