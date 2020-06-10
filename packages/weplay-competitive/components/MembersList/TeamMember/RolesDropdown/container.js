import {
  compose, withProps,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

import { ROLES } from 'weplay-competitive/constants/roles'

const container = compose(
  withLocale,
  withProps(({ t }) => ({
    rolesDropdownOptions: [
      {
        label: t('competitive.roles.CORE'),
        value: ROLES.CORE,
      },
      {
        label: t('competitive.roles.STAND_IN'),
        value: ROLES.STAND_IN,
      },
    ],
    captainDropdownOptions: [
      {
        label: t('competitive.roles.CAPTAIN'),
        value: ROLES.CAPTAIN,
      },
    ],
  })),
)

export default container
