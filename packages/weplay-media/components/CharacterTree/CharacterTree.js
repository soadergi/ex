import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isTabletWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import CharacterTitle from 'weplay-media/components/CharacterTitle/CharacterTitle'

import styles from './CharacterTree.scss'

const text = 'The Talent Tree is found during a match, right be side your character portrait. You open it by '
  + 'clicking the tree icon, naturally. At levels 10, 15, 20 and 25 you can pick one of two talents. '
  + 'These will then be permanently applied to your character. Don\'t worry, if you forget to pick a talent, '
  + 'you can always grab it on your next level up!\n'

const tableLeft = [
  {
    id: 1,
    text: 'All talents available',
    muted: false,
  },
  {
    id: 2,
    text: '-2s Enchant Totem Cooldown',
    muted: false,
  },
  {
    id: 3,
    text: '+400 Fissure Range',
    muted: true,
  },
  {
    id: 4,
    text: '+7 Armor',
    muted: true,
  },
  {
    id: 5,
    text: '+250 Mana',
    muted: false,
  },
]

const tableRight = [
  {
    id: 11,
    text: 'All talents available',
    muted: false,
  },
  {
    id: 12,
    text: '+50 Magic Resistance',
    muted: true,
  },
  {
    id: 13,
    text: '+50 Eco Damage',
    muted: false,
  },
  {
    id: 14,
    text: '+30 Movement Speed',
    muted: false,
  },
  {
    id: 15,
    text: '+30 Damage',
    muted: true,
  },
]

const CharacterTree = () => {
  const t = useTranslation()
  const isTabletWidth = useSelector(isTabletWidthSelector)
  return (
    <div className={styles.block}>
      <div className={styles.wrapper}>
        <CharacterTitle
          title={t('mediaCore.character.tab.talentTree')}
          text={text}
        />
      </div>
      {isTabletWidth && (
        <ul className={classNames(
          styles.list,
          styles.leftList,
        )}
        >
          <li className={styles.level}>30</li>
          <li className={styles.level}>25</li>
          <li className={styles.level}>20</li>
          <li className={styles.level}>15</li>
          <li className={styles.level}>10</li>
        </ul>
      )}

      <table className={styles.table}>
        <tbody>
          {tableLeft.map(item => (
            <tr key={item.id}>
              <td className={classNames(
                styles.td,
                {
                  [styles.muted]: item.muted,
                },
              )}
              >
                {item.text}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className={classNames(
        styles.list,
        styles.rightList,
      )}
      >
        <li className={styles.level}>30</li>
        <li className={styles.level}>25</li>
        <li className={styles.level}>20</li>
        <li className={styles.level}>15</li>
        <li className={styles.level}>10</li>
      </ul>

      <table className={classNames(
        styles.table,
        styles.tableRight,
      )}
      >
        <tbody>
          {tableRight.map(item => (
            <tr key={item.id}>
              <td className={classNames(
                styles.td,
                {
                  [styles.muted]: item.muted,
                },
              )}
              >
                {item.text}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default CharacterTree
