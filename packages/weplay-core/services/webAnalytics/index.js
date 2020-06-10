import * as R from 'ramda'

import { getEnvironment, ENV_NAMES } from 'weplay-singleton/helpers/getEnvironment'

import getBrowserGlobal from 'weplay-core/helpers/ssr/getBrowserGlobal'
import {
  AMPLITUDE_API_KEY__PROD,
  AMPLITUDE_API_KEY__DEV,
  amplitudeConfig,
} from 'weplay-core/config'

const PAGE_VIEW = 'pageView'
const GENERAL_EVENT = 'weplay'
const RESPONSE_EVENT = 'weplay_response'
export const ECOMMERCE_EVENT = 'gtm-ee-event'
export const FORM_EVENT = 'weplay_Forms'

class WebAnalytics {
  constructor() {
    if (typeof window === 'undefined') {
      console.warn('serverside no analytics')
      this.dataLayer = []
      return
    }
    this.dataLayer = getBrowserGlobal().dataLayer || []
    this.origin = getBrowserGlobal().location.origin
  }

  prepareAmplitude = (callback) => {
    if (this.amplitude) {
      callback()
    } else {
      import(/* webpackChunkName: "ampli_tu_de" */'amplitude-js')
        .then(
          (amplitudeModule) => {
            this.amplitude = amplitudeModule.default.getInstance()
            this.amplitude.init(
              getEnvironment(this.origin) === ENV_NAMES.PROD
                ? AMPLITUDE_API_KEY__PROD
                : AMPLITUDE_API_KEY__DEV,
              null,
              amplitudeConfig,
              callback,
            )
          },
        )
    }
  }

  addParams = params => this.dataLayer.push(params)

  pushEvent = (event, params) => this.dataLayer.push({
    event,
    ...R.pickBy(R.complement(R.equals(undefined)), params),
  })

  sendGeneralEvent = params => this.pushEvent(GENERAL_EVENT, params)

  sendResponseEvent = params => this.pushEvent(RESPONSE_EVENT, params)

  sendFormEvent = params => this.pushEvent(FORM_EVENT, {
    ...params,
    timingCategory: 'Forms',
    timingValue: Date.now(),
  })

  sendPageView = params => this.pushEvent(PAGE_VIEW, params)

  sendScrollDepth = params => this.sendGeneralEvent(params)

  sendAmplitudeEvent = (eventName, properties) => {
    this.prepareAmplitude(
      () => this.amplitude.logEvent(eventName, properties),
    )
  }

  setAmplitudeCustomProperty = (props) => {
    this.prepareAmplitude(
      () => this.amplitude.setUserProperties(props),
    )
  }

  setAmplitudeUserId = (id) => {
    this.prepareAmplitude(
      () => this.amplitude.setUserId(id),
    )
  }
}

export default new WebAnalytics()
