const DISCIPLINES = {
  'Counter-Strike': 'csgo',
  'Dota 2': 'dota2',
}
const NOTABLE_MARKET_NAMES = ['Winner 2 Ways', 'Winner 3 Ways']

function getCoefs(market) {
  const outcomes = market.Outcomes

  const coef1 = outcomes.find(o => o.OutcomeName.en === 'Win 1')?.Price ?? null
  const coef2 = outcomes.find(o => o.OutcomeName.en === 'Win 2')?.Price ?? null
  const coefDraw = outcomes.find(o => o.OutcomeName.en === 'Draw')?.Price ?? null

  return {
    coef1,
    coef2,
    coefDraw,
  }
}

export default function normalizeParimatchFeed(feed) {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000)

  return feed.Events.reduce((acc, entry) => {
    const discipline = entry.Category.Name.en

    if (!DISCIPLINES[discipline]) {
      return acc
    }

    const type = entry.Event.Stage.toLowerCase()
    const startTime = entry.Event.StartTimeUnixFormat
    const isOpen = type === 'live' || startTime > currentTimestamp
    const notableMarkets = entry.Markets.filter(market => NOTABLE_MARKET_NAMES.includes(market.MarketName.en))
    const urls = {
      ru: entry.Event.URL.ru,
      en: entry.Event.URL.com,
    }

    const maps = []
    let coef1 = null
    let coef2 = null
    let coefDraw = null

    notableMarkets.forEach((market) => {
      const period = market.MarketKey.Period
      const coefs = getCoefs(market)

      if (period === 1) {
        coef1 = coefs.coef1
        coef2 = coefs.coef2
        coefDraw = coefs.coefDraw
      } else {
        maps.push({
          number: period - 1,
          coef1: coefs.coef1,
          coef2: coefs.coef2,
          startTime,
          isOpen,
        })
      }
    })

    maps.sort((m1, m2) => m1.number - m2.number)

    const line = {
      id: entry.Event.Id,
      type,
      discipline: DISCIPLINES[discipline],
      tournament: entry.Tournament.Name.en,
      participant1: entry.Competitors[0].Name.en,
      participant2: entry.Competitors[1].Name.en,
      coef1,
      coef2,
      coefDraw,
      startTime,
      maps,
      isOpen,
      urls,
    }

    acc[line.id] = line

    return acc
  }, {})
}
