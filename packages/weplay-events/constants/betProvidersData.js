import lootBetLogo from './img/loot-bet-logo.png'
import pariMatchLogo from './img/parimatch.png'
import esBetLogo from './betLogos/esbet-logo.png'
import oneXBetLogoEn from './betLogos/1xbet-en.png'
import oneXBetLogoRu from './betLogos/1xbet-ru.png'
import egbLogo from './betLogos/egb.png'

export const betProviders = {
  esBet: {
    logos: {
      en: esBetLogo,
      ru: esBetLogo,
    },
    url: {
      en: 'https://es.bet/ru',
      ru: 'https://es.bet/ru',
    },
  },
  oneXBet: {
    logos: {
      en: oneXBetLogoEn,
      ru: oneXBetLogoRu,
    },
    url: {
      en: 'http://cutter.li/cU1cj5',
      ru: 'http://cutter.li/cU1cj5',
    },
  },
  egb: {
    logos: {
      en: egbLogo,
      ru: egbLogo,
    },
    url: {
      en: 'https://egbaffiliates.com/track?aff_cid=19&aff_id=80',
      ru: 'https://egbaffiliates.com/track?aff_cid=19&aff_id=80',
    },
  },
  lootBet: {
    logos: {
      en: lootBetLogo,
      ru: lootBetLogo,
    },
    url: {
      en: 'http://bit.ly/VALENTINE_EN',
      ru: 'http://bit.ly/VALENTINE_RU',
    },
  },
  pariMatch: {
    logos: {
      en: pariMatchLogo,
      ru: pariMatchLogo,
    },
    url: {
      en: 'https://www.paripartners.ru/C.ashx?btag=a_26737b_1763c_&affid=7481&siteid=26737&adid=1763&c=',
      ru: 'https://www.paripartners.ru/C.ashx?btag=a_26737b_1763c_&affid=7481&siteid=26737&adid=1763&c=',
    },
  },
}
