import React from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Image from 'weplay-components/Image'
import Headline from 'weplay-components/HeadLine'
import Section, { PADDING_Y } from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import Articles from 'components/Articles/Articles'
import B2BSection from 'components/B2BSection/B2BSection'
import HeroSectionBtb from 'components/HeroSectionBtb/HeroSectionBtb'

import ContactUsSection from '_pages/_app/ContactUsModal/ContactUsSection/ContactUsSection'

import Accreditation from './Accreditation/Accreditation'
import PressMaterials from './PressMaterials/PressMaterials'
import PressContact from './PressContact/PressContact'
import WeplayPressMaterials from './WeplayPressMaterials/WeplayPressMaterials'
import classes from './styles.scss'
import desktopBg from './WeplayPressMaterials/img/pattern.svg'

const initialNewspaperQuantity = 4
const initialEventQuantity = 1
const initialEventPressMaterialQuantity = 6

const PressRoomPage = ({
  newspapers,
  events,
  eventPressMaterials,
}) => {
  const t = useTranslation()
  const isTabletWidth = useSelector(isTabletWidthSelector)
  return (
    <>
      <HeroSectionBtb
        title={t('pressRoomPage.heroSection.title')}
        text={t('pressRoomPage.heroSection.text')}
        buttonText={t('pressRoomPage.heroSection.button')}
        image={t('pressRoomPage.heroSection.image')}
      />

      <B2BSection>
        <Articles
          newspapers={newspapers}
          hasNewspaperInfoText={false}
          title={t('pressRoomPage.latest.title')}
        />
      </B2BSection>

      <B2BSection>
        <Accreditation
          events={events}
          title={t('pressRoomPage.accreditation.title')}
          description={t('pressRoomPage.accreditation.description')}
        />
      </B2BSection>

      <B2BSection>
        <PressMaterials
          initialMaterials={eventPressMaterials}
          title={t('pressRoomPage.eventPressMaterials.title')}
          description={t('pressRoomPage.eventPressMaterials.description')}
        />
      </B2BSection>

      <Section
        paddingY={PADDING_Y.SM}
        className={classes.materials}
      >
        <ContentContainer>
          {!isTabletWidth && (
            <Image
              className={classes.backgroundUrl}
              src={desktopBg}
              alt=""
            />
          )}
          <WeplayPressMaterials />
        </ContentContainer>
      </Section>

      <B2BSection>
        <PressContact />
      </B2BSection>

      <B2BSection>
        <Headline
          className="u-text-center"
          title={t('pressRoomPage.information.title')}
          text={t('pressRoomPage.information.description')}
        />
      </B2BSection>

      <div className={classes.sectionGrey}>
        <ContactUsSection />
      </div>
    </>
  )
}

PressRoomPage.getInitialProps = () => {
  const newspaper = {
    title: 'Nintendo UK replaces PlayStation as Digital Schoolhouse official',
    publishedDate: '2019-03-26T14:37:38Z',
    media: [
      {
        mediaId: 174790,
        path: 'https://static-prod.weplay.tv/2020-01-08/'
        + 'a4625fd6e1ad6fcc537f46a3e7277b10.3C2D29-D7A9A1-999495.jpeg',
        mediaType: 4,
        attributes: { alt: 'Nintendo UK replaces PlayStation as Digital Schoolhouse official' },
      },
    ],
  }
  const newspapers = new Array(initialNewspaperQuantity).fill(newspaper)

  const event = {
    imageUrl: 'https://static-prod.weplay.tv/2020-01-08/'
    + 'e0aea2a5dd0a53467d91a932b9e25e65.BAA5A8-364C61-6E4A49.jpeg',
    imageLink: '/projects/weplay-bukovel-minor-2020',
    startDate: '2019-12-15T00:00:00Z',
    endDate: '2020-01-03T00:00:00Z',
    innerTitle: 'Bukovel Minor',
    innerText: 'Learn from events that have successfully promoted event sponsors,'
    + ' and discover ways to create innovative sponsorship promotion campaigns.',
    buttonUrl: 'http://google.com',
  }
  const events = new Array(initialEventQuantity).fill(event)

  const eventPressMaterial = {
    imageUrl: 'https://static-prod.weplay.tv/2020-01-08/'
    + 'ca9b9313eda81472c5536239bd29def9.112052-BFB7BD-58A1D6.jpeg',
    projectLink: '/projects/weplay-bukovel-minor-2020',
    title: 'Bukovel Minor',
    pressKitUrl: 'http://google.com',
    photoUrl: 'http://google.com',
    logosUrl: 'http://google.com',
  }
  const eventPressMaterials = new Array(initialEventPressMaterialQuantity).fill(eventPressMaterial)

  return {
    newspapers,
    events,
    eventPressMaterials,
  }
}

export default PressRoomPage
