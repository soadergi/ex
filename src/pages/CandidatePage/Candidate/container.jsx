import * as R from 'ramda'
import {
  compose,
  withHandlers,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import withCurrentLocation from 'weplay-components/withCurrentLocation'
import { getOptionByIdSelector, optionCountrySelector } from 'weplay-core/reduxs/votingOptions/reducer'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'
import queryString from 'query-string'

const container = compose(
  withCurrentLocation,
  connect(createStructuredSelector({
    votingOption: getOptionByIdSelector,
    votingOptionCountry: optionCountrySelector,
    i18nTexts: i18nTextsSelector,
  }), {
  }),
  withPropsOnChange([
    'i18nTexts',
  ], ({
    i18nTexts,
  }) => ({
    tabs: [
      {
        title: i18nTexts.voting.essay.tabEssay,
        id: 'essay',
      },
      {
        title: i18nTexts.voting.essay.tabVideo,
        id: 'video',
      },
    ],
  })),
  withPropsOnChange([
    'location',
    'tabs',
  ], ({
    location,
    tabs,
  }) => ({
    activeTab: R.pipe(
      R.find(R.propEq('id', queryString.parse(location.search).tabId)),
      R.defaultTo(tabs[0]),
    )(tabs),
  })),
  withHandlers({
    setActiveTab: ({ history }) => activeTab => history.push({
      ...history.location,
      search: `?tabId=${activeTab.id}`,
    }),
  }),
)

export default container
