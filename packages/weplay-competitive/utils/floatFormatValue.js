export const floatFormatValue = (value) => {
  if (value % 1) {
    return parseFloat(value).toFixed(2)
  }
  return value
}
