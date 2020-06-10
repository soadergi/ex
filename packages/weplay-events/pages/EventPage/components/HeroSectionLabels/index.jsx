import React from 'react'
import Label from 'weplay-components/Label'

import styles from '../EventHeroSection/styles.scss'

const HeroSectionLabels = ({ labels }) => labels.map(label => (
  <Label
    color="blue"
    key={label}
    className={styles.label}
  >
    {label}
  </Label>
))

export default HeroSectionLabels
