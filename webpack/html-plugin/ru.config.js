const ru = require('weplay-core/globalNavigationTexts/ru')
const { getFooterMenu } = require('weplay-components/Footer/mockedAPI')
const { getGlobalMenu } = require('weplay-core/helpers/mockedMenuAPI')
const { getSocialLinks } = require('weplay-core/consts/socialLinks')

const head = require('./head.ejs')
const initialHtml = require('./initial-html.min.ejs')

module.exports = isProd => ({
  lang: 'ru',
  title: 'WePlay! Esports ᐈ Игры и киберспорт: Новости • Ивенты • Турниры',
  filename: 'index.ru.html',
  meta: [
    {
      // eslint-disable-next-line max-len
      description: 'WePlay! Esports ➤➤➤ Медиа: Разбираем киберспорт по буквам ⚡ Ивенты: Делаем шоу из киберспорта ⚡ Турнирная платформа: Держим фокус на твоей победе!',
      'data-react-helmet': true,
    }, {
      keywords: 'новости киберспорта',
      'data-react-helmet': true,
    },
  ],
  appMountHtmlSnippet: initialHtml({
    i18nTexts: ru,
    navigationMenu: getGlobalMenu('ru'),

    socialPageLinks: getSocialLinks('ru', 'pages'),
    commonMenu: getFooterMenu('ru', 'common'),
    mediaMenu: getFooterMenu('ru', 'media'),
    eventsMenu: getFooterMenu('ru', 'events'),
    tournamentsMenu: getFooterMenu('ru', 'tournaments'),
    rulesMenu: getFooterMenu('ru', 'rules'),
  }),
  headHtmlSnippet: head({
    isProd,
    locale: 'ru',
  }),
})
