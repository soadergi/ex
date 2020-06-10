import * as R from 'ramda'
import {
  compose,
  withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withTabs from 'weplay-components/withTabs'

import {
  tournamentGroupNamesSelector,
  tournamentGroupsSelector,
} from 'weplay-events/reduxs/tournaments/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    groups: tournamentGroupsSelector,
    tournamentGroupNames: tournamentGroupNamesSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'tournamentGroupNames',
  ], ({
    tournamentGroupNames,
  }) => ({
    tabs: R.map(name => ({
      id: name,
      title: name,
    }), tournamentGroupNames),
  })),

  withTabs,

  withPropsOnChange([
    'tabs',
    'activeTab',
    'groups',
  ], ({
    tabs,
    groups,
    activeTab,
  }) => ({
    activeGroup: R.pipe(
      R.find(R.propEq('name', activeTab.id)),
    )(groups),
    isFinalGroupTabActive: R.pipe(
      R.last,
      R.propEq('id', R.prop('id', activeTab)),
    )(tabs),
  })),
)

export default container
