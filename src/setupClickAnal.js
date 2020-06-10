import webAnalytics, { ECOMMERCE_EVENT } from 'weplay-core/services/webAnalytics'
import { createEcommerceAttributeParams } from 'weplay-core/helpers/createCustomAnalEvents'
import { toLowerCaseFirstLetter } from 'weplay-core/helpers/toLowerCaseFirstLetter'
import kebabCase from 'lodash/kebabCase'

// TODO: @rbogdanov think about analConfig.js for future anal systems
const ANAL_SOURCES = {
  AMPLITUDE: 'Amplitude',
  ECOMMERCE: 'Ecommerce',
}
export const analConfig = {
  [ANAL_SOURCES.AMPLITUDE]: {
    isFirstLetterLowerCase: false,
  },
  [ANAL_SOURCES.ECOMMERCE]: {
    isFirstLetterLowerCase: true,
  },
}

function lookUpAnalValue({ analKey, element }) {
  const selector = `[data-${kebabCase(analKey)}]`
  const keyOwnerParent = element.parentElement.closest(selector)
  const analValue = keyOwnerParent?.dataset[analKey]
  if (analValue === window.LOOKUP) {
    return lookUpAnalValue({
      analKey,
      element: keyOwnerParent,
    })
  }
  return analValue
}

function handleAnalElementClick(element, event, analSource = null) {
  const analValues = element.dataset
  let eventAction = ''
  const eventProps = {}
  Object.keys(analValues).forEach((analKey) => {
    if (analValues[analKey] === window.LOOKUP) {
      const analValue = lookUpAnalValue({
        analKey,
        element: event.target.parentElement,
      })
      if (analValue) {
        analValues[analKey] = analValue
      }
    }

    if (analSource) {
      const replacedKey = analKey.replace(`event${analSource}`, '')
      const updatedKey = analConfig[analSource].isFirstLetterLowerCase
        ? toLowerCaseFirstLetter(replacedKey)
        : replacedKey
      if (updatedKey === 'Action') {
        eventAction = analValues[analKey]
      } else {
        eventProps[updatedKey] = analValues[analKey]
      }
    }
  })

  switch (analSource) {
    case ANAL_SOURCES.AMPLITUDE:
      webAnalytics.sendAmplitudeEvent(eventAction, eventProps)
      break
    case ANAL_SOURCES.ECOMMERCE:
      webAnalytics.pushEvent(ECOMMERCE_EVENT, createEcommerceAttributeParams(eventProps))
      break
    default:
      webAnalytics.sendGeneralEvent(analValues)
  }
}

export const setupClickAnal = (window) => {
  window.LOOKUP = '__LOOKUP__' // eslint-disable-line no-param-reassign
  window.addEventListener('click', (event) => {
    // TODO: @rbogdanov think about how to reduce copyPaste
    const analyticsElement = event.target.closest('[data-event-action]')
    const amplitudeElement = event.target.closest('[data-event-amplitude-action]')
    const ecommerceElement = event.target.closest('[data-event-ecommerce-action]')

    if (analyticsElement) {
      handleAnalElementClick(analyticsElement, event)
    } else if (amplitudeElement) {
      handleAnalElementClick(amplitudeElement, event, ANAL_SOURCES.AMPLITUDE)
    } else if (ecommerceElement) {
      handleAnalElementClick(ecommerceElement, event, ANAL_SOURCES.ECOMMERCE)
    }
  }, { capture: true })
}
