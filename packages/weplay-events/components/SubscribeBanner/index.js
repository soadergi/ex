import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

import { useParams } from 'weplay-singleton/RouterProvider/useParams'

import { getAnalyticsAttributes } from 'weplay-core/helpers/getAnalyticsAttributes'

import Link from 'weplay-components/Link'
import ContentContainer from 'weplay-components/_wrappers/ContentContainer'

import { subscriptionScopeIds } from 'weplay-events/pages/EventPage/constants'
import { tournamentSelectors } from 'weplay-events/reduxs/tournament'
import ButtonsBlock from 'weplay-events/components/ButtonsBlock'
import { useCurrentTournamentId } from 'weplay-events/pages/EventPage/CurrentTournamentIdProvider'

import styles from './styles.scss'

const SubscribeBanner = ({
  bannerLink,
  withSocialShare,
  className,
  contentPosition,
  children,
  title,
  description,
  linkText,
}) => {
  const tournamentId = useCurrentTournamentId()
  const { tournamentDiscipline, tournamentSlug } = useParams()
  const tournament = useSelector(tournamentSelectors.getRecordByIdSelector)(tournamentId)

  return (
    <div
      className={classNames(
        className,
        styles.block,
        styles[contentPosition],
      )}
    >
      <ContentContainer>
        <div className={styles.wrap}>
          <div className={styles.content}>
            <p className={styles.title}>{title}</p>

            <p className={styles.description}>{description}</p>

            {bannerLink && (
              <Link
                className={styles.link}
                to={bannerLink}
                {...getAnalyticsAttributes({
                  action: 'click',
                  label: tournamentDiscipline,
                  position: 'EventSubscribeBanner',
                })}
              >
                {linkText}
              </Link>
            )}

            {withSocialShare && (
              <ButtonsBlock
                color="magenta"
                modalTitle={tournament.fullName}
                subscriptionScopeId={subscriptionScopeIds[tournamentSlug]}
                hasReminderButton
              />
            )}
          </div>

          {children}
        </div>
      </ContentContainer>
    </div>
  )
}

SubscribeBanner.propTypes = {
  bannerLink: PropTypes.string,
  withSocialShare: PropTypes.bool,
  className: PropTypes.string,
  contentPosition: PropTypes.oneOf(['right', '']),
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  linkText: PropTypes.string,
}

SubscribeBanner.defaultProps = {
  bannerLink: '',
  withSocialShare: false,
  contentPosition: '',
  className: '',
  children: null,
  title: '',
  description: '',
  linkText: '',
}

export default SubscribeBanner
