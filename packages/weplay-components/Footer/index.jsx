import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import socialLinkPropType from 'weplay-core/customPropTypes/socialLinkPropType'
import Separator from 'weplay-components/Separator/Separator'
import SocialList from 'weplay-components/SocialList'
import LanguageSwitcher from 'weplay-components/LanguageSwitcher'
import NotConnectedLink from 'weplay-components/Link/NotConnectedLink'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Logo from 'weplay-components/Logo'

import FooterMenu from './FooterMenu'
import container from './container'
import styles from './styles.scss'

const footerChildrenMods = ['light']
const separatorMods = ['dark']

const Footer = ({
  i18nTexts,
  background,
  commonMenu,
  mediaMenu,
  eventsMenu,
  tournamentsMenu,
  rulesMenu,
  socialPageLinks,
  currentLanguage,
  techiiaLink,
}) => (
  <footer
    className={styles.block}
    style={background}
  >
    <ContentContainer>
      <div className={styles.topWrap}>
        <div className={styles.column}>
          <NotConnectedLink
            to="/"
            className={styles.logo}
            locale={currentLanguage}
          >
            <Logo />
          </NotConnectedLink>

          <FooterMenu
            currentLanguage={currentLanguage}
            menu={commonMenu}
          />
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>{i18nTexts.globalNavigation.media.name}</h3>
          <FooterMenu
            currentLanguage={currentLanguage}
            menu={mediaMenu}
          />
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>{i18nTexts.globalNavigation.events.name}</h3>
          <FooterMenu
            currentLanguage={currentLanguage}
            menu={eventsMenu}
          />
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>{i18nTexts.globalNavigation.tournaments.name}</h3>
          <FooterMenu
            currentLanguage={currentLanguage}
            menu={tournamentsMenu}
          />
        </div>

        <div className={styles.column}>
          <h3 className={styles.title}>{i18nTexts.footer.rules}</h3>
          <FooterMenu
            currentLanguage={currentLanguage}
            menu={rulesMenu}
          />
        </div>
      </div>

      <Separator
        modifiers={separatorMods}
        size="middle"
      />
      <div className={styles.bottomWrap}>
        <div
          className={styles.column}
          data-event-position="Footer"
        >
          <h3 className={styles.title}>{i18nTexts.footer.blockNames.socials}</h3>
          <SocialList
            links={socialPageLinks}
            modifiers={footerChildrenMods}
          />
        </div>
        <div className={classNames(
          styles.column,
          'u-mt-6',
          'u-mt-md-0',
        )}
        >
          <h3 className={styles.title}>{i18nTexts.footer.blockNames.subscription}</h3>
          <div id="FooterSubscribeFormPortal" />
        </div>
      </div>

      <Separator
        modifiers={separatorMods}
        size="middle"
      />
      <div className={styles.copyWrap}>
        <div className={styles.copyText}>
          <p className={classNames(
            styles.copy,
            'u-mb-2',
          )}
          >
            {i18nTexts.footer.techiia.address}
          </p>
          <p className={styles.copy}>
            {`© 2011 - ${(new Date()).getFullYear()} ${i18nTexts.footer.copyright}`}
          </p>
          <p className={styles.copy}>
            {i18nTexts.footer.techiia.textBefore}
            <NotConnectedLink
              isExternal
              to={techiiaLink}
              target="_blank"
              className={styles.techiiaLink}
              locale={currentLanguage}
            >
              {i18nTexts.footer.techiia.link}
            </NotConnectedLink>
            {i18nTexts.footer.techiia.textAfter}
          </p>
        </div>
        <div className={styles.langSelector}>
          <LanguageSwitcher
            openDirection="up"
            currentLanguage={currentLanguage}
          />
        </div>
      </div>
    </ContentContainer>
  </footer>
)

Footer.propTypes = {
  i18nTexts: PropTypes.shape({}).isRequired,
  socialPageLinks: PropTypes.arrayOf(socialLinkPropType).isRequired,
  background: PropTypes.shape({}).isRequired,
  commonMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mediaMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  eventsMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tournamentsMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rulesMenu: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentLanguage: PropTypes.string.isRequired,
  techiiaLink: PropTypes.string.isRequired,
}

Footer.defaultProps = {
}

export default container(Footer)
