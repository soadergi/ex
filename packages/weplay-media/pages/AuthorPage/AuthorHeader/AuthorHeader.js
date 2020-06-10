import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'weplay-singleton/LocaleProvider/useTranslation'

import authorPropType from 'weplay-core/customPropTypes/authorPropType'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import SimpleSubscribeForm from 'weplay-components/SubscribeForms/SimpleSubscribeForm'
import Headline from 'weplay-components/HeadLine'

import { useSubscriptionBlock } from 'weplay-media/hooks/useSubscriptionBlock'

import AuthorCard from '../AuthorCard/AuthorCard'

import styles from './AuthorHeader.scss'

const AuthorHeader = ({
  author,
  isColumnist,
}) => {
  const t = useTranslation()
  const subscriptionBlock = useSubscriptionBlock({
    locationPage: 'general',
    locationId: 0,
  })

  return (
    <div
      className={classNames(
        styles.block,
        {
          [styles.columnist]: !isColumnist,
        },
      )}
    >
      <ContentContainer>
        <div className={styles.grid}>
          <div className={styles.avatarBlock}>
            <AuthorCard
              isColumnist={isColumnist}
              author={author}
            />
          </div>
          <div className={styles.subscribeBlock}>
            <Headline
              title={t('mediaCore.author.formTitle')}
              size="h4"
            />
            <SimpleSubscribeForm
              subscriptionBlock={subscriptionBlock}
            />
          </div>
        </div>
      </ContentContainer>
    </div>
  )
}

AuthorHeader.propTypes = {
  author: authorPropType.isRequired,
  isColumnist: PropTypes.bool.isRequired,
}

export default React.memo(AuthorHeader)
