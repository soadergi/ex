export const formatPrizeSumWithComaAndCurrency = (prize) => {
  const prizeString = String(prize)
  return `$${prizeString.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,')}`
}
