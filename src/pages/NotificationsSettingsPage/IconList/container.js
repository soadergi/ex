import {
  compose, withPropsOnChange,
} from 'recompose'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { i18nTextsSelector } from 'weplay-core/reduxs/language/reducer'

const container = compose(
  connect(createStructuredSelector({
    // selectors
    i18nTexts: i18nTextsSelector,
  }), {
    // actionCreators
  }),

  withPropsOnChange([
    'i18nTexts',
  ], ({
    i18nTexts,
  }) => ({

    items: [
      {
        iconName: 'email',
        tooltipText: i18nTexts.notificationsSettings.tooltipEmail,
      },
      {
        iconName: 'notification-outlined',
        tooltipText: i18nTexts.notificationsSettings.tooltipSite,
      },
      {
        iconName: 'telegramMedia',
        tooltipText: i18nTexts.notificationsSettings.tooltipTelegram,
      },
      {
        iconName: 'discord',
        tooltipText: i18nTexts.notificationsSettings.tooltipDiscord,
      },
    ],
  })),
)

export default container
