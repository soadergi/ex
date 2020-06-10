import React from 'react'
import classNames from 'classnames'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import SlideToggle from 'weplay-components/SlideToggle'
import Image from 'weplay-components/Image'

import ScoreBoxPlayer from 'weplay-competitive/pages/MatchPage/ScoreboxNew/ScoreboxPlayer/ScoreboxPlayer'
import ScoreBoxTeamHeader from 'weplay-competitive/pages/MatchPage/ScoreboxNew/ScoreboxTeamHeader/ScoreboxTeamHeader'

import styles from './ScoreboxNew.scss'

export const ScoreboxNew = ({
  // required props

  // container props

  // optional props
}) => {
  const t = useTranslation()

  const data = [
    {
      isFetched: true,
      name: 'MaximillianMaximilliopolus',
      kills: '12',
      assists: '10',
      deaths: '10',
      KD: '1.2',
      KR: '1.2',
      OR: '16%',
      HS: '16%',
      ADR: '30',
      FA: '1',
      MVP: '2',
      ACE: '30',
      points: '+20',
      WCR: '-25',
    },
    {
      isFetched: true,
      name: 'Maximillian',
      kills: '12',
      assists: '10',
      deaths: '10',
      KD: '1.2',
      KR: '1.2',
      OR: '16%',
      HS: '16%',
      ADR: '30',
      FA: '1',
      MVP: '2',
      ACE: '30',
      points: '+20',
      WCR: '-25',
    },
  ]
  return (
    <SlideToggle collapsed>
      {({ onToggle }) => (
        <div
          className={styles.game}
          onClick={onToggle}
        >
          <div className={styles.gameHeader}>
            <Image
              alt
              src="https://picsum.photos/100/50"
            />
            <p className={styles.gameTitle}>Game 1</p>
          </div>

          <ScoreBoxTeamHeader />

          <table className={styles.gameTable}>
            <thead className={styles.header}>
              <tr>
                <td className={styles.cell}>
                  Players
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.right,
                )}
                >
                  {t('competitive.scorebox.cs-go.kill')}
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.team,
                  styles.right,
                )}
                >
                  {t('competitive.scorebox.cs-go.assist')}
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.right,
                )}
                >
                  {t('competitive.scorebox.cs-go.death')}
                </td>
                <td className={styles.cell}>
                  {t('competitive.scorebox.cs-go.KD')}
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.team,
                )}
                >
                  {t('competitive.scorebox.cs-go.KR')}
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.team,
                )}
                >
                  {t('competitive.scorebox.cs-go.OR')}
                </td>
                <td className={styles.cell}>
                  {t('competitive.scorebox.cs-go.HS')}
                </td>
                <td className={styles.cell}>
                  {t('competitive.scorebox.cs-go.ADR')}
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.team,
                )}
                >
                  {t('competitive.scorebox.cs-go.FA')}
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.team,
                )}
                >
                  {t('competitive.scorebox.cs-go.MVP')}
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.team,
                )}
                >
                  {t('competitive.scorebox.cs-go.ACE')}
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.right,
                )}
                >
                  {t('competitive.scorebox.cs-go.points')}
                </td>
                <td className={classNames(
                  styles.cell,
                  styles.right,
                )}
                >
                  {t('competitive.scorebox.cs-go.WCR')}
                </td>
              </tr>
            </thead>
            <tbody className={styles.body}>
              {data.map(scorebox => scorebox.isFetched && (
              <ScoreBoxPlayer
                key={scorebox.id}
                scorebox={scorebox}
              />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SlideToggle>
  )
}

ScoreboxNew.propTypes = {
  // required props

  // container props

  // optional props
}

ScoreboxNew.defaultProps = {
  // optional props
}

export default ScoreboxNew
