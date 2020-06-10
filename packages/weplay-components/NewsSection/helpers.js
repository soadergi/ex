export const getNewsCardModifiers = (index) => {
  switch (index) {
    case 1:
    case 3:
      return 'large'
    case 2:
      return 'columnist'
    default:
      return 'common'
  }
}
