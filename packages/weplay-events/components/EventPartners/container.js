import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
  branch,
  renderNothing,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

import { createSponsorsByTypeSelector } from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    partners: createSponsorsByTypeSelector('partner'),
    mediaPartners: createSponsorsByTypeSelector('mediapartner'),
    i18nTexts: i18nTextsSelector,
  })),

  branch(
    ({
      partners,
      mediaPartners,
    }) => R.isEmpty(partners) && R.isEmpty(mediaPartners),
    renderNothing,
  ),

  withPropsOnChange([
    'partners',
    'mediaPartners',
  ], ({
    partners,
    mediaPartners,
  }) => ({
    showPartners: !R.isEmpty(partners),
    showMediaPartners: !R.isEmpty(mediaPartners),
  })),
)

export default container
