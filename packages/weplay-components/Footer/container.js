import {
  compose,
  withProps,
  withPropsOnChange,
} from 'recompose'

import { getSocialLinks } from 'weplay-core/consts/socialLinks'

import { getFooterMenu } from './mockedAPI'
import bgImage from './img/footer-bg.svg'

const container = compose(
  withPropsOnChange([
    'currentLanguage',
  ],
  ({
    currentLanguage,
  }) => ({
    socialPageLinks: getSocialLinks(currentLanguage, 'pages'),
    commonMenu: getFooterMenu(currentLanguage, 'common'),
    mediaMenu: getFooterMenu(currentLanguage, 'media'),
    eventsMenu: getFooterMenu(currentLanguage, 'events'),
    tournamentsMenu: getFooterMenu(currentLanguage, 'tournaments'),
    rulesMenu: getFooterMenu(currentLanguage, 'rules'),
  })),

  withProps(() => ({
    background: {
      backgroundImage: `url('${bgImage}')`,
    },
    techiiaLink: 'https://techiia.com/',
  })),

)

export default container
