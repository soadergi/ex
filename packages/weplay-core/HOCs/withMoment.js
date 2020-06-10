import {
  branch,
  compose,
  lifecycle,
  renderNothing,
  withPropsOnChange,
  withState,
} from 'recompose'

export default compose(
  withState('moment', 'setMoment', false),
  lifecycle({
    componentDidMount() {
      import('moment').then(moment => this.props.setMoment(moment))
    },
  }),
  branch(
    ({ moment }) => !moment,
    renderNothing,
  ),
  withPropsOnChange([
    'moment',
  ], ({
    moment,
  }) => ({
    moment: moment.default,
  })),
)
