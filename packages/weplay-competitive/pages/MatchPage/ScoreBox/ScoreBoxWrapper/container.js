import {
  compose, withProps, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import withTabs from 'weplay-components/withTabs'

import { DISCIPLINES } from 'weplay-competitive/config/disciplines'

const container = compose(
  connect(createStructuredSelector({
    //
  }), {
    // actionCreators
  }),
  withPropsOnChange([
    'mapsStats',
  ], ({
    mapsStats,
  }) => ({
    tabs: mapsStats.map((map, key) => ({
      id: key,
      title: map.name,
    })),
  })),
  withProps(() => ({
    initialActiveTabIndex: 0,
  })),
  withTabs,
  withPropsOnChange([
    'discipline',
  ], ({
    discipline,
  }) => ({
    scoreBoxHeadCells: DISCIPLINES[discipline].statistic.scoreBox.head,
    scoreBoxCells: DISCIPLINES[discipline].statistic.scoreBox.body,
  })),
)

export default container
