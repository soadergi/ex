import React from 'react'

import Image from 'weplay-components/Image'
import Icon from 'weplay-components/Icon'
import MediaPlayer from 'weplay-components/MediaPlayer'

import styles from './CharacterAbility.scss'

const image = 'https://static-prod.weplay.tv/2020-05-18/9882bd28eb7a6868865a585c28521b54.595D39-D9C979-A8C069.jpeg'
const videoUrl = 'https://www.youtube.com/embed/QDu35eAciqc?autoplay=0&mute=0&controls=1&origin=https%3A%2F%2Fweplay.'
  + 'tv&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=9'
const text = 'Slams the ground with a mighty totem, fissuring the earth while stunning and\n'
  + '        damaging enemy units along its line. Creates an impassable ridge of stone.'

const CharacterAbility = () => (
  <div className={styles.block}>
    <div className={styles.affects}>
      <h3 className={styles.title}>Fissure</h3>
      <div className={styles.points}>
        <div>
          <p className={styles.label}>Ability</p>
          <p className={styles.point}>Point Target</p>
        </div>
        <div>
          <p className={styles.label}>Affects</p>
          <p className={styles.point}>Enemy units</p>
        </div>
        <div>
          <p className={styles.label}>Damage Type</p>
          <p className={styles.point}>Magical</p>
        </div>
      </div>
      <p className="u-mb-0">{text}</p>
    </div>
    <div className={styles.video}>
      {videoUrl ? (
        <MediaPlayer
          url={videoUrl}
        />
      ) : (
        <Image
          src={image}
          className={styles.image}
        />
      )}
    </div>
    <div className={styles.rate}>
      <div className={styles.mana}>
        <Icon
          iconName="water"
          className={styles.icon}
        />
        <span>110/130/150/170</span>
      </div>
      <div className={styles.time}>
        <Icon
          iconName="clock"
          className={styles.icon}
        />
        <span>21/19/17/15</span>
      </div>
    </div>
    <div className={styles.table}>
      <table>
        <tbody>
          <tr className={styles.tr}>
            <td className={styles.td}>Damage</td>
            <td className={styles.td}>110/160/210/260</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.td}>Cast Animantion</td>
            <td className={styles.td}>0.69</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.td}>Radius</td>
            <td className={styles.td}>225</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr className={styles.tr}>
            <td className={styles.td}>Stun Duration</td>
            <td className={styles.td}>1/1.25/1.5/1.75</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.td}>Fissure Duration</td>
            <td className={styles.td}>8</td>
          </tr>
          <tr className={styles.tr}>
            <td className={styles.td}>Distance</td>
            <td className={styles.td}>1400</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default CharacterAbility
