const THREE_DOTS = '...'
const LETTER_REGEXP = /[\wа-яА-ЯёЁ]/
const SYMBOLS_TO_REMOVE = 3

export const cutTextWithLength = ({
  text,
  maxLength,
}) => {
  if (!text) {
    return null
  }
  if (text.length > maxLength) {
    const words = text.slice(0, maxLength - SYMBOLS_TO_REMOVE).split(' ')
    const lastSymbol = text[maxLength - SYMBOLS_TO_REMOVE]
    if ((LETTER_REGEXP).test(lastSymbol)) {
      words.pop()
    }
    return `${words.join(' ')}${THREE_DOTS}`
  }
  return text
}
