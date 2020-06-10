import {
  compose, lifecycle, withHandlers, withStateHandlers,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import * as R from 'ramda'

const container = compose(
  connect(createStructuredSelector({
  })),
  withStateHandlers({
    selectedMemberIds: [],
  }, {
    setSelectedMemberIds: () => value => ({
      selectedMemberIds: value,
    }),
  }),
  withHandlers({
    toggleCheckbox: ({ selectedMemberIds, setSelectedMemberIds }) => (id) => {
      if (R.contains(id, selectedMemberIds)) {
        setSelectedMemberIds(R.without([id], selectedMemberIds))
      } else {
        selectedMemberIds.push(id)
        setSelectedMemberIds(selectedMemberIds)
      }
    },
    handlerOnJoinTournament: ({ onConfirm, selectedMemberIds }) => () => (
      onConfirm(selectedMemberIds)
    ),
  }),
  lifecycle({
    componentDidMount() {
      this.props.setSelectedMemberIds([])
    },
  }),
)

export default container
