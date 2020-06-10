import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import { isMobileWidthSelector } from 'weplay-core/reduxs/_legacy/layout/reducer'

import Button, { BUTTON_PRIORITY } from 'weplay-components/Button'

import styles from './CharacterOverall.scss'
import {
  row1, row2, row3, row4,
} from './mockedTable'

const CharacterOverall = () => {
  const t = useTranslation()
  const isMobileWidth = useSelector(isMobileWidthSelector)
  return (
    <div className={styles.block}>
      <h3 className={styles.title}>{t('mediaCore.character.overview.indicators')}</h3>
      <p className={styles.pick}>{t('mediaCore.character.overview.overall')}</p>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Level</th>
            <th className={styles.th}>Health</th>
            <th className={styles.th}>Mana</th>
            <th className={styles.th}>Armor</th>
            <th className={styles.th}>Damage</th>
            <th className={styles.th}>Spell Amp</th>
            <th className={styles.th}>Magic Resist</th>
            <th className={styles.th}>Movement Spell Amp</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          <tr className={classNames(
            styles.tr,
            styles.label,
          )}
          >
            {row1.map(item => (
              <td
                key={item.id}
                className={styles.td}
                data-th={item.th}
              >
                {item.text}
              </td>
            ))}
          </tr>
          <tr className={styles.tr}>
            {row2.map(item => (
              <td
                key={item.id}
                className={styles.td}
                data-th={item.th}
              >
                {item.text}
              </td>
            ))}
          </tr>
          <tr className={classNames(
            styles.tr,
            styles.hidden,
          )}
          >
            {row3.map(item => (
              <td
                key={item.id}
                className={styles.td}
                data-th={item.th}
              >
                {item.text}
              </td>
            ))}
          </tr>
          <tr className={classNames(
            styles.tr,
            styles.hidden,
          )}
          >
            {row4.map(item => (
              <td
                key={item.id}
                className={styles.td}
                data-th={item.th}
              >
                {item.text}
              </td>
            ))}
          </tr>
          {isMobileWidth && (
            <tr className={styles.tr}>
              <Button
                priority={BUTTON_PRIORITY.SECONDARY}
                className={styles.button}
              >
                Show all table
              </Button>
            </tr>
          )}
        </tbody>
      </table>
      <p className={styles.pick}>{t('mediaCore.character.overview.stats')}</p>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.tr}>
            <td className={styles.th}>Base HP Regen</td>
            <td className={styles.td}>2,5</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.th}>Base HP Regen</td>
            <td className={styles.td}>2,5</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.th}>Base HP Regen</td>
            <td className={styles.td}>2,5</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.th}>Base HP Regen</td>
            <td className={styles.td}>2,5</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.th}>Base HP Regen</td>
            <td className={styles.td}>2,5</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.th}>Base HP Regen</td>
            <td className={styles.td}>2,5</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CharacterOverall
