import React from 'react'
import PropTypes from 'prop-types'

import { dataQaIds } from 'weplay-core/dataQaIds/dataQaIds'
import { NAMES } from 'weplay-core/routes'
import { createEmptyArray } from 'weplay-core/helpers/createEmptyArray'

import Button from 'weplay-components/Button'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import SettingsTitle from './SettingsTitle'
import SettingsMenu from './SettingsMenu'
import HeroSection from './HeroSection'
import container from './container'
import styles from './styles.scss'

const MOCKED_MENU_LENGTH = 4
const mockMenuCount = createEmptyArray(MOCKED_MENU_LENGTH)
const breadcrubcsModifications = ['light']

const NotificationsSettingsPage = ({
  i18nTexts,
}) => (
  <>
    <HeroSection
      title={i18nTexts.notificationsSettings.pageTitle}
      breadcrumbsEntityName="Notification settings"
      breadcrumbsModifications={breadcrubcsModifications}
    />
    <div
      className="u-py-2 u-py-md-4"
      data-qa-id={dataQaIds.pages[NAMES.NOTIFICATIONS_SETTINGS].container}
    >
      <ContentContainer>
        {mockMenuCount.map(() => (
          <div className={styles.section}>
            <SettingsTitle
              settingsTitle={i18nTexts.notificationsSettings.title}
            />
            {mockMenuCount.map(index => (
              <SettingsMenu
                hasSelect={index === 0}
                hasInput={index === 1}
                settingsName={i18nTexts.notificationsSettings.name}
              />
            ))}
          </div>
        ))}
      </ContentContainer>
      <ContentContainer>
        <Button className={styles.button}>
          {i18nTexts.notificationsSettings.button}
        </Button>
      </ContentContainer>
    </div>
  </>
)

NotificationsSettingsPage.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
}

NotificationsSettingsPage.defaultProps = {

}

export default container(NotificationsSettingsPage)
