export function enterFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

export function exitFullScreen(document) {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen()
  }
}

export function isFullScreenElement(document) {
  return Boolean(
    document.fullscreenElement
      || document.webkitFullscreenElement
      || document.mozFullScreenElement
      || document.msFullscreenElement,
  )
}

const events = ['webkitfullscreenchange', 'fullscreenchange']

export function addFullScreenChangeListeners(document, handler) {
  events.forEach(
    event => document.addEventListener(event, handler),
  )
}

export function removeFullScreenChangeListeners(document, handler) {
  events.forEach(
    event => document.removeEventListener(event, handler),
  )
}
