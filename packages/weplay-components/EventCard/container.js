import {
  compose,
  pure,
  withPropsOnChange,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const container = compose(
  withLocale,
  pure,
  withPropsOnChange([
    'promoEvent',
    't',
  ], ({
    promoEvent,
    t,
  }) => ({
    eventPrizeText: promoEvent.cashPrize ? t('root.events.prizePool') : t('root.events.prize'),
  })),
)

export default container
