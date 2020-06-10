import getIsNext from 'weplay-core/helpers/ssr/getIsNext'

let SlideToggle // eslint-disable-line

if (getIsNext()) {
  SlideToggle = props => props.children
} else {
  SlideToggle = require('react-slide-toggle').SlideToggle; // eslint-disable-line
}

export default SlideToggle
