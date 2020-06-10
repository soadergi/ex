export const isSingular = itemName => /^\d*[^1][1]$/.test(itemName)
export const isPluralFrom2To4 = itemName => /^\d*[^1][2-4]$/.test(itemName)

export const pluralTextName = (value) => {
  const numberValue = Number(value)
  if (numberValue === 1) return 'singular'
  if (numberValue > 1 && numberValue < 5) return 'plural_2-4'
  if (isSingular(numberValue)) return 'singular'
  if (isPluralFrom2To4(numberValue)) return 'plural_2-4'
  return 'plural'
}
