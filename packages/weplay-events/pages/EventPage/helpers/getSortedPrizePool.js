export default function getSortedPrizePool(prizes) {
  if (!prizes?.length) return prizes

  const structuredPrizes = prizes.reduce(
    (acc, prize) => {
      const prizePlaceName = prize.placeName.toLowerCase()

      if (prizePlaceName.includes('mvp')) {
        return {
          ...acc,
          mvpPrizes: [
            ...acc.mvpPrizes,
            prize,
          ],
        }
      }

      return {
        ...acc,
        placePrizes: [
          ...acc.placePrizes,
          prize,
        ],
      }
    },
    {
      placePrizes: [],
      mvpPrizes: [],
    },
  )

  return structuredPrizes.placePrizes.sort(
    (prize1, prize2) => prize2.prize - prize1.prize,
  ).concat(structuredPrizes.mvpPrizes)
}
