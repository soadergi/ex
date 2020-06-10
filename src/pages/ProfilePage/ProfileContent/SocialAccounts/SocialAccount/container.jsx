import { compose } from 'recompose'
import withOauth2Handler from 'weplay-core/HOCs/withOauth2Handler'

const container = compose(
  withOauth2Handler,
)

export default container
