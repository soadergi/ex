export const createEcommerceParams = ({
  ecommerce,
  action,
  nonInteraction,
  category,
}) => ({
  ecommerce,
  'gtm-ee-event-action': action,
  'gtm-ee-event-non-interaction': nonInteraction || false,
  'gtm-ee-event-category': category || 'Enhanced Ecommerce',
})

export const createEcommerceAttributeParams = eventProps => createEcommerceParams({
  ecommerce: {
    currencyCode: eventProps.currencyCode,
    click: {
      products: [{
        name: eventProps.name,
        id: eventProps.id,
        price: eventProps.price,
        position: eventProps.position,
      }],
    },
  },
  action: eventProps.action,
  nonInteraction: eventProps.nonInteraction,
  category: eventProps.category,
})

// export const KolyaPoprosilDobavitEvent = () => ({}) etc
