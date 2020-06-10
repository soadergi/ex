export const isPeriodicalBlockVisible = ({
  currentIndex,
  startIndex,
  interval,
  total,
}) => (
  currentIndex === startIndex
   || ((currentIndex - startIndex) % interval === 0 && currentIndex > interval)
   || (!!total && ((currentIndex === total - 1) && startIndex > total - 1))
)
