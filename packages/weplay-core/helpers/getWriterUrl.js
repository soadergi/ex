import transliterate from 'weplay-core/helpers/translit'

export const getWriterUrl = (writerTitle, writerId) => writerTitle
  && `${transliterate(writerTitle.replace(/ /g, '-'))}-${writerId}`
