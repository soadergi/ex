/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
function showBrowserAddToHomeScreenPrompt(deferredPrompt) {
  deferredPrompt.prompt()
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt')
    } else {
      console.log('User dismissed the A2HS prompt')
    }
  })
}
function showCustomAddToHomeScreenPrompt(deferredPrompt) {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  deferredPrompt.preventDefault()
  const a2hsBtn = document.querySelector('.addToHomeScreenPrompt')
  a2hsBtn.style.display = 'block'
  a2hsBtn.addEventListener('click', () => {
    a2hsBtn.style.display = 'none'
    showBrowserAddToHomeScreenPrompt(deferredPrompt)
  })
}
self.addEventListener('beforeinstallprompt', showCustomAddToHomeScreenPrompt)

const DEBUG = false
const ALLOWED_REQUEST_PATH_NAMES = [
  '/media-service/homepage',
  '/media-service/sections',
  '/media-service/news',
]
const CACHE_ENABLED = true
const CACHE_NAME = new Date().toISOString()

self.addEventListener('install', () => {
  if (DEBUG) {
    console.log('[SW] Install event')
  }
})

self.addEventListener('activate', () => {
  if (DEBUG) {
    console.log('[SW] Activate event')
  }
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') {
    if (DEBUG) {
      console.log(`[SW] Ignore non GET request ${request.method}`)
    }
    return
  }
  const requestUrl = new URL(request.url)
  if (
    // ignore not allowed origin
    !ALLOWED_REQUEST_PATH_NAMES.includes(requestUrl.pathname)
    || !CACHE_ENABLED
  ) {
    if (DEBUG) {
      console.log(`[SW] Ignore origin ${requestUrl.origin}`)
    }
    return
  }
  event.respondWith(
    fetch(request)
      .then((responseNetwork) => {
        if (!responseNetwork || !responseNetwork.ok) {
          if (DEBUG) {
            console.log(
              `[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${
                responseNetwork.status
              } ${responseNetwork.type}`,
            )
          }
          return responseNetwork
        }

        if (DEBUG) {
          console.log(`[SW] URL ${requestUrl.href} fetched`)
        }

        const responseCache = responseNetwork.clone()

        self.caches
          .open(CACHE_NAME)
          .then(cache => cache.put(request, responseCache))
          .then(() => {
            if (DEBUG) {
              console.log(`[SW] Cached: ${requestUrl.href}`)
            }
          })
        return responseNetwork
      }).catch(() => {
        console.log(`[SW] URL ${requestUrl.href} from cache`)
        return caches.match(event.request)
      }),
  )
})
