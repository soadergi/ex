export const pluralizeNumber = (num, lang) => {
  const sufixes = lang !== 'en' ? [''] : ['th', 'st', 'nd', 'rd']
  const module = num % 100
  return num + (sufixes[(module - 20) % 10] || sufixes[module] || sufixes[0])
}
