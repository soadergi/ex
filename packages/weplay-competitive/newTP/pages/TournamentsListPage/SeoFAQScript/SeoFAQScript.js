import React from 'react'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import IsomorphicHead from 'weplay-components/IsomorphicHead'

const SeoFAQScript = () => {
  const t = useTranslation()

  return (
    <IsomorphicHead>
      <script type="application/ld+json">
        {`
     {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "🏆 ${t('competitive.seoScript.tournamentsPage.question1')}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "${t('competitive.seoScript.tournamentsPage.answer1')}"
    }
  }, {
    "@type": "Question",
    "name": "🎁 ${t('competitive.seoScript.tournamentsPage.question2')}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "${t('competitive.seoScript.tournamentsPage.answer2')}"
    }
  }, {
    "@type": "Question",
    "name": "⚔️${t('competitive.seoScript.tournamentsPage.question3')}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "${t('competitive.seoScript.tournamentsPage.answer3')}"
    }
  }, {
    "@type": "Question",
    "name": "🕑 ${t('competitive.seoScript.tournamentsPage.question4')}",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "${t('competitive.seoScript.tournamentsPage.answer4')}"
    }
  }]
  }
   `}
      </script>
    </IsomorphicHead>
  )
}

export default React.memo(SeoFAQScript)
