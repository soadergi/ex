import React from 'react'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Section, { BORDER, BORDER_COLOR, PADDING_Y } from 'weplay-components/_wrappers/Section'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import BackgroundImg from 'weplay-components/BackgroundImg'
import Image from 'weplay-components/Image'
import InlineTabs from 'weplay-components/InlineTabs'
import Tab from 'weplay-components/Tab'
import Select from 'weplay-components/Select'
import Icon from 'weplay-components/Icon'

import CharactersList from 'weplay-media/components/CharactersList/CharactersList'

import styles from './CharactersPage.scss'

const logo = 'https://static-prod.weplay.tv/2020-04-28/516717dcad00d55dc143a6c028881b58.DC4434-E04434-E04434.png'
const background = 'https://static-prod.weplay.tv/2020-04-28/ab3ec9008e14a73d20623c319efe90bf.0A1733-5D5E6C-3D5576.jpeg'
const pageTitle = 'Heroes'
const text = 'Learn the most related and actual content from our tournaments, events\n'
  + 'and the most actual news about DOTA 2'
const tabs = [
  {
    id: 1,
    title: 'All heroes',
  },
  {
    id: 2,
    title: 'Strength',
  },
  {
    id: 3,
    title: 'Agility',
  },
  {
    id: 4,
    title: 'Intelligence',
  },
]

const dropdownOptions = [
  { label: 'Choose role1' },
  { label: 'Choose role2' },
  { label: 'Choose role3' },
  { label: 'Choose role4' },
]

const placeholder = 'Choose role'

const CharactersPage = () => {
  const isMobileWidth = useSelector(isMobileWidthSelector)
  const t = useTranslation()
  return (
    <>
      <Section>
        <div className={styles.background}>
          {!isMobileWidth && (
            <BackgroundImg
              src={background}
              className={styles.image}
            />
          )}
        </div>
        <ContentContainer>
          <div className={styles.block}>
            <div className={styles.wrapper}>
              <Image
                src={logo}
                className={styles.logo}
              />
              <h1 className={styles.title}>{pageTitle}</h1>
            </div>
            <p className={styles.text}>{text}</p>
          </div>
          <InlineTabs
            className={styles.tabs}
          >
            {tabs.map(tab => (
              <Tab
                key={tab.id}
                tab={tab.title}
                color="white"
              />
            ))}
          </InlineTabs>
          <div className={styles.inputWrap}>
            <div className={styles.filters}>
              {/* TODO: @frontend check plz why all options with isActive state */}
              <Select
                options={dropdownOptions}
                className={styles.dropdown}
                placeholder={placeholder}
                color="gray"
              />
              <Select
                options={dropdownOptions}
                className={styles.dropdown}
                placeholder={placeholder}
                color="gray"
              />
            </div>
            <div className={styles.searchWrap}>
              <input
                type="search"
                className={styles.search}
                minLength={3}
                id="searchInput"
                placeholder={t('mediaCore.character.search.input.placeholder')}
                maxLength="128"
              />
              <button
                type="button"
                className={styles.button}
              >
                <Icon
                  className={styles.searchIcon}
                  iconName="search"
                />
              </button>
            </div>
          </div>
          <CharactersList />
        </ContentContainer>
      </Section>
      <Section
        paddingY={PADDING_Y.SM}
        hasBorder={BORDER.TOP}
        borderColor={BORDER_COLOR.LIGHT}
      >
        <ContentContainer>
          {/* TODO: @frontend add subscription block here */}
          Subscription
        </ContentContainer>
      </Section>
    </>
  )
}

export default CharactersPage
