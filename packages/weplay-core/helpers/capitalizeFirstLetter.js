export const capitalizeFirstLetter = (string) => {
  const stringResult = string.slice(1)
  return `${string.charAt(0).toUpperCase()}${stringResult.toLowerCase()}`
}
