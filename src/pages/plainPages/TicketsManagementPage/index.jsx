import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import withRouter from 'weplay-singleton/RouterProvider/withRouter'

import historyPropType from 'weplay-core/customPropTypes/historyPropType'
import { NAMES, pathForRoute } from 'weplay-core/routes'
import { isUserHasTicketsManagementRightsSelector } from 'weplay-core/reduxs/_legacy/auth/reducer'

import ContentContainer from 'weplay-components/_wrappers/ContentContainer'
import Section from 'weplay-components/_wrappers/Section'
import ModalBase from 'weplay-components/ModalBase'

import { getActivatedTicketsListRequest } from 'weplay-events/services/e-ticket-service'

import InitialModalContent from './Modals/InitialModalContent'
import Header from './components/Header'
import UsersList from './components/UsersList'
import styles from './styles.scss'

const MAD_MOON_TICKETS_ACTIVATIONS_ID = 47

function TicketsPage({ history }) {
  const isUserHasTicketsManagementRights = useSelector(isUserHasTicketsManagementRightsSelector)
  const [isInitialModalOpened, setIsInitialModalOpened] = useState(true)
  const closeInitialModalPopup = useCallback(
    () => setIsInitialModalOpened(false),
    [],
  )
  const [activatedTicketsList, setActivatedTicketsList] = useState([])
  const getActivatedTicketsList = useCallback(
    () => getActivatedTicketsListRequest({
      params: {
        filter__tournament_id__eq: MAD_MOON_TICKETS_ACTIVATIONS_ID,
        filter__has_activations__eq: true,
      },
    })
      .then((activatedTicketsResponse) => {
        const activatedTicketsData = activatedTicketsResponse?.data?.data ?? []
        setActivatedTicketsList(activatedTicketsData)
      }),
    [],
  )

  useEffect(() => {
    if (!isUserHasTicketsManagementRights) {
      history.replace(`/${pathForRoute(NAMES.ROOT)}`)
    } else {
      getActivatedTicketsList()
    }
  }, [isUserHasTicketsManagementRights])

  if (!isUserHasTicketsManagementRights) return null

  return (
    <>
      <Section
        className={classNames(
          styles.section,
          'u-py-2',
          'u-py-sm-0',
        )}
      >
        <ContentContainer>
          <Header getActivatedTicketsList={getActivatedTicketsList} />
        </ContentContainer>
      </Section>

      <Section className="u-mt-2 u-p-0">
        <ContentContainer>
          <UsersList
            className={styles.userList}
            ticketsActivationsList={activatedTicketsList}
          />
        </ContentContainer>
      </Section>

      <ModalBase isShown={isInitialModalOpened}>
        <InitialModalContent handleClose={closeInitialModalPopup} />
      </ModalBase>
    </>
  )
}
TicketsPage.propTypes = {
  history: historyPropType.isRequired,
}
export default withRouter(TicketsPage)
