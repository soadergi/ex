import {
  compose,
  withHandlers,
} from 'recompose'

import withI18n from 'weplay-core/HOCs/withI18n'

const container = compose(
  withI18n,
  withHandlers({
    getOnChange: props => language => () => props.setLang(language),
  }),
)

export default container
