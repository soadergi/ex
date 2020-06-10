export default function transliterate(str) {
  if (typeof str !== 'string') return str
  const sp = '-'
  const text = str.toLowerCase()
  const transl = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    і: 'i',
    ї: 'i',
    й: 'j',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }
  let result = ''
  let curentSim = ''
  for (let i = 0; i < text.length; i += 1) {
    if (transl[text[i]] !== undefined) {
      if (curentSim !== transl[text[i]] || curentSim !== sp) {
        result += transl[text[i]]
        curentSim = transl[text[i]]
      }
    } else {
      result += text[i]
      curentSim = text[i]
    }
  }
  return result.replace(/[^a-zA-ZА-ЯЁа-яё0-9]+/g, ' ').trim().replace(/ /g, '-')
}
