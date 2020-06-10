import React from 'react'

import { useLocale } from 'weplay-singleton/LocaleProvider/localeContext'
import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import LanguageSwitcher from 'weplay-components/LanguageSwitcher'
import FooterList from 'weplay-components/Footer/FooterMenu/FooterList'
import SocialIcons from 'weplay-components/SocialIcons'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import { getFooterMenu } from 'weplay-components/Footer/mockedAPI'
import NotConnectedLink from 'weplay-components/Link/NotConnectedLink'

import { socialLinks } from '../consts/socialLinks'

import classes from './Footer.scss'

const techiiaLink = 'https://techiia.com/'

const Footer = () => {
  const { locale, setLocale } = useLocale()
  const t = useTranslation()
  const footerMenu = getFooterMenu(locale, 'rules')

  return (
    <footer className={classes.block}>
      <ContentContainer>
        <div className={classes.wrap}>
          <div className={classes.leftCol}>
            <div className={classes.copyright}>
              <span>
                {`© 2011 - ${(new Date()).getFullYear()} ${t('footer.copyright.before')}`}
                <NotConnectedLink
                  isExternal
                  to={techiiaLink}
                  target="_blank"
                  locale={locale}
                  className="u-mx-half u-text-uppercase"
                >
                  {t('footer.copyright')}
                </NotConnectedLink>
                {t('footer.copyright.after')}
              </span>
            </div>
            <FooterList
              className={classes.bottomMenu}
              currentLanguage={locale}
              list={footerMenu}
            />
          </div>
          <div className={classes.rightCol}>
            <SocialIcons
              className={classes.socials}
              links={socialLinks}
              iconSize="small"
              color="white"
              withMarginRight
            />
            <LanguageSwitcher
              openDirection="up"
              className={classes.language}
              currentLanguage={locale}
              setLang={setLocale}
            />
          </div>
        </div>
      </ContentContainer>
    </footer>
  )
}

export default Footer
