import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import SeoText from 'weplay-competitive/components/SeoText'
import Wrapper from 'weplay-competitive/components/Wrapper'

import styles from './styles.scss'

const LadderPageSeo = () => {
  const t = useTranslation()
  return (
    <Wrapper className={styles.seo}>
      <SeoText>
        <h2>{t('competitive.seo.ladderPage.h2')}</h2>
        <p>{t('competitive.seo.ladderPage.p1')}</p>
        <p>{t('competitive.seo.ladderPage.p2')}</p>
        <p>{t('competitive.seo.ladderPage.p3')}</p>
        <p>{t('competitive.seo.ladderPage.p4')}</p>
      </SeoText>
    </Wrapper>
  )
}

export default LadderPageSeo
