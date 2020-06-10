export const getPluralizeStatus = (num) => {
  if (num === 0) {
    return 'zero'
  }
  if (num % 10 === 1 && num % 100 !== 11) {
    return 'one' // 1, 21, 31, 41, 51, 61...
  }
  if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
    return 'few' // 2-4, 22-24, 32-34...
  }
  return 'many' // 0, 5-20, 25-30, 35-40...
}
