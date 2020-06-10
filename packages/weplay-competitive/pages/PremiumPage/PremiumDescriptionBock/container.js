import {
  compose,
  withPropsOnChange,
} from 'recompose'

import withLocale from 'weplay-singleton/LocaleProvider/withLocale'

const image1 = 'https://static-prod.weplay.tv/2020-03-16/320a10ddce9e3e8632f293943d5091d9.EEECF0-382F26-945936.png'
const image2 = 'https://static-prod.weplay.tv/2020-03-16/0afda5355ead50a53b149e8b216ee11c.3F383B-E8E0D4-80C1AA.png'
const image3 = 'https://static-prod.weplay.tv/2020-03-16/abea91b742d7be5477de2d3bebb00154.EBE9EA-2F281D-836E4D.png'

const container = compose(
  withLocale,
  withPropsOnChange([
    't',
  ], ({
    t,
  }) => ({
    descriptionCards: [
      {
        id: 1,
        image: image1,
        title: t('competitive.premium.description.card.first.title'),
        description: t('competitive.premium.description.card.first.text'),
      },
      {
        id: 2,
        image: image2,
        title: t('competitive.premium.description.card.second.title'),
        description: t('competitive.premium.description.card.second.text'),
      },
      {
        id: 3,
        image: image3,
        title: t('competitive.premium.description.card.third.title'),
        description: t('competitive.premium.description.card.third.text'),
      },
    ],
  })),
)

export default container
