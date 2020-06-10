import {
  compose,
  withProps,
} from 'recompose'

import { startCase } from 'weplay-core/helpers/cases'
import config from 'weplay-core/config'
import withI18n from 'weplay-core/HOCs/withI18n'

const container = compose(
  withI18n,
  withProps({
    languageOptions: config.languages.map(language => ({
      label: startCase(language),
      value: language,
    })),
  }),
)

export default container
